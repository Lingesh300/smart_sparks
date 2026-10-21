// Web Speech API wrapper with reliable playback state tracking and safe fallbacks

let activeUtterance: SpeechSynthesisUtterance | null = null;
let internalSpeaking = false;
let internalPaused = false;
let currentText = '';
let lastBoundaryCharIndex = 0;

export const speak = (
  text: string, 
  onEnd?: () => void, 
  onBoundary?: (charIndex: number) => void
) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    internalSpeaking = false;
    internalPaused = false;
    if (onEnd) onEnd();
    return;
  }
  
  // Cancel any ongoing speech before starting a new utterance
  window.speechSynthesis.cancel();
  internalSpeaking = false;
  internalPaused = false;
  currentText = text;
  lastBoundaryCharIndex = 0;

  if (!text || !text.trim()) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  activeUtterance = utterance;
  
  // Try to load voices (might be empty on first load in some browsers)
  let voices = window.speechSynthesis.getVoices();
  
  // Helper to set voice
  const setVoice = () => {
    const preferredVoice =
      voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0];
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
  };

  if (voices.length > 0) {
    setVoice();
  } else {
    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices();
      setVoice();
    };
  }
  
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  utterance.onstart = () => {
    internalSpeaking = true;
    internalPaused = false;
  };

  utterance.onpause = () => {
    internalPaused = true;
  };

  utterance.onresume = () => {
    internalPaused = false;
    internalSpeaking = true;
  };

  utterance.onboundary = (event) => {
    if (typeof event.charIndex === 'number') {
      lastBoundaryCharIndex = event.charIndex;
      if (onBoundary) {
        onBoundary(event.charIndex);
      }
    }
  };

  utterance.onend = () => {
    if (activeUtterance === utterance) {
      activeUtterance = null;
      internalSpeaking = false;
      internalPaused = false;
    }
    if (onEnd) {
      onEnd();
    }
  };
  
  utterance.onerror = (e) => {
    if (activeUtterance === utterance) {
      activeUtterance = null;
      internalSpeaking = false;
      internalPaused = false;
    }
    // "canceled" and "interrupted" are normal when the user stops speech or a new message comes in.
    if (e.error === 'canceled' || e.error === 'interrupted') {
      return;
    }
    console.error("Speech synthesis error:", e.error);
    if (onEnd) {
      onEnd();
    }
  };

  internalSpeaking = true;
  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  internalSpeaking = false;
  internalPaused = false;
  activeUtterance = null;
  lastBoundaryCharIndex = 0;
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const pauseSpeaking = (): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }
  try {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      internalPaused = true;
      return true;
    }
    if (internalSpeaking && !internalPaused) {
      window.speechSynthesis.pause();
      internalPaused = true;
      return true;
    }
  } catch (e) {
    console.warn("Speech pause unsupported:", e);
  }
  return false;
};

export const resumeSpeaking = (
  fallbackOnEnd?: () => void,
  fallbackOnBoundary?: (charIndex: number) => void
): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }
  try {
    if (window.speechSynthesis.paused || internalPaused) {
      window.speechSynthesis.resume();
      internalPaused = false;
      internalSpeaking = true;

      // Safe fallback: if the browser dropped the paused utterance, re-speak from last char boundary
      if (!window.speechSynthesis.speaking && currentText) {
        const remaining = currentText.slice(lastBoundaryCharIndex).trim();
        if (remaining) {
          const offset = lastBoundaryCharIndex;
          speak(
            remaining,
            fallbackOnEnd,
            fallbackOnBoundary ? (idx) => fallbackOnBoundary(offset + idx) : undefined
          );
        }
      }
      return true;
    }
  } catch (e) {
    console.warn("Speech resume error, using fallback:", e);
    if (currentText) {
      const remaining = currentText.slice(lastBoundaryCharIndex).trim() || currentText;
      speak(remaining, fallbackOnEnd, fallbackOnBoundary);
      return true;
    }
  }
  return false;
};

export const isSpeaking = (): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return window.speechSynthesis.speaking || internalSpeaking;
};

export const isPaused = (): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return window.speechSynthesis.paused || internalPaused;
};

export const startListening = (
  onResult: (text: string) => void, 
  onEnd: () => void,
  options?: { continuous?: boolean }
): any => {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.error("Speech recognition is not supported in this browser.");
    onEnd();
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = options?.continuous ?? false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event: any) => {
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        const transcript = event.results[i][0].transcript;
        onResult(transcript);
      }
    }
  };

  recognition.onerror = (event: any) => {
    if (event.error !== 'no-speech' && event.error !== 'aborted') {
      console.error("Speech recognition error:", event.error);
    }
    if (event.error === 'aborted' || event.error === 'not-allowed') {
      onEnd();
    }
  };

  recognition.onend = () => {
    onEnd();
  };

  try {
    recognition.start();
  } catch (e) {
    console.error("Failed to start recognition", e);
    onEnd();
  }
  
  return recognition;
};