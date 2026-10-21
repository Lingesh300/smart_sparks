import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Image as ImageIcon, X, Volume2, Square, Highlighter, Rocket, Loader } from 'lucide-react';
import { generateDiarySummary } from '../services/gemini';
import { startListening, speak, stopSpeaking } from '../services/speech';
import { resizeImage } from '../services/mediaUtils';

interface DiaryViewProps {
  initialText: string;
  onUpdateText: (text: string) => void;
  contextMemory: string;
  initialImage: string | null;
  onUpdateImage: (base64: string | null, mimeType: string | null) => void;
  onSendToTutor: (text: string) => void;
}

const DiaryView: React.FC<DiaryViewProps> = ({
  initialText,
  onUpdateText,
  initialImage,
  onUpdateImage,
  onSendToTutor
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isGeneratingForRocket, setIsGeneratingForRocket] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (isSaved) setIsSaved(false);
  }, [initialText]);

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  const handleRocketClick = async () => {
    if (isGeneratingForRocket || isSaved) return;

    let textToSend = '';
    if (initialText.trim()) {
      setIsGeneratingForRocket(true);
      try {
        const res = await generateDiarySummary(initialText, '', initialImage, null);
        textToSend = res.summary;
      } catch (e) {
        console.error(e);
        textToSend = initialText;
      } finally {
        setIsGeneratingForRocket(false);
      }
    }

    if (textToSend) {
      setIsSaved(true);
      onSendToTutor(textToSend);
    }
  };

  const toggleMic = () => {
    if (isListening) {
      setIsListening(false);
      if (recognitionRef.current) recognitionRef.current.stop();
    } else {
      setIsListening(true);
      recognitionRef.current = startListening(
        (text) => {
          const currentVal = textareaRef.current?.value || initialText;
          onUpdateText(currentVal + (currentVal ? ' ' : '') + text);
        },
        () => setIsListening(false)
      );
    }
  };

  const handleHighlight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start === end) return;

    const selectedText = initialText.substring(start, end);
    const before = initialText.substring(0, start);
    const after = initialText.substring(end);

    onUpdateText(`${before}**${selectedText}**${after}`);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const { base64, mime } = await resizeImage(e.target.files[0]);
      onUpdateImage(base64, mime);
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speak(initialText, () => {
        setIsSpeaking(false);
      });
    }
  };

  return (
    <div className="flex h-full w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-8 overflow-y-auto transition-colors">
      <div className="max-w-4xl mx-auto w-full h-full flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 sm:p-8 relative group">
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <span className="text-xs font-extrabold text-blue-600 dark:text-cyan-400 tracking-wider uppercase flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400" />
            Mathematics Study Scratchpad &amp; Notes
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={handleRocketClick}
              disabled={isGeneratingForRocket || !initialText.trim()}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                isSaved
                  ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  : 'text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 hover:bg-blue-100 disabled:opacity-40'
              }`}
              title="Send Notes to Cosmo Tutor"
            >
              {isGeneratingForRocket ? (
                <Loader size={14} className="animate-spin" />
              ) : (
                <Rocket size={14} />
              )}
              <span>Send to Cosmo</span>
            </button>
            <button
              onClick={toggleSpeech}
              disabled={!initialText.trim()}
              className={`p-2 rounded-xl transition-all ${
                isSpeaking
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-950'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isSpeaking ? 'Stop Reading' : 'Read Aloud'}
            >
              {isSpeaking ? <Square size={16} fill="currentColor" /> : <Volume2 size={16} />}
            </button>
            <button
              onClick={handleHighlight}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-xl transition-all"
              title="Bold / Highlight Selection"
            >
              <Highlighter size={16} />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`p-2 rounded-xl transition-all ${
                initialImage
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Attach Handwritten Math Photo"
            >
              <ImageIcon size={16} />
            </button>
            <button
              onClick={toggleMic}
              className={`p-2 rounded-xl transition-all ${
                isListening
                  ? 'text-rose-600 bg-rose-50 animate-pulse'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Dictate Notes"
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
          accept="image/*"
        />

        <div className="flex-1 relative flex flex-col min-h-0">
          {initialImage && (
            <div className="mb-4 relative group shrink-0">
              <img
                src={`data:image/jpeg;base64,${initialImage}`}
                alt="Context"
                className="w-full h-48 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
              />
              <button
                onClick={() => onUpdateImage(null, null)}
                className="absolute top-2 right-2 bg-slate-900/70 text-white p-1 rounded-full"
              >
                <X size={14} />
              </button>
            </div>
          )}
          <textarea
            ref={textareaRef}
            className="w-full flex-1 resize-none outline-none bg-transparent text-slate-900 dark:text-slate-100 text-base leading-relaxed placeholder-slate-400 dark:placeholder-slate-500"
            placeholder="Write down formulas, scratch work, or math questions here, then click 'Send to Cosmo'..."
            value={initialText}
            onChange={(e) => onUpdateText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default DiaryView;