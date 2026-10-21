import React, { useState } from 'react';
import { Sparkles, Trophy, RotateCcw, ArrowRight, Gamepad2 } from 'lucide-react';
import { awardGameCompletion } from '../services/progressService';
import MathRenderer from './MathRenderer';
import { speak, stopSpeaking } from '../services/speech';

interface MathGalaxyGameProps {
  gameId: string;
  onFinish: () => void;
  onAskTutor?: (context: string) => void;
  onSelectGame?: (gameId: string) => void;
  onGameComplete?: () => void;
}

export const MathGalaxyGame: React.FC<MathGalaxyGameProps> = ({
  gameId,
  onFinish,
  onSelectGame,
  onGameComplete,
}) => {
  const [calcN, setCalcN] = useState<number>(4);
  const [sampleMethod, setSampleMethod] = useState<'left' | 'right' | 'midpoint'>('right');
  const [userGuessArea, setUserGuessArea] = useState<string>('');
  const [calcSubmitted, setCalcSubmitted] = useState<boolean>(false);

  const [fractionRound, setFractionRound] = useState(0);
  const [fractionScore, setFractionScore] = useState(0);
  const [fractionSelected, setFractionSelected] = useState<number | null>(null);
  const [fractionFeedback, setFractionFeedback] = useState<string | null>(null);

  const [slopeM, setSlopeM] = useState<number>(1);
  const [interceptB, setInterceptB] = useState<number>(2);

  const [isCompleted, setIsCompleted] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);

  const [a, b] = [0, 4];
  const deltaX = (b - a) / calcN;
  const f = (x: number) => 0.5 * x * x;

  let currentRiemannSum = 0;
  for (let i = 1; i <= calcN; i++) {
    let evalX = a + i * deltaX;
    if (sampleMethod === 'left') evalX = a + (i - 1) * deltaX;
    if (sampleMethod === 'midpoint') evalX = a + (i - 0.5) * deltaX;
    currentRiemannSum += f(evalX) * deltaX;
  }

  const exactIntegral = (Math.pow(b, 3) - Math.pow(a, 3)) / 6;

  const handleCalculusSubmit = () => {
    const guess = parseFloat(userGuessArea);
    const estimated = isNaN(guess) ? currentRiemannSum : guess;
    const errorPct = Math.abs(((estimated - exactIntegral) / exactIntegral) * 100);
    const isSuccess = errorPct <= 8.0;

    const stars = isSuccess ? (errorPct <= 3.0 ? 3 : 2) : 1;
    const xp = isSuccess ? 200 : 75;

    setCalcSubmitted(true);
    setEarnedStars(stars);
    setEarnedXp(xp);
    setIsCompleted(true);

    awardGameCompletion('game-calculus-area', isSuccess ? 100 : 50, stars, xp);
    if (onGameComplete) onGameComplete();
    speak(
      isSuccess
        ? 'Target area accumulated! Stellar precision.'
        : 'Calculation completed. Review the integral boundary.'
    );
  };

  const fractionRounds = [
    {
      target: '3/4',
      targetVisual: 0.75,
      options: [
        { label: '6/8', val: 0.75, correct: true },
        { label: '4/5', val: 0.8, correct: false },
        { label: '5/8', val: 0.625, correct: false },
        { label: '2/3', val: 0.667, correct: false },
      ],
    },
    {
      target: '2/5',
      targetVisual: 0.4,
      options: [
        { label: '3/10', val: 0.3, correct: false },
        { label: '4/10', val: 0.4, correct: true },
        { label: '1/2', val: 0.5, correct: false },
        { label: '2/10', val: 0.2, correct: false },
      ],
    },
    {
      target: '1/2',
      targetVisual: 0.5,
      options: [
        { label: '4/8', val: 0.5, correct: true },
        { label: '3/8', val: 0.375, correct: false },
        { label: '2/6', val: 0.333, correct: false },
        { label: '5/12', val: 0.417, correct: false },
      ],
    },
  ];

  const handleFractionSelect = (optIndex: number) => {
    if (fractionSelected !== null) return;
    setFractionSelected(optIndex);
    const round = fractionRounds[fractionRound];
    const isCorrect = round.options[optIndex].correct;

    if (isCorrect) {
      setFractionScore(s => s + 1);
      setFractionFeedback('Shield calibrated! Equivalent fraction matched.');
      speak('Correct! Matching fraction aligned.');
    } else {
      setFractionFeedback('Shield unaligned! The fractions have different values.');
      speak('Not quite equivalent. Try again.');
    }
  };

  const handleFractionNext = () => {
    stopSpeaking();
    if (fractionRound < fractionRounds.length - 1) {
      setFractionRound(r => r + 1);
      setFractionSelected(null);
      setFractionFeedback(null);
    } else {
      const totalScore = fractionScore;
      const stars = totalScore >= 3 ? 3 : totalScore >= 2 ? 2 : 1;
      const xp = Math.max(60, totalScore * 60);
      setEarnedStars(stars);
      setEarnedXp(xp);
      setIsCompleted(true);
      awardGameCompletion('game-fraction-blaster', totalScore * 33, stars, xp);
      if (onGameComplete) onGameComplete();
    }
  };

  const targetGate1 = { x: 1, y: 4 };
  const targetGate2 = { x: 4, y: 10 };

  const handleOrbitLaunch = () => {
    const passesGate1 = Math.abs(slopeM * targetGate1.x + interceptB - targetGate1.y) < 0.2;
    const passesGate2 = Math.abs(slopeM * targetGate2.x + interceptB - targetGate2.y) < 0.2;
    const success = passesGate1 && passesGate2;

    const stars = success ? 3 : 1;
    const xp = success ? 220 : 80;
    setEarnedStars(stars);
    setEarnedXp(xp);
    setIsCompleted(true);

    awardGameCompletion('game-orbit-slope', success ? 100 : 40, stars, xp);
    if (onGameComplete) onGameComplete();
    speak(
      success
        ? 'Probe trajectory locked! Both orbital gates cleared.'
        : 'Trajectory missed the gate coordinates. Adjust slope and intercept.'
    );
  };

  const gameTabs = [
    { id: 'game-calculus-area', label: 'Area Accumulator (G12)' },
    { id: 'game-fraction-blaster', label: 'Fraction Alignment (G4)' },
    { id: 'game-orbit-slope', label: 'Slope Launcher (G8)' },
  ];

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full p-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 animate-fade-in text-center">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-lg space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-500">
            <Trophy size={36} />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Challenge Completed!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Mathematical skill challenge verified.
            </p>
          </div>

          <div className="flex justify-center gap-2">
            {[1, 2, 3].map(s => (
              <span
                key={s}
                className={`text-3xl transition-transform ${
                  s <= earnedStars ? 'scale-110 text-amber-400' : 'text-slate-200 dark:text-slate-700'
                }`}
              >
                ★
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                Earned XP
              </span>
              <div className="text-xl font-extrabold text-blue-600 dark:text-cyan-400">+{earnedXp} XP</div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                Stars
              </span>
              <div className="text-xl font-extrabold text-amber-500">+{earnedStars} ★</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                stopSpeaking();
                setIsCompleted(false);
                setCalcSubmitted(false);
                setFractionRound(0);
                setFractionScore(0);
                setFractionSelected(null);
              }}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center gap-1.5"
            >
              <RotateCcw size={14} /> Play Again
            </button>
            <button
              onClick={() => {
                stopSpeaking();
                onFinish();
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              Back to Dashboard <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-y-auto transition-colors">
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 shrink-0">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Gamepad2 size={16} className="text-blue-600 dark:text-cyan-400 shrink-0" />
            {gameTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onSelectGame && onSelectGame(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  gameId === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              stopSpeaking();
              onFinish();
            }}
            className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            Exit Game
          </button>
        </div>
      </div>

      {(gameId === 'game-calculus-area' || !gameId) && (
        <div className="max-w-4xl mx-auto w-full p-6 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-widest">
                Calculus Challenge (Standard C.INT.1)
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                Area Accumulator: Riemann Sum Precision
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                Approximate the area under{' '}
                <MathRenderer content="$f(x) = \frac{1}{2}x^2$" className="inline" /> from{' '}
                <MathRenderer content="$x = 0$" className="inline" /> to{' '}
                <MathRenderer content="$x = 4$" className="inline" /> within 8% of the exact definite integral.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/70 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider block">
                  Number of Slices (n = {calcN})
                </label>
                <input
                  type="range"
                  min="2"
                  max="32"
                  step="2"
                  value={calcN}
                  onChange={e => setCalcN(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  <span>n=2 (Coarse)</span>
                  <span>Δx = {deltaX.toFixed(2)}</span>
                  <span>n=32 (Fine)</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider block">
                  Sample Point Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['left', 'midpoint', 'right'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => setSampleMethod(m)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all border ${
                        sampleMethod === m
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50/60 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Current Computed Riemann Sum:
                </span>
                <div className="text-2xl font-extrabold text-blue-700 dark:text-cyan-400 font-mono">
                  ≈ {currentRiemannSum.toFixed(3)}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 dark:text-slate-400">Target Precision Window:</span>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-100">10.0 to 11.5 units²</div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider block">
                Enter Your Area Estimate (or leave blank to submit computed sum):
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="number"
                  step="0.01"
                  placeholder={currentRiemannSum.toFixed(2)}
                  value={userGuessArea}
                  onChange={e => setUserGuessArea(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-base focus:outline-none focus:border-blue-600"
                />
                <button
                  onClick={handleCalculusSubmit}
                  className="py-3 px-6 bg-blue-600 hover:bg-blue-700 font-bold text-sm text-white rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} /> Submit Area Estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {gameId === 'game-fraction-blaster' && (
        <div className="max-w-2xl mx-auto w-full p-6 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-widest">
                  Fraction Equivalence (Standard 4.NR.4)
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Equivalent Fraction Match
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                Round {fractionRound + 1} of {fractionRounds.length}
              </span>
            </div>

            <div className="p-6 bg-blue-50/60 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800 text-center space-y-2">
              <span className="text-xs font-bold text-blue-700 dark:text-cyan-300 uppercase tracking-widest">
                Target Fraction Value
              </span>
              <div className="text-5xl font-extrabold text-slate-900 dark:text-white font-serif">
                {fractionRounds[fractionRound].target}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">Select the equivalent fraction below:</p>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {fractionRounds[fractionRound].options.map((opt, idx) => {
                let btnClass = 'p-5 rounded-xl border-2 text-center transition-all font-bold text-lg ';
                if (fractionSelected !== null) {
                  if (opt.correct) {
                    btnClass += 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200';
                  } else if (idx === fractionSelected) {
                    btnClass += 'border-rose-500 bg-rose-50 dark:bg-rose-950 text-rose-800 dark:text-rose-200';
                  } else {
                    btnClass += 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-400';
                  }
                } else {
                  btnClass +=
                    'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-500 hover:bg-blue-50/40 text-slate-800 dark:text-white';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleFractionSelect(idx)}
                    disabled={fractionSelected !== null}
                    className={btnClass}
                  >
                    <div className="font-serif text-2xl mb-1">{opt.label}</div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      Option {String.fromCharCode(65 + idx)}
                    </div>
                  </button>
                );
              })}
            </div>

            {fractionFeedback && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between animate-fade-in">
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {fractionFeedback}
                </span>
                <button
                  onClick={handleFractionNext}
                  className="py-2 px-5 bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  Next Round <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {gameId === 'game-orbit-slope' && (
        <div className="max-w-4xl mx-auto w-full p-6 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-widest">
                Linear Functions (Standard 8.FGR.5)
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                Linear Trajectory &amp; Slope Launcher
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                Set the slope <MathRenderer content="$m$" className="inline" /> and y-intercept{' '}
                <MathRenderer content="$b$" className="inline" /> in{' '}
                <MathRenderer content="$y = mx + b$" className="inline" /> so the line passes through{' '}
                <MathRenderer content="$(1, 4)$" className="inline" /> and{' '}
                <MathRenderer content="$(4, 10)$" className="inline" />.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/70 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-blue-700 dark:text-cyan-400">
                  <span>Slope (m): {slopeM.toFixed(1)}</span>
                  <span className="text-slate-500">Rate of change</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4"
                  step="0.5"
                  value={slopeM}
                  onChange={e => setSlopeM(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-indigo-700 dark:text-indigo-400">
                  <span>Y-Intercept (b): {interceptB}</span>
                  <span className="text-slate-500">Initial value at x = 0</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="6"
                  step="1"
                  value={interceptB}
                  onChange={e => setInterceptB(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50/60 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                Active Equation:{' '}
                <span className="text-blue-700 dark:text-cyan-400 font-serif">
                  y = {slopeM}x + {interceptB}
                </span>
              </div>
              <button
                onClick={handleOrbitLaunch}
                className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 font-bold text-xs text-white rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                🚀 Verify Linear Trajectory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathGalaxyGame;
