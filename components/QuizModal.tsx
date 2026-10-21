import React, { useState } from 'react';
import { CheckCircle, XCircle, Volume2, ArrowRight, RotateCcw, Trophy, X, Brain } from 'lucide-react';
import { QuizData } from '../types';
import MathRenderer from './MathRenderer';
import { speak, stopSpeaking } from '../services/speech';
import { awardQuizCompletion } from '../services/progressService';

interface QuizModalProps {
  quizData: QuizData;
  isOpen: boolean;
  onClose: () => void;
  onAskTutor?: (questionText: string) => void;
  onQuizComplete?: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  quizData,
  isOpen,
  onClose,
  onAskTutor,
  onQuizComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);

  if (!isOpen || !quizData || !quizData.questions.length) return null;

  const currentQ = quizData.questions[currentIndex];
  const total = quizData.questions.length;

  const handleSelectOption = (idx: number) => {
    if (isAnswerRevealed) return;
    setSelectedOption(idx);
    setIsAnswerRevealed(true);

    const isCorrect = idx === currentQ.correctAnswerIndex;
    if (isCorrect) {
      setScore(s => s + 1);
      speak('Correct!');
    } else {
      speak('Not quite. Review the explanation below.');
    }
  };

  const handleNext = () => {
    stopSpeaking();
    if (currentIndex < total - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    } else {
      const finalScore = score;
      const xp = finalScore * 50 + 50;
      const stars = finalScore === total ? 3 : finalScore >= Math.ceil(total / 2) ? 2 : 1;

      setEarnedXp(xp);
      setEarnedStars(stars);
      setIsFinished(true);

      awardQuizCompletion(quizData.topic, finalScore, total, xp);
      if (onQuizComplete) onQuizComplete();
    }
  };

  const handleReset = () => {
    stopSpeaking();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleClose = () => {
    stopSpeaking();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-cyan-400">
              <Brain size={18} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                Skill Mastery Check
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                {quizData.topic}
              </h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {!isFinished ? (
          <div className="p-6 overflow-y-auto space-y-5 flex-1">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                <span>
                  Question {currentIndex + 1} of {total}
                </span>
                <span className="text-blue-600 dark:text-cyan-400">
                  Current Score: {score}/{total}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 text-base font-bold text-slate-900 dark:text-white leading-relaxed">
              <MathRenderer content={currentQ.question} />
            </div>

            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                let btnStyle =
                  'w-full p-4 text-left rounded-xl border-2 transition-all font-medium text-sm flex items-center justify-between ';

                if (isAnswerRevealed) {
                  if (idx === currentQ.correctAnswerIndex) {
                    btnStyle +=
                      'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-semibold';
                  } else if (idx === selectedOption) {
                    btnStyle +=
                      'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200';
                  } else {
                    btnStyle +=
                      'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-400 opacity-75';
                  }
                } else {
                  btnStyle +=
                    'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-blue-950/30 text-slate-800 dark:text-slate-100';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswerRevealed}
                    className={btnStyle}
                  >
                    <div className="flex items-center gap-3 flex-1 mr-2">
                      <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <div className="flex-1">
                        <MathRenderer content={option} />
                      </div>
                    </div>
                    {isAnswerRevealed && idx === currentQ.correctAnswerIndex && (
                      <CheckCircle className="text-emerald-600 dark:text-emerald-400 shrink-0" size={18} />
                    )}
                    {isAnswerRevealed && idx === selectedOption && idx !== currentQ.correctAnswerIndex && (
                      <XCircle className="text-rose-600 dark:text-rose-400 shrink-0" size={18} />
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswerRevealed && (
              <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-start gap-3 animate-fade-in">
                <button
                  onClick={() => speak(currentQ.explanation)}
                  className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-700 text-blue-600 dark:text-cyan-400 hover:bg-blue-100 shrink-0 mt-0.5"
                  title="Read explanation aloud"
                >
                  <Volume2 size={15} />
                </button>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed flex-1">
                  <span className="font-bold text-blue-800 dark:text-cyan-300 block mb-0.5">
                    Step-by-Step Explanation:
                  </span>
                  <MathRenderer content={currentQ.explanation} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center space-y-6 flex-1 overflow-y-auto">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-500 shadow-xs">
              <Trophy size={34} />
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Skill Check Complete!
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                You answered <span className="text-blue-600 dark:text-cyan-400 font-bold">{score}</span> out of {total} correctly (
                {Math.round((score / total) * 100)}%).
              </p>
            </div>

            <div className="flex justify-center gap-2">
              {[1, 2, 3].map(s => (
                <span
                  key={s}
                  className={`text-3xl ${s <= earnedStars ? 'text-amber-400 scale-110' : 'text-slate-200 dark:text-slate-700'}`}
                >
                  ★
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 max-w-sm mx-auto">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                  Reward XP
                </span>
                <div className="text-xl font-extrabold text-blue-600 dark:text-cyan-400">+{earnedXp} XP</div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                  Stars Earned
                </span>
                <div className="text-xl font-extrabold text-amber-500">+{earnedStars} ★</div>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70 flex items-center justify-between">
          {!isFinished ? (
            <div className="flex items-center justify-between w-full">
              {onAskTutor ? (
                <button
                  onClick={() => {
                    stopSpeaking();
                    onAskTutor(currentQ.question);
                  }}
                  className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  🦉 Ask Cosmo about this problem
                </button>
              ) : (
                <div />
              )}
              {isAnswerRevealed && (
                <button
                  onClick={handleNext}
                  className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-xs flex items-center gap-1.5 transition-all"
                >
                  {currentIndex < total - 1 ? 'Next Question' : 'View Results'} <ArrowRight size={14} />
                </button>
              )}
            </div>
          ) : (
            <div className="flex gap-2.5 w-full">
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5"
              >
                <RotateCcw size={14} /> Practice Again
              </button>
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white flex items-center justify-center gap-1.5"
              >
                Done <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
