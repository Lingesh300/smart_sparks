import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Headphones,
  Brain,
  CheckCircle,
  XCircle,
  ArrowRight,
  Plus,
  X,
  Volume2,
  Network,
  Image as ImageIcon,
  BrainCircuit,
  Save,
  Loader,
  Square,
  RefreshCw,
  Wand2,
  Play,
  Trash2,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Sparkles,
  Zap,
  Globe,
  Columns,
  Rows
} from 'lucide-react';
import mermaid from 'mermaid';
import {
  generateTutorResponse,
  generateWebSearchResponse,
  generateMindmapOnly,
  regenerateSVG,
  generateAnimatedSVG,
  buildSmartMathResponse
} from '../services/gemini';
import { speak, stopSpeaking } from '../services/speech';
import { resizeImage } from '../services/mediaUtils';
import { TutorResponse, ChatMessage } from '../types';
import { useQuiz } from '../hooks/useQuiz';
import { useLiveMode } from '../hooks/useLiveMode';
import MathRenderer from './MathRenderer';

interface TutorViewProps {
  contextMemory: string;
  contextImage?: string | null;
  contextImageMime?: string | null;
  activeTutorMemory?: string | null;
  /** 'full' = standalone page (default), 'panel' = compact embedded side panel */
  mode?: 'full' | 'panel';
}

const STORAGE_KEY_HISTORY = 'mindmeld_chat_history';
const STORAGE_KEY_VISUALS = 'mindmeld_visual_state_v3';
type VisualTab = 'illustration' | 'map';

const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
  return <MathRenderer content={text} />;
};

/**
 * Instant Hover Badge Wrapper so every option name is immediately visible when hovered
 */
const HoverOptionBadge: React.FC<{
  label: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}> = ({ label, position = 'top', children, className = '' }) => {
  const posClasses =
    position === 'bottom'
      ? 'top-full mt-2 left-1/2 -translate-x-1/2'
      : position === 'left'
      ? 'right-full mr-2 top-1/2 -translate-y-1/2'
      : position === 'right'
      ? 'left-full ml-2 top-1/2 -translate-y-1/2'
      : 'bottom-full mb-2 left-1/2 -translate-x-1/2';

  return (
    <div className={`relative group/tip inline-flex items-center ${className}`}>
      {children}
      <div
        className={`pointer-events-none absolute ${posClasses} z-50 px-2.5 py-1 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[11px] font-bold whitespace-nowrap opacity-0 scale-95 group-hover/tip:opacity-100 group-hover/tip:scale-100 transition-all duration-150 shadow-lg`}
      >
        {label}
      </div>
    </div>
  );
};

