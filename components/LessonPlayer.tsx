import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Volume2,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Sparkles,
  Gamepad2,
  Brain,
  BookOpen,
  ChevronDown,
  MessageSquare,
  Maximize2,
  Target,
  Calculator,
  HelpCircle
} from 'lucide-react';
import { CurriculumLesson, LessonScene } from '../types';
import MathRenderer from './MathRenderer';
import { speak, stopSpeaking, pauseSpeaking, resumeSpeaking } from '../services/speech';
import TutorView from './TutorView';

interface LessonPlayerProps {
  lesson: CurriculumLesson;
  onComplete: (lessonId: string, xp: number) => void;
  onStartQuiz: () => void;
  onStartGame?: (gameId: string) => void;
  onAskTutor: (topicPrompt: string) => void;
  onBackToCurriculum?: () => void;
}

type SpeechPlaybackState = 'idle' | 'playing' | 'paused';

export const LessonPlayer: React.FC<LessonPlayerProps> = ({
  lesson,
  onComplete,
  onStartQuiz,
  onStartGame,
  onAskTutor,
  onBackToCurriculum,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [speechState, setSpeechState] = useState<SpeechPlaybackState>('idle');
  const [spokenCharIndex, setSpokenCharIndex] = useState<number>(0);
  const [autoNarrateSteps, setAutoNarrateSteps] = useState(false); // OFF by default — never autoplays on open
  const [showCaptions, setShowCaptions] = useState(true);
  const [customN, setCustomN] = useState<number>(4);
  const [customSlope, setCustomSlope] = useState<number>(2);
  const [customIntercept, setCustomIntercept] = useState<number>(1);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const [isTutorPanelOpen, setIsTutorPanelOpen] = useState(false);

  // Interactive Quick-Check state per step
  const [selectedCheckOption, setSelectedCheckOption] = useState<number | null>(null);
  const [isCheckRevealed, setIsCheckRevealed] = useState(false);

  const scenes = lesson.scenes;
  const currentScene: LessonScene = scenes[currentStep] || scenes[0];

  // Reset step, completion, quick-check, and cancel any active speech when changing lessons or unmounting
  useEffect(() => {
    stopSpeaking();
    setSpeechState('idle');
    setSpokenCharIndex(0);
    setCurrentStep(0);
    setIsLessonCompleted(false);
    setAutoNarrateSteps(false);
    setSelectedCheckOption(null);
    setIsCheckRevealed(false);

    return () => {
      stopSpeaking();
    };
  }, [lesson.id]);

  // Sync interactive partition count if scene specifies nRectangles
  useEffect(() => {
    if (currentScene?.visualConfig?.nRectangles) {
      setCustomN(currentScene.visualConfig.nRectangles);
    }
    setSelectedCheckOption(null);
    setIsCheckRevealed(false);
  }, [currentStep, currentScene?.id]);

  // Helper to start speaking a given scene's narration explicitly
  const startSceneNarration = (sceneToRead: LessonScene | undefined) => {
    if (!sceneToRead || !sceneToRead.narration) return;
    stopSpeaking();
    setSpokenCharIndex(0);
    setSpeechState('playing');
    speak(
      sceneToRead.narration,
      () => {
        setSpeechState('idle');
        setSpokenCharIndex(0);
      },
      (charIdx) => {
        setSpokenCharIndex(charIdx);
      }
    );
  };

  // Explicit user playback handlers (never triggered on mount)
  const handlePlay = () => {
    startSceneNarration(currentScene);
  };

  const handlePause = () => {
    const pausedOk = pauseSpeaking();
    if (pausedOk) {
      setSpeechState('paused');
    } else {
      stopSpeaking();
      setSpeechState('idle');
    }
  };

  const handleResume = () => {
    if (speechState !== 'paused') {
      startSceneNarration(currentScene);
      return;
    }
    const resumedOk = resumeSpeaking(
      () => {
        setSpeechState('idle');
        setSpokenCharIndex(0);
      },
      (charIdx) => {
        setSpokenCharIndex(charIdx);
      }
    );
    if (resumedOk) {
      setSpeechState('playing');
    } else {
      startSceneNarration(currentScene);
    }
  };

  const handleStop = () => {
    stopSpeaking();
    setSpeechState('idle');
    setSpokenCharIndex(0);
    setAutoNarrateSteps(false);
  };

  const handleReplay = () => {
    startSceneNarration(currentScene);
  };

  const goToStep = (nextIndex: number) => {
    stopSpeaking();
    setSpeechState('idle');
    setSpokenCharIndex(0);
    setCurrentStep(nextIndex);
    if (autoNarrateSteps && scenes[nextIndex]) {
      startSceneNarration(scenes[nextIndex]);
    }
  };

  const handleNextStep = () => {
    if (currentStep < scenes.length - 1) {
      goToStep(currentStep + 1);
    } else {
      stopSpeaking();
      setSpeechState('idle');
      setIsLessonCompleted(true);
      onComplete(lesson.id, lesson.xpReward);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  const handleSelectQuickCheck = (idx: number) => {
    if (!currentScene.quickCheck) return;
    setSelectedCheckOption(idx);
    setIsCheckRevealed(true);
  };

  const narrationLength = currentScene?.narration?.length || 1;
  const speechProgressPct =
    speechState === 'idle'
      ? 0
      : Math.min(100, Math.max(5, Math.round((spokenCharIndex / narrationLength) * 100)));

  // ── RENDER INTERACTIVE VISUAL DEMONSTRATION ──────────────────────────────────
  const renderVisualDemonstration = () => {
    // 1. Calculus / Exponential Riemann Sum Interactive Visualization
    if (currentScene.visualType === 'riemann_sum') {
      const activeN = customN || currentScene.visualConfig?.nRectangles || 4;
      const range = currentScene.visualConfig?.range || [0, 4];
      const [a, b] = range;
      const deltaX = (b - a) / activeN;

      const f = (x: number) => 0.5 * x * x;
      const maxY = f(b);

      const svgWidth = 800;
      const svgHeight = 400;
      const padLeft = 70;
      const padRight = 50;
      const padBottom = 55;
      const padTop = 45;
      const graphWidth = svgWidth - padLeft - padRight;
      const graphHeight = svgHeight - padTop - padBottom;

      const mapX = (x: number) => padLeft + ((x - a) / (b - a)) * graphWidth;
      const mapY = (y: number) => svgHeight - padBottom - (y / maxY) * graphHeight;

      let riemannSum = 0;
      const rectangles = [];
      for (let i = 1; i <= activeN; i++) {
        const xRight = a + i * deltaX;
        const xLeft = a + (i - 1) * deltaX;
        const heightVal = f(xRight);
        riemannSum += heightVal * deltaX;

        rectangles.push({
          x: mapX(xLeft),
          y: mapY(heightVal),
          width: mapX(xRight) - mapX(xLeft),
          height: mapY(0) - mapY(heightVal),
          value: heightVal
        });
      }

      const exactIntegral = (Math.pow(b, 3) - Math.pow(a, 3)) / 6;
      const errorPct = Math.abs(((riemannSum - exactIntegral) / exactIntegral) * 100).toFixed(1);

      let curvePath = `M ${mapX(a)} ${mapY(f(a))}`;
      const curveSteps = 60;
      for (let i = 1; i <= curveSteps; i++) {
        const xVal = a + (i / curveSteps) * (b - a);
        curvePath += ` L ${mapX(xVal)} ${mapY(f(xVal))}`;
      }

      return (
        <div className="flex flex-col items-center justify-center w-full">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full max-h-[300px] select-none rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xs"
          >
            <defs>
              <linearGradient id="barGradLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {[0, 1, 2, 3, 4].map(xVal => (
              <line
                key={`grid-x-${xVal}`}
                x1={mapX(xVal)}
                y1={padTop}
                x2={mapX(xVal)}
                y2={svgHeight - padBottom}
                stroke="#cbd5e1"
                strokeOpacity="0.4"
                strokeDasharray="4 4"
              />
            ))}
            {[0, 2, 4, 6, 8].map(yVal => (
              <line
                key={`grid-y-${yVal}`}
                x1={padLeft}
                y1={mapY(yVal)}
                x2={svgWidth - padRight}
                y2={mapY(yVal)}
                stroke="#cbd5e1"
                strokeOpacity="0.4"
                strokeDasharray="4 4"
              />
            ))}

            {rectangles.map((r, idx) => (
              <rect
                key={`rect-${idx}`}
                x={r.x}
                y={r.y}
                width={Math.max(1, r.width - (activeN > 20 ? 0.5 : 1.5))}
                height={r.height}
                fill="url(#barGradLight)"
                stroke="#2563eb"
                strokeWidth={activeN > 20 ? 0.7 : 1.5}
                rx={activeN > 20 ? 0 : 2}
                className="transition-all duration-300"
              />
            ))}

            <path d={curvePath} fill="none" stroke="#d97706" strokeWidth="3.5" strokeLinecap="round" />

            <line
              x1={padLeft}
              y1={mapY(0)}
              x2={svgWidth - padRight + 15}
              y2={mapY(0)}
              stroke="#64748b"
              strokeWidth="2"
            />
            <line
              x1={padLeft}
              y1={mapY(0)}
              x2={padLeft}
              y2={padTop - 15}
              stroke="#64748b"
              strokeWidth="2"
            />

            {[0, 1, 2, 3, 4].map(xVal => (
              <text
                key={`lbl-x-${xVal}`}
                x={mapX(xVal)}
                y={svgHeight - padBottom + 20}
                textAnchor="middle"
                fill="#64748b"
                fontSize="12"
                fontWeight="600"
              >
                {xVal}
              </text>
            ))}
            {[0, 2, 4, 6, 8].map(yVal => (
              <text
                key={`lbl-y-${yVal}`}
                x={padLeft - 12}
                y={mapY(yVal) + 4}
                textAnchor="end"
                fill="#64748b"
                fontSize="12"
                fontWeight="600"
              >
                {yVal}
              </text>
            ))}

            <text x={svgWidth - padRight + 25} y={mapY(0) + 4} fill="#64748b" fontSize="13" fontWeight="bold">
              x
            </text>
            <text x={padLeft} y={padTop - 22} textAnchor="middle" fill="#64748b" fontSize="13" fontWeight="bold">
              f(x) = ½x²
            </text>

            <rect
              x={padLeft + 14}
              y={padTop + 6}
              width="305"
              height="84"
              rx="10"
              fill="#0f172a"
              fillOpacity="0.9"
              stroke="#38bdf8"
              strokeWidth="1.2"
            />
            <text x={padLeft + 28} y={padTop + 28} fill="#38bdf8" fontSize="13" fontWeight="bold">
              Subintervals n = {activeN} (Δx = {deltaX.toFixed(3)})
            </text>
            <text x={padLeft + 28} y={padTop + 50} fill="#f8fafc" fontSize="12.5" fontWeight="600">
              Riemann Sum Estimate: ≈ {riemannSum.toFixed(3)}
            </text>
            <text x={padLeft + 28} y={padTop + 72} fill="#34d399" fontSize="12.5" fontWeight="bold">
              Exact Integral ∫₀⁴ ½x² dx: 10.667 (Error: {errorPct}%)
            </text>
          </svg>

          {/* Interactive Partition Slider Control */}
          <div className="w-full mt-2.5 px-3.5 py-2 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap">
              Try Adjusting Partitions (n = {activeN}):
            </span>
            <input
              type="range"
              min="2"
              max="48"
              step="2"
              value={activeN}
              onChange={(e) => setCustomN(Number(e.target.value))}
              className="flex-1 min-w-[100px] accent-blue-600 cursor-pointer"
            />
            <div className="flex gap-1">
              {[4, 8, 16, 32].map(nVal => (
                <button
                  key={nVal}
                  onClick={() => setCustomN(nVal)}
                  className={`px-2 py-1 text-xs rounded-lg font-bold transition-all ${
                    activeN === nVal
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  n={nVal}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // 2. Fraction Galaxy Visual Model
    if (currentScene.visualType === 'fraction_galaxy') {
      return (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-full bg-white dark:bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h4 className="text-xs font-bold text-blue-700 dark:text-cyan-400 uppercase tracking-wider">
                Interactive Fraction Equivalence Model
              </h4>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Equal Proportions (50%)
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 font-semibold">
                <span>1 out of 2 equal parts (1/2)</span>
                <span className="text-blue-600 dark:text-cyan-400 font-bold">50%</span>
              </div>
              <div className="h-8 w-full bg-slate-100 dark:bg-slate-800 rounded-lg flex overflow-hidden border border-slate-300 dark:border-slate-700">
                <div className="w-1/2 h-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                  1/2
                </div>
                <div className="w-1/2 h-full flex items-center justify-center text-slate-400 text-xs">
                  1/2
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 font-semibold">
                <span>2 out of 4 equal parts (2/4)</span>
                <span className="text-blue-600 dark:text-cyan-400 font-bold">50%</span>
              </div>
              <div className="h-8 w-full bg-slate-100 dark:bg-slate-800 rounded-lg flex overflow-hidden border border-slate-300 dark:border-slate-700">
                <div className="w-1/4 h-full bg-sky-600 border-r border-white/30 flex items-center justify-center font-bold text-white text-xs">
                  1/4
                </div>
                <div className="w-1/4 h-full bg-sky-600 border-r border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold text-white text-xs">
                  1/4
                </div>
                <div className="w-1/4 h-full border-r border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 text-xs">
                  1/4
                </div>
                <div className="w-1/4 h-full flex items-center justify-center text-slate-400 text-xs">
                  1/4
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 font-semibold">
                <span>4 out of 8 equal parts (4/8)</span>
                <span className="text-blue-600 dark:text-cyan-400 font-bold">50%</span>
              </div>
              <div className="h-8 w-full bg-slate-100 dark:bg-slate-800 rounded-lg flex overflow-hidden border border-slate-300 dark:border-slate-700">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="w-[12.5%] h-full bg-indigo-600 border-r border-white/30 flex items-center justify-center font-bold text-white text-[10px]"
                  >
                    1/8
                  </div>
                ))}
                {[5, 6, 7, 8].map(i => (
                  <div
                    key={i}
                    className="w-[12.5%] h-full border-r border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 text-[10px]"
                  >
                    1/8
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center text-xs text-slate-700 dark:text-slate-200 font-medium bg-blue-50/70 dark:bg-slate-900 py-2 px-3 rounded-lg border border-blue-100 dark:border-slate-800">
              <MathRenderer content="Equivalent Proportions: $\frac{1}{2} = \frac{2}{4} = \frac{4}{8} = 0.50$" />
            </div>
          </div>
        </div>
      );
    }

    // 3. Number Line Model
    if (currentScene.visualType === 'number_line') {
      return (
        <div className="flex items-center justify-center w-full">
          <svg
            viewBox="0 0 680 260"
            className="w-full max-h-[250px] bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs"
          >
            <text x="340" y="38" text-anchor="middle" fill="#3b82f6" fontSize="15" fontWeight="bold">
              Interactive Number Line &amp; Benchmark Jumps
            </text>
            <line x1="50" y1="155" x2="630" y2="155" stroke="#64748b" strokeWidth="3" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => {
              const x = 60 + n * 56;
              return (
                <g key={n}>
                  <line x1={x} y1="145" x2={x} y2="165" stroke="#64748b" strokeWidth="2.5" />
                  <text x={x} y="190" textAnchor="middle" fill="#64748b" fontSize="13" fontWeight="bold">
                    {n * 10}
                  </text>
                </g>
              );
            })}
            {[0, 1, 2].map(i => {
              const x1 = 60 + i * 56;
              const x2 = x1 + 56;
              return (
                <g key={i}>
                  <path
                    d={`M ${x1} 150 Q ${(x1 + x2) / 2} 85 ${x2} 150`}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />
                  <text x={(x1 + x2) / 2} y="102" textAnchor="middle" fill="#2563eb" fontSize="12" fontWeight="bold">
                    +10
                  </text>
                </g>
              );
            })}
            <circle cx="60" cy="155" r="7" fill="#d97706" />
            <circle cx="228" cy="155" r="8" fill="#2563eb" />
            <text x="340" y="232" textAnchor="middle" fill="#64748b" fontSize="12.5" fontWeight="600">
              Each benchmark jump adds 1 equal group of 10 along the number line
            </text>
          </svg>
        </div>
      );
    }

    // 4. Geometry & Trigonometry Visual Model
    if (currentScene.visualType === 'geometry_shapes') {
      return (
        <div className="flex items-center justify-center w-full">
          <svg
            viewBox="0 0 640 320"
            className="w-full max-h-[280px] bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs"
          >
            <polygon points="70,245 270,245 270,75" fill="#3b82f6" fillOpacity="0.15" stroke="#2563eb" strokeWidth="3" />
            <polyline points="250,245 250,225 270,225" fill="none" stroke="#2563eb" strokeWidth="2" />
            <text x="170" y="272" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">
              Adjacent Side (b)
            </text>
            <text x="315" y="165" textAnchor="middle" fill="#0284c7" fontSize="13" fontWeight="bold">
              Opposite (a)
            </text>
            <text x="150" y="148" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="bold">
              Hypotenuse (c)
            </text>
            <text x="115" y="235" fill="#d97706" fontSize="14" fontWeight="bold">
              θ
            </text>

            <circle cx="490" cy="165" r="80" fill="#3b82f6" fillOpacity="0.08" stroke="#64748b" strokeWidth="2" />
            <line x1="395" y1="165" x2="585" y2="165" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="490" y1="70" x2="490" y2="260" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="490" y1="165" x2="546" y2="109" stroke="#2563eb" strokeWidth="3" />
            <line x1="546" y1="165" x2="546" y2="109" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 3" />
            <circle cx="546" cy="109" r="5" fill="#e11d48" />
            <text x="558" y="102" fill="#e11d48" fontSize="12" fontWeight="bold">
              (cos θ, sin θ)
            </text>
            <text x="320" y="302" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="600">
              a² + b² = c²   •   sin(θ) = Opp/Hyp   •   cos(θ) = Adj/Hyp
            </text>
          </svg>
        </div>
      );
    }

    // 5. Coordinate Linear / Function Model with Interactive Slope & Intercept Controls
    const yAt0 = customIntercept;
    const yAt3 = customSlope * 3 + customIntercept;
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <svg
          viewBox="0 0 640 320"
          className="w-full max-h-[260px] bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs"
        >
          {[60, 115, 170, 225].map(y => (
            <line key={y} x1="60" y1={y} x2="580" y2={y} stroke="#cbd5e1" strokeOpacity="0.35" strokeWidth="1" />
          ))}
          {[140, 220, 300, 380, 460, 540].map(x => (
            <line key={x} x1={x} y1="30" x2={x} y2="275" stroke="#cbd5e1" strokeOpacity="0.35" strokeWidth="1" />
          ))}
          <line x1="60" y1="275" x2="580" y2="275" stroke="#64748b" strokeWidth="2.5" />
          <line x1="100" y1="290" x2="100" y2="30" stroke="#64748b" strokeWidth="2.5" />

          {/* Interactive Line */}
          <line
            x1="100"
            y1={Math.max(40, Math.min(265, 250 - yAt0 * 18))}
            x2="460"
            y2={Math.max(35, Math.min(265, 250 - yAt3 * 18))}
            stroke="#2563eb"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="100" cy={Math.max(40, Math.min(265, 250 - yAt0 * 18))} r="6" fill="#d97706" />
          <circle cx="460" cy={Math.max(35, Math.min(265, 250 - yAt3 * 18))} r="6" fill="#e11d48" />

          <text x="340" y="55" fill="#2563eb" textAnchor="middle" fontSize="15" fontWeight="bold">
            Active Function: y = {customSlope}x + {customIntercept}   (Slope m = {customSlope}, Y-Intercept b = {customIntercept})
          </text>
          <text x="115" y={Math.max(55, Math.min(260, 250 - yAt0 * 18 + 18))} fill="#d97706" fontSize="12" fontWeight="bold">
            (0, {yAt0})
          </text>
          <text x="475" y={Math.max(50, Math.min(260, 250 - yAt3 * 18))} fill="#e11d48" fontSize="12" fontWeight="bold">
            (3, {yAt3})
          </text>
        </svg>

        <div className="w-full mt-2 px-3.5 py-2 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap">
              Slope (m = {customSlope}):
            </span>
            <input
              type="range"
              min="-2"
              max="4"
              step="0.5"
              value={customSlope}
              onChange={e => setCustomSlope(Number(e.target.value))}
              className="flex-1 accent-blue-600 cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap">
              Y-Intercept (b = {customIntercept}):
            </span>
            <input
              type="range"
              min="-2"
              max="5"
              step="1"
              value={customIntercept}
              onChange={e => setCustomIntercept(Number(e.target.value))}
              className="flex-1 accent-amber-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden relative">
      {/* Top Lesson Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-20 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          {onBackToCurriculum && (
            <button
              onClick={() => {
                stopSpeaking();
                onBackToCurriculum();
              }}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shrink-0"
              title="Back to Topic Intro"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800 font-mono">
                {lesson.standard.code}
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
                Grade {lesson.grade} • {lesson.standard.domain}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
              <MathRenderer content={lesson.title} className="inline" />
            </h2>
          </div>
        </div>

        {/* Step Indicator & Explicit Speech Playback Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            {speechState === 'idle' && (
              <button
                onClick={handlePlay}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                title="Play Narration"
              >
                <Play size={13} fill="currentColor" />
                <span>Play Narration</span>
              </button>
            )}

            {speechState === 'playing' && (
              <>
                <button
                  onClick={handlePause}
                  className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                  title="Pause Narration"
                >
                  <Pause size={13} fill="currentColor" />
                  <span>Pause</span>
                </button>
                <button
                  onClick={handleStop}
                  className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-rose-50 text-rose-600 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
                  title="Stop Narration"
                >
                  <Square size={12} fill="currentColor" />
                  <span className="hidden sm:inline">Stop</span>
                </button>
              </>
            )}

            {speechState === 'paused' && (
              <>
                <button
                  onClick={handleResume}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                  title="Resume Narration"
                >
                  <Play size={13} fill="currentColor" />
                  <span>Resume</span>
                </button>
                <button
                  onClick={handleStop}
                  className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-rose-50 text-rose-600 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
                  title="Stop Narration"
                >
                  <Square size={12} fill="currentColor" />
                  <span className="hidden sm:inline">Stop</span>
                </button>
              </>
            )}

            <button
              onClick={handleReplay}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-white dark:hover:bg-slate-900 transition-colors"
              title="Replay Narration from Start"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200">
            Step {currentStep + 1} of {scenes.length}
          </div>

          <button
            onClick={() => setIsTutorPanelOpen(o => !o)}
            className="lg:hidden px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <MessageSquare size={14} />
            <span>Ask Cosmo</span>
          </button>
        </div>
      </div>

      {/* Main Split Workspace: Left/Center Interactive Lesson + Right Embedded Tutor */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* LEFT / MAIN LESSON STAGE */}
        <div className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-5 gap-4">
          {/* Interactive Step Progress Stepper Bar */}
          {scenes.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
              {scenes.map((scene, idx) => {
                const isActive = idx === currentStep;
                const isPast = idx < currentStep;
                return (
                  <button
                    key={scene.id}
                    onClick={() => goToStep(idx)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all flex items-center gap-2 ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : isPast
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : isPast
                          ? 'bg-emerald-200/70 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isPast ? '✓' : idx + 1}
                    </span>
                    <span>{scene.title}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Two-Column Pedagogical Workspace: Visual Lab (Left) + Step-by-Step Concept Guide (Right) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
            {/* LEFT 6 COLS: Interactive Visual Lab + Narration + Learning Goals */}
            <div className="xl:col-span-6 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                      Interactive Visual Lab
                    </span>
                    <span className="text-xs text-slate-300 dark:text-slate-700">•</span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {currentScene.caption}
                    </span>
                  </div>
                </div>

                <div className="w-full flex items-center justify-center">
                  {renderVisualDemonstration()}
                </div>

                {/* Synchronized Narration Transcript Bar */}
                {showCaptions ? (
                  <div className="w-full p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🦉</span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                          Voice Guide Transcript
                        </span>
                        {speechState === 'playing' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-cyan-300">
                            <Volume2 size={11} className="animate-pulse" /> Speaking...
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={autoNarrateSteps}
                            onChange={e => setAutoNarrateSteps(e.target.checked)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          Auto-read next steps
                        </label>
                        <button
                          onClick={() => setShowCaptions(false)}
                          className="text-[11px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-semibold"
                        >
                          Hide
                        </button>
                      </div>
                    </div>

                    {speechState !== 'idle' && (
                      <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 transition-all duration-150"
                          style={{ width: `${speechProgressPct}%` }}
                        />
                      </div>
                    )}

                    <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                      <MathRenderer content={currentScene.narration} />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowCaptions(true)}
                      className="text-xs text-blue-600 dark:text-cyan-400 hover:underline font-semibold"
                    >
                      Show Narration Transcript
                    </button>
                  </div>
                )}
              </div>

              {/* Learning Objectives & Key Takeaways Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-4 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Target size={15} className="text-blue-600 dark:text-cyan-400" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100">
                    Lesson Learning Goals &amp; Key Takeaways
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {lesson.takeaways.map((point, idx) => (
                    <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <CheckCircle size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <MathRenderer content={point} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT 6 COLS: Complete Step-by-Step Concept Teaching Guide */}
            <div className="xl:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 flex flex-col justify-between gap-4">
              <div className="space-y-4">
                {/* 1. Concept Title & Core Explanation */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                    Concept Step {currentStep + 1} of {scenes.length}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {currentScene.title}
                  </h3>
                </div>

                <div className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-cyan-400 block mb-1">
                    1. Core Concept &amp; Intuition
                  </span>
                  <MathRenderer content={currentScene.explanation} />
                </div>

                {/* 2. Key Formula & Rule Box */}
                {currentScene.formula && (
                  <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/70">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 dark:text-cyan-300 flex items-center gap-1.5 mb-1">
                      <BookOpen size={13} /> 2. Key Mathematical Formula
                    </span>
                    <MathRenderer content={currentScene.formula} />
                  </div>
                )}

                {/* 3. Step-by-Step Worked Example */}
                {currentScene.workedExample && (
                  <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                        <Calculator size={13} /> 3. Step-by-Step Worked Example
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      <MathRenderer content={`**Problem:** ${currentScene.workedExample.problem}`} />
                    </div>
                    <ol className="space-y-1.5 pl-1">
                      {currentScene.workedExample.steps.map((st, sIdx) => (
                        <li
                          key={sIdx}
                          className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                        >
                          <span className="w-4 h-4 rounded-full bg-amber-200/80 dark:bg-amber-900 text-amber-900 dark:text-amber-200 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <MathRenderer content={st} />
                        </li>
                      ))}
                    </ol>
                    <div className="pt-1.5 border-t border-amber-200/60 dark:border-amber-800/50 text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
                      <MathRenderer content={`✓ Final Answer: ${currentScene.workedExample.answer}`} />
                    </div>
                  </div>
                )}

                {/* 4. Interactive Instant Concept Check */}
                {currentScene.quickCheck && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                      <HelpCircle size={13} /> 4. Quick Concept Check — Try It Yourself!
                    </span>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      <MathRenderer content={currentScene.quickCheck.question} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentScene.quickCheck.options.map((opt, oIdx) => {
                        const isCorrect = oIdx === currentScene.quickCheck!.correctIndex;
                        const isSelected = oIdx === selectedCheckOption;
                        let cls =
                          'p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between gap-2 ';
                        if (isCheckRevealed) {
                          if (isCorrect) {
                            cls +=
                              'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200';
                          } else if (isSelected) {
                            cls +=
                              'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200';
                          } else {
                            cls +=
                              'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 text-slate-400';
                          }
                        } else {
                          cls +=
                            'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-500 hover:bg-blue-50/40 text-slate-800 dark:text-slate-200';
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectQuickCheck(oIdx)}
                            className={cls}
                          >
                            <MathRenderer content={opt} />
                            {isCheckRevealed && isCorrect && (
                              <CheckCircle size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                            )}
                            {isCheckRevealed && isSelected && !isCorrect && (
                              <XCircle size={15} className="text-rose-600 dark:text-rose-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {isCheckRevealed && (
                      <div
                        className={`p-2.5 rounded-lg text-xs border animate-fade-in ${
                          selectedCheckOption === currentScene.quickCheck.correctIndex
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                            : 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <strong className="mr-1">
                          {selectedCheckOption === currentScene.quickCheck.correctIndex
                            ? '✓ Correct!'
                            : 'Explanation:'}
                        </strong>
                        <MathRenderer content={currentScene.quickCheck.explanation} className="inline" />
                      </div>
                    )}
                  </div>
                )}

                {isLessonCompleted && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-200 animate-fade-in">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle size={15} className="text-emerald-600" /> Lesson Completed! +{lesson.xpReward} XP Awarded
                    </span>
                    <button onClick={onStartQuiz} className="underline hover:text-emerald-950 dark:hover:text-white">
                      Take Skill Quiz →
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation & Practice Actions Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex gap-2.5">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 0}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeft size={14} /> Previous Step
                  </button>

                  <button
                    onClick={handleNextStep}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs text-white transition-all flex items-center justify-center gap-1.5 shadow-xs ${
                      currentStep < scenes.length - 1
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    {currentStep < scenes.length - 1 ? (
                      <>
                        Next Step ({currentStep + 2}/{scenes.length}) <ArrowRight size={14} />
                      </>
                    ) : (
                      <>
                        Complete Lesson <CheckCircle size={14} />
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      stopSpeaking();
                      onStartQuiz();
                    }}
                    className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Brain size={15} /> Practice Quiz
                  </button>

                  {lesson.gameId && onStartGame && (
                    <button
                      onClick={() => {
                        stopSpeaking();
                        onStartGame(lesson.gameId!);
                      }}
                      className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Gamepad2 size={15} /> Skill Game
                    </button>
                  )}

                  <button
                    onClick={() => {
                      stopSpeaking();
                      onAskTutor(`Help me understand: ${lesson.title} (${lesson.standard.code})`);
                    }}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all col-span-2 sm:col-span-1"
                    title="Open Full Visual Studio with Cosmo"
                  >
                    <Maximize2 size={14} /> Full Studio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Embedded Real Cosmo Tutor Panel */}
        <div
          className={`
            shrink-0 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden flex flex-col
            transition-all duration-300 ease-in-out
            lg:w-[340px] xl:w-[380px] lg:flex
            ${
              isTutorPanelOpen
                ? 'fixed inset-x-0 bottom-0 h-[75vh] z-50 border-t border-slate-300 dark:border-slate-700 shadow-2xl flex flex-col lg:relative lg:inset-auto lg:h-full lg:z-auto lg:shadow-none'
                : 'hidden lg:flex'
            }
          `}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-base">
                🦉
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  Cosmo AI Tutor
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Synchronized with Step {currentStep + 1}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  stopSpeaking();
                  onAskTutor(`Let's explore ${lesson.title} (${lesson.standard.code}) - ${currentScene.title}`);
                }}
                className="px-2 py-1 rounded-lg text-[11px] font-semibold text-blue-600 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                title="Open Full Tutor View with Diagram Canvas"
              >
                Expand
              </button>
              <button
                onClick={() => setIsTutorPanelOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <TutorView
              contextMemory={`Grade ${lesson.grade} Mathematics: ${lesson.title} (${lesson.standard.code}). Topic: ${lesson.standard.domain}. Current step: ${currentScene.title}. Explanation: ${currentScene.explanation}`}
              activeTutorMemory={`${lesson.title} – Step ${currentStep + 1}: ${currentScene.title}`}
              mode="panel"
            />
          </div>
        </div>

        {isTutorPanelOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40"
            onClick={() => setIsTutorPanelOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default LessonPlayer;