const TutorView: React.FC<TutorViewProps> = ({
  contextMemory,
  contextImage,
  contextImageMime,
  activeTutorMemory,
  mode = 'full'
}) => {
  // --- STATE (Preserved intact) ---
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
    return saved ? JSON.parse(saved) : [];
  });

  const initialVisuals = (): any => {
    const savedVisuals = localStorage.getItem(STORAGE_KEY_VISUALS);
    if (savedVisuals) {
      try {
        return JSON.parse(savedVisuals);
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  const [currentMindmap, setCurrentMindmap] = useState<string | null>(() => {
    const visuals = initialVisuals();
    return visuals?.mindmap || null;
  });

  const [svgHistory, setSvgHistory] = useState<{ id: number; code: string }[]>(() => {
    const visuals = initialVisuals();
    if (visuals?.svgHistory) {
      // Filter out old empty black fallback rectangles so the visual canvas always looks rich
      return visuals.svgHistory.filter(
        (item: any) => item?.code && !item.code.includes('Cosmo is ready for your next question.')
      );
    }
    return [];
  });

  const [viewingSvgId, setViewingSvgId] = useState<number | null>(() => {
    const visuals = initialVisuals();
    if (visuals?.svgHistory && visuals.svgHistory.length > 0) {
      return visuals.svgHistory[visuals.svgHistory.length - 1].id;
    }
    return null;
  });

  // Rich default mathematical board based on current topic context
  const defaultSvg =
    buildSmartMathResponse('', activeTutorMemory, contextMemory).svg_code ||
    `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="500" fill="#0f172a" rx="18"/></svg>`;

  const rawSelectedSvg =
    viewingSvgId !== null
      ? svgHistory.find(s => s.id === viewingSvgId)?.code || defaultSvg
      : svgHistory.length > 0
      ? svgHistory[svgHistory.length - 1].code
      : defaultSvg;

  const currentSvg = rawSelectedSvg.includes('Cosmo is ready for your next question.')
    ? defaultSvg
    : rawSelectedSvg;

  const [turnCounter, setTurnCounter] = useState<number>(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      return lastMsg.id ? lastMsg.id + 1 : messages.length + 1;
    }
    return 1;
  });
  const [activeTab, setActiveTab] = useState<VisualTab>('illustration');
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [isRegeneratingVisual, setIsRegeneratingVisual] = useState(false);
  const [isAnimatingVisual, setIsAnimatingVisual] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [layoutMode, setLayoutMode] = useState<'side-by-side' | 'stacked'>('side-by-side');

  const [isReloadModalOpen, setIsReloadModalOpen] = useState(false);
  const [reloadStep, setReloadStep] = useState<'ask' | 'input'>('ask');
  const [reloadSuggestion, setReloadSuggestion] = useState('');
  const [mindmapSvg, setMindmapSvg] = useState<string>('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTools, setShowTools] = useState(false);

  const [localImage, setLocalImage] = useState<string | null>(null);
  const [localImageMime, setLocalImageMime] = useState<string | null>(null);

  const [highlightedMessageId, setHighlightedMessageId] = useState<number | null>(null);

  const handleDiagramClick = (id: number) => {
    if (viewingSvgId === id) {
      const element = document.getElementById(`message-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightedMessageId(id);
        setTimeout(() => setHighlightedMessageId(null), 1000);
      }
    } else {
      setViewingSvgId(id);
    }
  };

  const [localMemory, setLocalMemory] = useState<string>(activeTutorMemory || '');
  const [isMemoryEditorOpen, setIsMemoryEditorOpen] = useState(false);
  const [memoryEditText, setMemoryEditText] = useState('');

  const [isQuickMode, setIsQuickMode] = useState(false);
  const [isWebSearchMode, setIsWebSearchMode] = useState(false);

  // --- REFS ---
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // --- HOOKS (Protected Tutor & Quiz hooks) ---
  const sendMessageRef = useRef<(text: string) => void>(() => {});

  const {
    liveMode,
    isListening,
    toggleLiveMode,
    toggleManualMic,
    setLiveMode,
    restartLiveListeningIfActive,
    recognitionRef
  } = useLiveMode({
    onUserInput: text => sendMessageRef.current(text),
    isLoading
  });

  const {
    quizData,
    isQuizActive,
    currentQuestionIndex,
    selectedOption,
    isAnswerRevealed,
    score,
    startQuiz,
    handleOptionSelect,
    handleNextQuestion
  } = useQuiz({
    setMessages,
    contextMemory,
    activeTutorMemory: localMemory,
    setIsLoading,
    setLiveMode,
    handleSendMessage: text => sendMessageRef.current(text)
  });

  // --- EFFECTS ---
  useEffect(() => {
    if (activeTutorMemory) {
      setLocalMemory(activeTutorMemory);
      setMemoryEditText(activeTutorMemory);
    }
  }, [activeTutorMemory]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const maxH = mode === 'panel' ? 96 : 120;
    el.style.height = `${Math.min(el.scrollHeight, maxH)}px`;
  }, [input, mode]);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      fontFamily: 'Inter, sans-serif',
      securityLevel: 'loose',
      mindmap: { padding: 40, useMaxWidth: false }
    });
  }, []);

  useEffect(() => {
    const renderMindmap = async () => {
      if (currentMindmap) {
        const id = `mindmap-${Date.now()}`;
        try {
          const { svg } = await mermaid.render(id, currentMindmap);
          setMindmapSvg(svg);
        } catch (error) {
          setMindmapSvg('<div class="text-xs text-rose-500">Concept map could not be rendered</div>');
        }
      } else {
        setMindmapSvg('');
      }
    };
    renderMindmap();

    localStorage.setItem(
      STORAGE_KEY_VISUALS,
      JSON.stringify({
        mindmap: currentMindmap,
        svgHistory: svgHistory
      })
    );
  }, [currentMindmap, svgHistory]);

  useEffect(() => {
    if (activeTab === 'map' && !currentMindmap && !isMapLoading) {
      fetchMissingMindmap();
    }
  }, [activeTab]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(messages));
  }, [messages]);

  // --- PROTECTED TUTOR LOGIC ---
  const handleClearHistory = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setMessages([]);
    localStorage.removeItem(STORAGE_KEY_HISTORY);
    localStorage.removeItem(STORAGE_KEY_VISUALS);

    setCurrentMindmap(null);
    setSvgHistory([]);
    setViewingSvgId(null);
    setTurnCounter(1);

    setLocalImage(null);
    setLocalImageMime(null);
    setShowTools(false);

    speak('History cleared.');
  };

  const fetchMissingMindmap = async () => {
    setIsMapLoading(true);
    const lastModelMessage = [...messages].reverse().find(m => m.role === 'model');
    const contextToMap = localMemory || activeTutorMemory || lastModelMessage?.text || contextMemory;
    const history = messages.map(m => ({ role: m.role, text: m.text }));

    if (contextToMap) {
      const code = await generateMindmapOnly(contextToMap, history);
      setCurrentMindmap(code);
    }
    setIsMapLoading(false);
  };

  const handleRegenerateVisual = async (customSuggestion?: string) => {
    const targetMessage =
      messages.find(m => m.id === viewingSvgId && m.role === 'model') ||
      [...messages].reverse().find(m => m.role === 'model');

    const baseText = targetMessage?.text || localMemory || contextMemory || 'Mathematics';

    setIsRegeneratingVisual(true);
    try {
      const newSvg = await regenerateSVG(baseText, customSuggestion);
      const newId = viewingSvgId || targetMessage?.id || Date.now();
      setSvgHistory(prev => {
        if (prev.some(item => item.id === newId)) {
          return prev.map(item => (item.id === newId ? { ...item, code: newSvg } : item));
        } else {
          return [...prev, { id: newId, code: newSvg }].slice(-20);
        }
      });
      setViewingSvgId(newId);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRegeneratingVisual(false);
    }
  };

  const handleAnimateVisual = async () => {
    const targetMessage =
      messages.find(m => m.id === viewingSvgId && m.role === 'model') ||
      [...messages].reverse().find(m => m.role === 'model');

    const baseText = targetMessage?.text || localMemory || contextMemory || 'Mathematics';

    setIsAnimatingVisual(true);
    try {
      const animatedSvg = await generateAnimatedSVG(baseText);
      const newId = viewingSvgId || targetMessage?.id || Date.now();
      setSvgHistory(prev => {
        if (prev.some(item => item.id === newId)) {
          return prev.map(item => (item.id === newId ? { ...item, code: animatedSvg } : item));
        } else {
          return [...prev, { id: newId, code: animatedSvg }].slice(-20);
        }
      });
      setViewingSvgId(newId);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnimatingVisual(false);
    }
  };

  const openReloadModal = () => {
    setIsReloadModalOpen(true);
    setReloadStep('ask');
    setReloadSuggestion('');
  };

  const confirmReload = (shouldCustomize: boolean) => {
    if (shouldCustomize) {
      setReloadStep('input');
    } else {
      handleRegenerateVisual();
      setIsReloadModalOpen(false);
    }
  };

  const submitReloadWithSuggestion = () => {
    handleRegenerateVisual(reloadSuggestion);
    setIsReloadModalOpen(false);
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    stopSpeaking();
  };

  const handleSendMessage = async (text: string, isInitial = false) => {
    if ((!text.trim() && !isInitial) || isLoading) return;

    handleStopGeneration();
    const ac = new AbortController();
    abortControllerRef.current = ac;

    const currentId = turnCounter;
    if (!isInitial) {
      setTurnCounter(c => c + 1);
    }
    const userMsg: ChatMessage = { role: 'user', text, id: currentId };
    if (!isInitial) setMessages(prev => [...prev, userMsg]);

    setInput('');
    const imageToSend = localImage;
    const mimeToSend = localImageMime;
    setLocalImage(null);
    setLocalImageMime(null);

    setIsLoading(true);
    stopSpeaking();
    if (recognitionRef.current) recognitionRef.current.abort();
    setCurrentMindmap(null);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const response: TutorResponse = isWebSearchMode
        ? await generateWebSearchResponse(text, history, contextMemory, localMemory || null, isQuickMode)
        : await generateTutorResponse(
            text,
            history,
            contextMemory,
            imageToSend,
            mimeToSend,
            localMemory || null,
            isQuickMode,
            false
          );

      if (ac.signal.aborted) return;

      if (response.svg_code) {
        setSvgHistory(prev => {
          const updated = [...prev, { id: currentId, code: response.svg_code as string }];
          return updated.slice(-20);
        });
        setViewingSvgId(currentId);
      }

      const speechText = response.speech_response + (response.question ? `\n\n${response.question}` : '');
      const modelMsg: ChatMessage = {
        role: 'model',
        text: speechText,
        mindmap: null,
        svg: response.svg_code || undefined,
        id: currentId
      };

      setMessages(prev => [...prev, modelMsg]);
      speak(speechText, restartLiveListeningIfActive);
    } catch (err) {
      if (ac.signal.aborted) return;
      console.error(err);
      restartLiveListeningIfActive();
    } finally {
      if (!ac.signal.aborted) setIsLoading(false);
    }
  };

  useEffect(() => {
    sendMessageRef.current = handleSendMessage;
  }, [handleSendMessage, isQuickMode, isWebSearchMode]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setShowTools(false);
      try {
        const { base64, mime } = await resizeImage(e.target.files[0]);
        setLocalImage(base64);
        setLocalImageMime(mime);
        speak('Image attached. Ask a question about it.');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const stablePlaceholder = isQuizActive
    ? 'Complete the active quiz above...'
    : liveMode !== 'off'
    ? 'Live voice mode is active...'
    : isQuickMode
    ? 'Ask Cosmo for a quick math explanation...'
    : 'Ask Cosmo about this lesson...';

  // --- PANEL MODE: Embedded Tutor inside LessonPlayer ---
  if (mode === 'panel') {
    return (
      <div className="flex flex-col h-full w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden">
        {/* Panel Quick Action Subbar */}
        <div className="px-3.5 py-2 bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0">
          <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 truncate">
            {localMemory ? `Focus: ${localMemory}` : 'Interactive Lesson Tutor'}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <HoverOptionBadge label="Generate AI Practice Quiz" position="bottom">
              <button
                onClick={() => startQuiz(messages)}
                disabled={isLoading || isQuizActive}
                className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[11px] font-bold flex items-center gap-1 transition-colors disabled:opacity-50"
              >
                <Brain size={12} /> Quiz Me
              </button>
            </HoverOptionBadge>
            {messages.length > 0 && (
              <HoverOptionBadge label="Clear Chat History" position="bottom">
                <button
                  onClick={e => handleClearHistory(e)}
                  disabled={isLoading || isQuizActive}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </HoverOptionBadge>
            )}
          </div>
        </div>

        {/* Active Tutor-Generated Quiz inside Panel Mode */}
        {isQuizActive && quizData ? (
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-950 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-800 shadow-xs p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-xs font-bold text-blue-700 dark:text-cyan-400 uppercase tracking-wider">
                  Cosmo Quiz: {quizData.topic}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Q{currentQuestionIndex + 1}/{quizData.questions.length}
                </span>
              </div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                <SimpleMarkdown text={quizData.questions[currentQuestionIndex].question} />
              </div>
              <div className="space-y-2">
                {quizData.questions[currentQuestionIndex].options.map((opt, idx) => {
                  let btnClass = 'w-full p-3 text-left rounded-xl border text-xs font-medium transition-all ';
                  if (isAnswerRevealed) {
                    if (idx === quizData.questions[currentQuestionIndex].correctAnswerIndex) {
                      btnClass += 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-semibold';
                    } else if (idx === selectedOption) {
                      btnClass += 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200';
                    } else {
                      btnClass += 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-400';
                    }
                  } else {
                    btnClass +=
                      'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 text-slate-700 dark:text-slate-200';
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={isAnswerRevealed}
                      className={btnClass}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <SimpleMarkdown text={opt} />
                        {isAnswerRevealed && idx === quizData.questions[currentQuestionIndex].correctAnswerIndex && (
                          <CheckCircle className="text-emerald-600 dark:text-emerald-400 shrink-0" size={16} />
                        )}
                        {isAnswerRevealed &&
                          idx === selectedOption &&
                          idx !== quizData.questions[currentQuestionIndex].correctAnswerIndex && (
                            <XCircle className="text-rose-600 dark:text-rose-400 shrink-0" size={16} />
                          )}
                      </div>
                    </button>
                  );
                })}
              </div>
              {isAnswerRevealed && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/70 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    <SimpleMarkdown text={quizData.questions[currentQuestionIndex].explanation} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <HoverOptionBadge label="Listen to Explanation">
                      <button
                        onClick={() => speak(quizData.questions[currentQuestionIndex].explanation)}
                        className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800"
                      >
                        <Volume2 size={15} />
                      </button>
                    </HoverOptionBadge>
                    <button
                      onClick={handleNextQuestion}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center gap-1"
                    >
                      {currentQuestionIndex < quizData.questions.length - 1 ? 'Next' : 'Finish Quiz'}{' '}
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Panel Chat History */
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 min-h-0 scroll-smooth bg-slate-50/50 dark:bg-slate-950/60">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-3 py-6 text-center px-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-2xl shadow-xs">
                  🦉
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    Hi! I'm Cosmo, your Math Tutor
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                    Ask me about any formula, step, or example in this lesson:
                  </p>
                </div>
                <div className="space-y-1.5 w-full max-w-xs pt-1">
                  {[
                    'Explain this step in simple words',
                    'Walk me through a worked example',
                    'Show me how the formula works'
                  ].map(prompt => (
                    <button
                      key={prompt}
                      onClick={() => handleSendMessage(prompt)}
                      disabled={isLoading}
                      className="w-full text-left px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 text-xs font-medium text-slate-700 dark:text-slate-200 transition-all shadow-xs"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase px-1">
                  {msg.role === 'model' ? '🦉 Cosmo' : 'You'}
                </span>
                <div className={`flex gap-1.5 w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'model' ? (
                    <div className="flex items-start gap-1.5 max-w-[92%]">
                      <div className="p-3 rounded-2xl rounded-bl-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 leading-relaxed shadow-xs">
                        <SimpleMarkdown text={msg.text} />
                      </div>
                      <HoverOptionBadge label="Read Aloud" position="left">
                        <button
                          onClick={() => speak(msg.text, restartLiveListeningIfActive)}
                          className="mt-1 p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg shrink-0 transition-colors"
                        >
                          <Volume2 size={14} />
                        </button>
                      </HoverOptionBadge>
                    </div>
                  ) : (
                    <div className="max-w-[85%] p-3 rounded-2xl rounded-br-sm bg-blue-600 text-xs text-white leading-relaxed shadow-xs">
                      {msg.text}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 px-2 py-1">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="font-medium">Cosmo is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Polished Panel Composer */}
        <div className="shrink-0 p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-end gap-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus-within:border-blue-600 dark:focus-within:border-cyan-400 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-2 focus-within:ring-blue-500/15 rounded-2xl px-3 py-2 transition-all">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (input.trim()) handleSendMessage(input);
                }
              }}
              placeholder={stablePlaceholder}
              disabled={isLoading || isQuizActive}
              rows={1}
              className="flex-1 bg-transparent border-0 focus:ring-0 p-0.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-none overflow-y-auto outline-none leading-relaxed disabled:opacity-50"
              style={{ maxHeight: '96px' }}
            />

            <HoverOptionBadge label={isListening ? 'Stop Voice Input' : 'Voice Microphone Input'}>
              <button
                onClick={() => toggleManualMic(input, setInput)}
                disabled={isQuizActive}
                className={`shrink-0 p-2 rounded-xl transition-all ${
                  isListening
                    ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 animate-pulse'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700'
                }`}
              >
                {isListening ? <MicOff size={15} /> : <Mic size={15} />}
              </button>
            </HoverOptionBadge>

            <HoverOptionBadge label={isLoading ? 'Stop Generating' : 'Send Message (Enter)'} position="left">
              <button
                onClick={isLoading ? handleStopGeneration : () => { if (input.trim()) handleSendMessage(input); }}
                disabled={!isLoading && (!input.trim() || isQuizActive)}
                className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all shadow-xs focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isLoading
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:hover:bg-blue-600'
                }`}
              >
                {isLoading ? <Square size={13} fill="currentColor" /> : <Send size={14} />}
              </button>
            </HoverOptionBadge>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 px-1">
            <span>Enter to send • Shift+Enter for new line</span>
            {isListening && <span className="text-rose-600 dark:text-rose-400 font-semibold">Listening...</span>}
          </div>
        </div>
      </div>
    );
  }

  // --- FULL MODE: Standalone Cosmo AI Math Studio ---
  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden relative">
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />

      {/* ── STUDIO TOP HEADER BAR WITH LABELED OPTIONS & HOVER BADGES ────────── */}
      <div className="px-4 sm:px-6 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
            🦉
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                Cosmo AI Mathematics Studio
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Interactive Visual Tutor
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              Active Focus: <strong className="text-slate-700 dark:text-slate-200">{localMemory || contextMemory || 'Georgia K–12 Mathematics'}</strong>
            </p>
          </div>
        </div>

        {/* Studio Quick Topic & Mode Controls (All with Hover Option Names) */}
        <div className="flex flex-wrap items-center gap-2">
          <HoverOptionBadge label="Edit Active Learning Topic Focus" position="bottom">
            <button
              onClick={() => {
                setMemoryEditText(localMemory);
                setIsMemoryEditorOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-cyan-300 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            >
              <BrainCircuit size={14} />
              <span>Topic Focus</span>
            </button>
          </HoverOptionBadge>

          <HoverOptionBadge label="Generate 3-Question Practice Quiz" position="bottom">
            <button
              onClick={() => startQuiz(messages)}
              disabled={isLoading || isQuizActive}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-50"
            >
              <Brain size={14} />
              <span>Generate Quiz</span>
            </button>
          </HoverOptionBadge>

          <HoverOptionBadge
            label={layoutMode === 'side-by-side' ? 'Switch to Stacked Layout' : 'Switch to Side-by-Side Layout'}
            position="bottom"
          >
            <button
              onClick={() => setLayoutMode(l => (l === 'side-by-side' ? 'stacked' : 'side-by-side'))}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold transition-colors"
            >
              {layoutMode === 'side-by-side' ? <Rows size={14} /> : <Columns size={14} />}
              <span>{layoutMode === 'side-by-side' ? 'Stacked View' : 'Split View'}</span>
            </button>
          </HoverOptionBadge>

          {messages.length > 0 && (
            <HoverOptionBadge label="Clear Conversation & Diagrams" position="bottom">
              <button
                onClick={e => handleClearHistory(e)}
                disabled={isLoading || isQuizActive}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:border-rose-200 dark:hover:border-rose-800 text-xs font-bold transition-colors"
              >
                <Trash2 size={14} />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </HoverOptionBadge>
          )}
        </div>
      </div>

      {/* ── MAIN WORKSPACE: SIDE-BY-SIDE OR STACKED STUDIO ──────────────────── */}
      <div
        className={`flex-1 flex overflow-hidden ${
          isExpanded
            ? 'flex-col'
            : layoutMode === 'side-by-side'
            ? 'flex-col lg:flex-row'
            : 'flex-col'
        }`}
      >
        {/* ── VISUAL DIAGRAM & QUIZ STAGE ───────────────────────────────────── */}
        <div
          className={`flex flex-col p-3 sm:p-4 overflow-hidden transition-all ${
            isExpanded
              ? 'w-full h-full'
              : layoutMode === 'side-by-side'
              ? 'w-full lg:w-[54%] xl:w-[56%] h-[44%] lg:h-full border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800'
              : 'w-full h-[48%] border-b border-slate-200 dark:border-slate-800'
          }`}
        >
          {isQuizActive && quizData ? (
            <div className="w-full h-full flex items-center justify-center overflow-y-auto p-2">
              <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 sm:p-8 animate-fade-in flex flex-col z-10">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800">
                      Tutor Quiz
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {quizData.topic}
                    </h2>
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                    Question {currentQuestionIndex + 1} of {quizData.questions.length}
                  </span>
                </div>
                <div className="text-base sm:text-lg text-slate-800 dark:text-slate-100 mb-5 font-semibold leading-relaxed">
                  <SimpleMarkdown text={quizData.questions[currentQuestionIndex].question} />
                </div>
                <div className="grid grid-cols-1 gap-2.5 mb-5">
                  {quizData.questions[currentQuestionIndex].options.map((opt, idx) => {
                    let btnClass = 'p-3.5 text-left rounded-xl border-2 transition-all font-medium text-sm ';
                    if (isAnswerRevealed) {
                      if (idx === quizData.questions[currentQuestionIndex].correctAnswerIndex) {
                        btnClass += 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200';
                      } else if (idx === selectedOption) {
                        btnClass += 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200';
                      } else {
                        btnClass += 'border-slate-100 dark:border-slate-800 text-slate-400';
                      }
                    } else {
                      btnClass +=
                        'border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 text-slate-700 dark:text-slate-200';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(idx)}
                        disabled={isAnswerRevealed}
                        className={btnClass}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <SimpleMarkdown text={opt} />
                          {isAnswerRevealed && idx === quizData.questions[currentQuestionIndex].correctAnswerIndex && (
                            <CheckCircle className="text-emerald-600 dark:text-emerald-400 shrink-0" size={18} />
                          )}
                          {isAnswerRevealed &&
                            idx === selectedOption &&
                            idx !== quizData.questions[currentQuestionIndex].correctAnswerIndex && (
                              <XCircle className="text-rose-600 dark:text-rose-400 shrink-0" size={18} />
                            )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {isAnswerRevealed && (
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm flex-1">
                      <SimpleMarkdown text={quizData.questions[currentQuestionIndex].explanation} />
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <HoverOptionBadge label="Listen to Explanation">
                        <button
                          onClick={() => speak(quizData.questions[currentQuestionIndex].explanation)}
                          className="p-2 rounded-full text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Volume2 size={18} />
                        </button>
                      </HoverOptionBadge>
                      <button
                        onClick={handleNextQuestion}
                        className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-xs"
                      >
                        {currentQuestionIndex < quizData.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}{' '}
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden relative">
              {/* Visual Canvas Toolbar with Labeled Hover Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 z-20 shrink-0 bg-slate-50/80 dark:bg-slate-800/50">
                <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl">
                  <HoverOptionBadge label="Show Interactive Math Diagram" position="bottom">
                    <button
                      onClick={() => setActiveTab('illustration')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
                        activeTab === 'illustration'
                          ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <ImageIcon size={14} className="text-blue-600 dark:text-cyan-400" />
                      <span>Visual Diagram</span>
                    </button>
                  </HoverOptionBadge>

                  <HoverOptionBadge label="Show Concept Mind Map" position="bottom">
                    <button
                      onClick={() => setActiveTab('map')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
                        activeTab === 'map'
                          ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Network size={14} className="text-indigo-600 dark:text-indigo-400" />
                      <span>Concept Map</span>
                    </button>
                  </HoverOptionBadge>
                </div>

                {/* Right Canvas Action Buttons with Instant Hover Option Names */}
                <div className="flex items-center gap-1.5">
                  <div className="relative">
                    <HoverOptionBadge label="Redraw or Customize Diagram" position="bottom">
                      <button
                        onClick={openReloadModal}
                        disabled={isRegeneratingVisual || isLoading}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                          isRegeneratingVisual
                            ? 'bg-blue-50 border-blue-200 text-blue-600'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-300'
                        }`}
                      >
                        <RefreshCw size={13} className={isRegeneratingVisual ? 'animate-spin' : ''} />
                        <span className="hidden sm:inline">Redraw</span>
                      </button>
                    </HoverOptionBadge>

                    {isReloadModalOpen && (
                      <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 z-50 animate-fade-in">
                        {reloadStep === 'ask' ? (
                          <div className="flex flex-col gap-3">
                            <div className="flex items-start justify-between">
                              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                                Customize diagram style?
                              </p>
                              <button onClick={() => setIsReloadModalOpen(false)}>
                                <X size={14} />
                              </button>
                            </div>
                            <div className="flex gap-2 mt-1">
                              <button
                                onClick={() => confirmReload(true)}
                                className="flex-1 bg-blue-600 text-white text-xs font-semibold py-2 rounded-lg"
                              >
                                Add Suggestion
                              </button>
                              <button
                                onClick={() => confirmReload(false)}
                                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold py-2 rounded-lg"
                              >
                                Redraw Now
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-500 uppercase">Customize Visual</span>
                              <button onClick={() => setIsReloadModalOpen(false)}>
                                <X size={14} />
                              </button>
                            </div>
                            <textarea
                              value={reloadSuggestion}
                              onChange={e => setReloadSuggestion(e.target.value)}
                              className="w-full h-20 p-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                              placeholder="e.g. 'Add coordinate grid', 'Show step-by-step labels'"
                              autoFocus
                            />
                            <div className="flex flex-wrap gap-1.5">
                              {['Simplify', 'Add Labels', 'Step-by-Step', 'High Contrast'].map(tag => (
                                <button
                                  key={tag}
                                  onClick={() => setReloadSuggestion(tag)}
                                  className="px-2 py-1 text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded hover:bg-slate-200 border border-slate-200 dark:border-slate-700"
                                >
                                  {tag}
                                </button>
                              ))}
                            </div>
                            <button
                              onClick={submitReloadWithSuggestion}
                              className="w-full bg-blue-600 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5"
                            >
                              <Wand2 size={12} /> Generate Custom Diagram
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <HoverOptionBadge label="Animate Mathematical Diagram" position="bottom">
                    <button
                      onClick={handleAnimateVisual}
                      disabled={isAnimatingVisual || isRegeneratingVisual || isLoading}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                        isAnimatingVisual
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300'
                      }`}
                    >
                      <Play size={13} className={isAnimatingVisual ? 'animate-pulse' : ''} />
                      <span className="hidden sm:inline">Animate</span>
                    </button>
                  </HoverOptionBadge>

                  <HoverOptionBadge
                    label={isExpanded ? 'Exit Fullscreen Canvas' : 'Expand Canvas Fullscreen'}
                    position="bottom"
                  >
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="flex items-center justify-center w-8 h-8 rounded-lg border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    </button>
                  </HoverOptionBadge>
                </div>
              </div>

              {/* Diagram History Bar */}
              {activeTab === 'illustration' && svgHistory.length > 0 && (
                <div className="flex gap-2 px-4 py-1.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 overflow-x-auto shrink-0 items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1 shrink-0">
                    Saved Diagrams:
                  </span>
                  {svgHistory.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleDiagramClick(item.id)}
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap border flex-shrink-0 ${
                        viewingSvgId === item.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      Diagram #{item.id}
                    </button>
                  ))}
                </div>
              )}

              {/* Main Visual Stage */}
              <div className="flex-1 relative grid-pattern flex flex-col min-h-0 overflow-hidden">
                {activeTab === 'illustration' ? (
                  isRegeneratingVisual ? (
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-500">
                      <Loader className="animate-spin text-blue-600" size={28} />
                      <span className="text-xs font-semibold">Drawing custom mathematical diagram...</span>
                    </div>
                  ) : isAnimatingVisual ? (
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-500">
                      <Loader className="animate-spin text-indigo-600" size={28} />
                      <span className="text-xs font-semibold">Animating mathematical visual...</span>
                    </div>
                  ) : (
                    <div className="w-full h-full relative group flex items-center justify-center p-3 sm:p-5 overflow-auto">
                      <div className="absolute top-3 right-3 z-20">
                        <HoverOptionBadge label="Copy SVG Code to Clipboard" position="left">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(currentSvg);
                              setIsCopied(true);
                              setTimeout(() => setIsCopied(false), 2000);
                            }}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xs border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg shadow-xs hover:bg-white transition-colors"
                          >
                            {isCopied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                            <span className="text-xs font-semibold">{isCopied ? 'Copied!' : 'Copy SVG'}</span>
                          </button>
                        </HoverOptionBadge>
                      </div>
                      <div
                        key={currentSvg.length}
                        className="w-full h-full flex items-center justify-center animate-fade-in svg-container [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-full [&>svg]:object-contain [&>svg]:rounded-xl [&>svg]:shadow-md"
                        dangerouslySetInnerHTML={{ __html: currentSvg }}
                      />
                    </div>
                  )
                ) : isMapLoading ? (
                  <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-500">
                    <Loader className="animate-spin text-blue-600" size={28} />
                    <span className="text-xs font-semibold">Building Concept Mind Map...</span>
                  </div>
                ) : currentMindmap ? (
                  <div
                    className="mermaid w-full h-full flex items-center justify-center overflow-auto p-4 animate-fade-in [&>svg]:max-w-full [&>svg]:max-h-full"
                    dangerouslySetInnerHTML={{ __html: mindmapSvg }}
                  />
                ) : (
                  <div className="h-full text-slate-400 text-sm flex flex-col items-center justify-center gap-3 p-6 text-center">
                    <Network size={32} className="text-indigo-500" />
                    <span>Click below to generate a structured Concept Map for your current math topic.</span>
                    <button
                      onClick={fetchMissingMindmap}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 shadow-xs"
                    >
                      Generate Concept Map
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── CONVERSATION & COMPOSER PANEL ──────────────────────────────────── */}
        {!isExpanded && (
          <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 overflow-hidden min-h-0">
            {/* Quick Math Topic Exploration Bar */}
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto shrink-0">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
                Explore:
              </span>
              {[
                { label: '📐 Trigonometry (sin/cos)', prompt: 'Explain trigonometry and sin(θ) with a visual diagram' },
                { label: '⚡ Differential Calculus', prompt: 'Explain derivatives and tangent line slope with a visual' },
                { label: '🌌 Integral Calculus', prompt: 'Explain Riemann sums and definite integrals visually' },
                { label: '🪐 Quadratic Formula', prompt: 'Explain quadratic equations and parabolas step by step' },
                { label: '📈 Linear Slope (y=mx+b)', prompt: 'Explain slope-intercept form y = mx + b with an example' }
              ].map(chip => (
                <button
                  key={chip.label}
                  onClick={() => handleSendMessage(chip.prompt)}
                  disabled={isLoading || isQuizActive}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-cyan-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold whitespace-nowrap transition-colors shrink-0"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {localImage && (
              <div className="px-4 pt-2.5 flex items-center gap-2 animate-fade-in shrink-0">
                <div className="relative group">
                  <img
                    src={`data:${localImageMime};base64,${localImage}`}
                    alt="Upload"
                    className="h-12 w-12 object-cover rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs"
                  />
                  <button
                    onClick={() => {
                      setLocalImage(null);
                      setLocalImageMime(null);
                    }}
                    className="absolute -top-2 -right-2 bg-slate-800 text-white p-0.5 rounded-full"
                  >
                    <X size={12} />
                  </button>
                </div>
                <span className="text-xs text-blue-600 dark:text-cyan-400 font-semibold">
                  Math image attached — ask a question below!
                </span>
              </div>
            )}

            {/* Chat Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4 min-h-0 scroll-smooth bg-slate-50/40 dark:bg-slate-950/40">
              {messages.length === 0 && (
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-xl shrink-0">
                      🦉
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Welcome to Cosmo's Interactive Math Studio!
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Ask any math question, click a topic chip above, or choose a learning action below:
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {[
                      'Walk me through a step-by-step example',
                      'Draw a visual diagram for this topic',
                      'Explain the key formulas and why they work',
                      'Give me a challenge problem to solve'
                    ].map(q => (
                      <button
                        key={q}
                        onClick={() => handleSendMessage(q)}
                        className="p-2.5 rounded-xl text-left bg-slate-50 dark:bg-slate-800/70 hover:bg-blue-50 dark:hover:bg-blue-950/50 text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-cyan-300 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold transition-all"
                      >
                        {q} →
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  id={msg.id && msg.role === 'model' ? `message-${msg.id}` : `message-idx-${idx}`}
                  className={`flex flex-col gap-1 p-1 rounded-xl transition-all duration-500 ${
                    msg.id && highlightedMessageId === msg.id && msg.role === 'model'
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 ring-2 ring-emerald-400'
                      : ''
                  } ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] font-bold text-slate-400 uppercase px-1">
                    {msg.role === 'model' ? '🦉 Cosmo Tutor' : 'You'} {msg.id ? `#${msg.id}` : ''}
                  </span>
                  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
                    {msg.role === 'model' ? (
                      <div className="flex items-start gap-2 max-w-[92%]">
                        <div className="p-4 rounded-2xl rounded-bl-sm text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-xs">
                          <SimpleMarkdown text={msg.text} />
                        </div>
                        <HoverOptionBadge label="Read Explanation Aloud" position="left">
                          <button
                            onClick={() => speak(msg.text, restartLiveListeningIfActive)}
                            className="mt-1 p-2 text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-full shrink-0 transition-colors"
                          >
                            <Volume2 size={16} />
                          </button>
                        </HoverOptionBadge>
                      </div>
                    ) : (
                      <div className="max-w-[85%] p-3.5 rounded-2xl rounded-br-sm text-sm leading-relaxed bg-blue-600 text-white shadow-xs">
                        {msg.text}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-cyan-400 px-2 animate-pulse">
                  <Sparkles size={14} />
                  <span className="font-semibold">Cosmo is crafting your explanation and diagram...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ── POLISHED COMPOSER WITH VISIBLE HOVER LABELS ON EVERY OPTION ── */}
            <div className="px-4 py-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2 shrink-0">
              {/* Quick Options Bar Above Input (With Hover Tooltips & Active States) */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <HoverOptionBadge label="Upload Math Problem Image">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isLoading || isQuizActive || liveMode !== 'off'}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-cyan-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors disabled:opacity-40"
                    >
                      <ImageIcon size={13} className="text-blue-600 dark:text-cyan-400" />
                      <span>Upload Image</span>
                    </button>
                  </HoverOptionBadge>

                  <HoverOptionBadge label="Start Hands-Free Live Voice Mode">
                    <button
                      onClick={toggleLiveMode}
                      disabled={isQuizActive}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border flex items-center gap-1.5 transition-colors ${
                        liveMode === 'active'
                          ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 animate-pulse'
                          : liveMode === 'standby'
                          ? 'bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-300'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <Headphones size={13} className="text-indigo-600 dark:text-indigo-400" />
                      <span>{liveMode !== 'off' ? `Live: ${liveMode}` : 'Live Voice'}</span>
                    </button>
                  </HoverOptionBadge>

                  <HoverOptionBadge label="Toggle Fast Text-Only Answers">
                    <button
                      onClick={() => setIsQuickMode(!isQuickMode)}
                      disabled={isLoading || isQuizActive || liveMode !== 'off'}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border flex items-center gap-1 transition-colors ${
                        isQuickMode
                          ? 'bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-amber-50/50'
                      }`}
                    >
                      <Zap size={12} className="text-amber-500" />
                      <span>Quick Mode</span>
                    </button>
                  </HoverOptionBadge>

                  <HoverOptionBadge label="Toggle Web-Grounded Math Context">
                    <button
                      onClick={() => setIsWebSearchMode(!isWebSearchMode)}
                      disabled={isLoading || isQuizActive || liveMode !== 'off'}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border flex items-center gap-1 transition-colors ${
                        isWebSearchMode
                          ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-indigo-50/50'
                      }`}
                    >
                      <Globe size={12} className="text-indigo-500" />
                      <span>Web Context</span>
                    </button>
                  </HoverOptionBadge>
                </div>

                <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:inline">
                  Enter to send • Shift+Enter for new line
                </span>
              </div>

              {/* Main Composer Input Row */}
              <div className="flex items-end gap-2 w-full">
                {/* Plus Menu Button with Hover Option Name */}
                <div className="relative shrink-0">
                  {showTools && (
                    <div className="absolute bottom-full left-0 mb-2.5 flex flex-col gap-1 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 animate-fade-in z-50 min-w-[195px]">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading || isQuizActive || liveMode !== 'off'}
                        className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 flex items-center gap-2.5 transition-colors disabled:opacity-40"
                      >
                        <ImageIcon size={15} className="text-blue-600" /> Upload Math Image
                      </button>
                      <button
                        onClick={() => {
                          setShowTools(false);
                          startQuiz(messages);
                        }}
                        disabled={isLoading || isQuizActive || liveMode !== 'off'}
                        className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-700 flex items-center gap-2.5 transition-colors disabled:opacity-40"
                      >
                        <Brain size={15} className="text-emerald-600" /> Start Tutor Quiz
                      </button>
                      <button
                        onClick={() => {
                          setShowTools(false);
                          toggleLiveMode();
                        }}
                        disabled={isQuizActive}
                        className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
                      >
                        <Headphones size={15} className="text-indigo-600" />{' '}
                        {liveMode !== 'off' ? 'Stop Live Voice' : 'Live Voice Mode'}
                      </button>
                      <button
                        onClick={() => setIsQuickMode(!isQuickMode)}
                        disabled={isLoading || isQuizActive || liveMode !== 'off'}
                        className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
                      >
                        <Zap size={15} className="text-amber-500" />{' '}
                        {isQuickMode ? 'Quick Mode: ON' : 'Quick Answer Mode'}
                      </button>
                      <button
                        onClick={() => setIsWebSearchMode(!isWebSearchMode)}
                        disabled={isLoading || isQuizActive || liveMode !== 'off'}
                        className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
                      >
                        <Globe size={15} className="text-indigo-500" />{' '}
                        {isWebSearchMode ? 'Web Search: ON' : 'Web Search Mode'}
                      </button>
                      <div className="w-full h-px bg-slate-100 dark:bg-slate-800 my-0.5" />
                      <button
                        onClick={e => handleClearHistory(e)}
                        disabled={isLoading || isQuizActive || liveMode !== 'off'}
                        className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2.5 transition-colors"
                      >
                        <Trash2 size={15} /> Clear Conversation
                      </button>
                    </div>
                  )}
                  <HoverOptionBadge label="More Tutor Options" position="top">
                    <button
                      onClick={() => setShowTools(!showTools)}
                      className={`p-3 rounded-xl border transition-all focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        showTools
                          ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-300 border-blue-200 dark:border-blue-800'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {showTools ? <X size={18} /> : <Plus size={18} />}
                    </button>
                  </HoverOptionBadge>
                </div>

                {/* Rounded Composer Input Box */}
                <div className="flex-1 flex items-end gap-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 focus-within:border-blue-600 dark:focus-within:border-cyan-400 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-2 focus-within:ring-blue-500/15 rounded-2xl px-4 py-2.5 transition-all">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(input);
                      }
                    }}
                    placeholder={stablePlaceholder}
                    disabled={isListening || isQuizActive || (liveMode !== 'off' && !isLoading)}
                    rows={1}
                    className="flex-1 bg-transparent border-0 focus:ring-0 p-0 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-none overflow-y-auto outline-none leading-relaxed disabled:opacity-50"
                    style={{ maxHeight: '120px' }}
                  />

                  {/* Voice Input Mic Button with Hover Option Name */}
                  <HoverOptionBadge label={isListening ? 'Stop Listening' : 'Voice Microphone Input'}>
                    <button
                      onClick={() => toggleManualMic(input, setInput)}
                      disabled={isQuizActive}
                      className={`shrink-0 p-1.5 rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        isListening
                          ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 animate-pulse'
                          : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700'
                      }`}
                    >
                      {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                    </button>
                  </HoverOptionBadge>
                </div>

                {/* Send / Stop Button with Hover Option Name */}
                <HoverOptionBadge label={isLoading ? 'Stop Generation' : 'Send Message (Enter)'} position="left">
                  <button
                    onClick={isLoading ? handleStopGeneration : () => handleSendMessage(input)}
                    disabled={isQuizActive || (liveMode !== 'off' && !isLoading) || (!input.trim() && !isLoading)}
                    className={`shrink-0 p-3 rounded-xl transition-all shadow-xs font-bold focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      isLoading
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:hover:bg-blue-600'
                    }`}
                  >
                    {isLoading ? <Square size={18} fill="currentColor" /> : <Send size={18} />}
                  </button>
                </HoverOptionBadge>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Memory Editor Modal */}
      {isMemoryEditorOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-6 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/60">
              <div className="flex items-center gap-2 text-blue-700 dark:text-cyan-400">
                <BrainCircuit size={18} />
                <h3 className="font-bold text-sm">Active Learning Topic Focus</h3>
              </div>
              <button
                onClick={() => setIsMemoryEditorOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-hidden bg-white dark:bg-slate-900">
              <textarea
                value={memoryEditText}
                onChange={e => setMemoryEditText(e.target.value)}
                className="w-full h-56 p-3 border border-slate-300 dark:border-slate-700 rounded-xl resize-none text-sm bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                placeholder="Enter math standard, topic, or concepts to focus on..."
              />
            </div>
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2 bg-slate-50 dark:bg-slate-800/60">
              <button
                onClick={() => setIsMemoryEditorOpen(false)}
                className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setLocalMemory(memoryEditText);
                  setIsMemoryEditorOpen(false);
                  speak('Memory updated.');
                }}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Save size={14} /> Save Topic Focus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorView;