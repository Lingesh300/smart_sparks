import React from 'react';
import {
  Play,
  ArrowLeft,
  Star,
  Clock,
  Sparkles,
  CheckCircle,
  Trophy,
  BookOpen,
  Brain,
  Target,
  ChevronRight,
  Compass
} from 'lucide-react';
import { CurriculumTopic, CurriculumLesson, StudentProgress } from '../types';
import MathRenderer from './MathRenderer';

interface TopicIntroScreenProps {
  topic: CurriculumTopic;
  progress: StudentProgress;
  onStartLearning: (lesson: CurriculumLesson) => void;
  onBack: () => void;
  onStartQuiz?: (topic: CurriculumTopic) => void;
  onAskTutor?: (prompt: string) => void;
}

const ConceptPreview: React.FC<{ topic: CurriculumTopic }> = ({ topic }) => {
  const domain = `${topic.domain} ${topic.title} ${topic.lessons[0]?.scenes[0]?.visualType || ''}`.toLowerCase();

  if (domain.includes('calculus') || domain.includes('integral') || domain.includes('riemann') || domain.includes('deriv')) {
    return (
      <svg viewBox="0 0 360 210" className="w-full h-auto rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-inner">
        <defs>
          <linearGradient id="introArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path d="M 65 165 L 65 148 Q 160 130 285 42 L 285 165 Z" fill="url(#introArea)" />
        {[
          { x: 65, y: 136, w: 55, h: 29 },
          { x: 120, y: 112, w: 55, h: 53 },
          { x: 175, y: 80, w: 55, h: 85 },
          { x: 230, y: 42, w: 55, h: 123 },
        ].map((r, i) => (
          <rect
            key={i}
            x={r.x}
            y={r.y}
            width={r.w - 2}
            height={r.h}
            fill="#3b82f6"
            fillOpacity="0.2"
            stroke="#2563eb"
            strokeWidth="1.5"
            rx="2"
          />
        ))}
        <path d="M 55 152 Q 160 132 295 35" fill="none" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
        <line x1="45" y1="165" x2="330" y2="165" stroke="#64748b" strokeWidth="2" />
        <line x1="45" y1="25" x2="45" y2="165" stroke="#64748b" strokeWidth="2" />
        <text x="185" y="192" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
          Rate &amp; Accumulation Model
        </text>
      </svg>
    );
  }

  if (domain.includes('fraction') || domain.includes('ratio') || domain.includes('multiplication') || domain.includes('decimal')) {
    return (
      <svg viewBox="0 0 360 210" className="w-full h-auto rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-inner">
        <text x="180" y="26" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
          Visual Equivalence Model (1/2 = 2/4 = 4/8)
        </text>
        <rect x="35" y="42" width="145" height="28" fill="#2563eb" rx="4" />
        <rect x="180" y="42" width="145" height="28" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" rx="4" />
        <text x="107" y="60" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">1/2</text>

        {[0, 1, 2, 3].map(i => (
          <g key={`q-${i}`}>
            <rect
              x={35 + i * 72.5}
              y="82"
              width="70.5"
              height="28"
              fill={i < 2 ? '#0284c7' : '#f1f5f9'}
              stroke={i < 2 ? '#0369a1' : '#cbd5e1'}
              strokeWidth="1"
              rx="4"
            />
          </g>
        ))}

        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <g key={`e-${i}`}>
            <rect
              x={35 + i * 36.25}
              y="122"
              width="34.25"
              height="28"
              fill={i < 4 ? '#4f46e5' : '#f1f5f9'}
              stroke={i < 4 ? '#4338ca' : '#cbd5e1'}
              strokeWidth="1"
              rx="3"
            />
          </g>
        ))}
        <text x="180" y="182" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
          Equal Shaded Proportions (50%)
        </text>
      </svg>
    );
  }

  if (domain.includes('geometry') || domain.includes('trig') || domain.includes('unit circle') || domain.includes('volume') || domain.includes('pythag') || domain.includes('angle') || domain.includes('circle')) {
    return (
      <svg viewBox="0 0 360 210" className="w-full h-auto rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-inner">
        <polygon points="75,155 255,155 255,45" fill="#3b82f6" fillOpacity="0.18" stroke="#2563eb" strokeWidth="2.5" />
        <polyline points="240,155 240,140 255,140" fill="none" stroke="#2563eb" strokeWidth="1.8" />
        <text x="122" y="148" fill="#d97706" fontSize="12" fontWeight="bold" fontFamily="sans-serif">θ</text>
        <text x="165" y="173" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Adjacent (b)</text>
        <text x="295" y="105" textAnchor="middle" fill="#0284c7" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Opposite (a)</text>
        <text x="150" y="90" textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Hypotenuse (c)</text>
        <text x="180" y="196" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
          Geometric &amp; Spatial Relationships
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 360 210" className="w-full h-auto rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-inner">
      <line x1="45" y1="165" x2="330" y2="165" stroke="#64748b" strokeWidth="2" />
      <line x1="65" y1="20" x2="65" y2="175" stroke="#64748b" strokeWidth="2" />
      <line x1="95" y1="135" x2="235" y2="135" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 3" />
      <line x1="235" y1="135" x2="235" y2="55" stroke="#e11d48" strokeWidth="2" strokeDasharray="4 3" />
      <line x1="65" y1="152" x2="295" y2="22" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="95" cy="135" r="5" fill="#0284c7" />
      <circle cx="235" cy="55" r="5" fill="#e11d48" />
      <text x="165" y="152" textAnchor="middle" fill="#0284c7" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Run Δx</text>
      <text x="270" y="98" textAnchor="middle" fill="#e11d48" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Rise Δy</text>
      <text x="155" y="52" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold" fontFamily="sans-serif">y = mx + b</text>
    </svg>
  );
};

const TopicIntroScreen: React.FC<TopicIntroScreenProps> = ({
  topic,
  progress,
  onStartLearning,
  onBack,
  onStartQuiz,
  onAskTutor,
}) => {
  const firstLesson = topic.lessons[0];
  const nextRecommendedLesson =
    topic.lessons.find(l => !progress.completedLessons.includes(l.id)) || firstLesson;

  const completedCount = topic.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
  const totalLessons = topic.lessons.length;
  const isCompleted = completedCount === totalLessons && totalLessons > 0;
  const completionPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const totalScenes = topic.lessons.reduce((sum, l) => sum + l.scenes.length, 0);
  const estimatedMinutes = Math.max(5, totalScenes * 4);

  const stageLabel =
    topic.stage === 'elementary'
      ? 'Elementary Math'
      : topic.stage === 'middle'
      ? 'Middle School Math'
      : 'High School Math';

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-y-auto transition-colors">
      {/* Sub-header Breadcrumb Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3 shrink-0">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-blue-600 dark:text-cyan-400 hover:underline font-semibold transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Topics
            </button>
            <ChevronRight size={13} className="text-slate-300 dark:text-slate-700" />
            <span>Grade {topic.grade} ({stageLabel})</span>
            <ChevronRight size={13} className="text-slate-300 dark:text-slate-700" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">{topic.standardCode}</span>
          </div>

          <div className="flex items-center gap-2">
            {isCompleted ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle size={13} /> Topic Mastered
              </span>
            ) : completedCount > 0 ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800">
                In Progress ({completionPct}%)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Ready to Start
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 py-6 sm:py-8 space-y-6">
        {/* Top Topic Overview Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-600 text-white">
                  Grade {topic.grade}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800 font-mono">
                  Standard {topic.standardCode}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {topic.domain}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-2xl shrink-0">
                  {topic.icon}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                    <MathRenderer content={topic.title} className="inline" />
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              </div>

              {firstLesson?.standard?.description && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                  <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] block mb-0.5">
                    Georgia Standard Benchmark ({firstLesson.standard.code})
                  </span>
                  <MathRenderer content={firstLesson.standard.description} />
                </div>
              )}

              {/* Real Data Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                    Interactive Steps
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                    <BookOpen size={14} className="text-blue-600 dark:text-cyan-400" />
                    {totalScenes} {totalScenes === 1 ? 'Step' : 'Steps'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                    Est. Duration
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                    <Clock size={14} className="text-indigo-600 dark:text-indigo-400" />
                    ~{estimatedMinutes} mins
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                    Mastery Reward
                  </span>
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mt-0.5">
                    <Star size={14} className="text-amber-500 fill-amber-400" />
                    +{topic.xpReward} XP
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                    Skill Progress
                  </span>
                  <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mt-0.5">
                    <Trophy size={14} className="text-emerald-600 dark:text-emerald-400" />
                    {completedCount}/{totalLessons} Done
                  </span>
                </div>
              </div>

              {/* Primary CTA Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => nextRecommendedLesson && onStartLearning(nextRecommendedLesson)}
                  disabled={!nextRecommendedLesson}
                  className="py-3.5 px-7 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-xs transition-all flex items-center gap-2.5 disabled:opacity-50"
                >
                  <Play size={17} fill="currentColor" />
                  {completedCount > 0 && !isCompleted
                    ? 'Continue Learning'
                    : isCompleted
                    ? 'Review Interactive Lesson'
                    : 'Start Learning'}
                </button>

                {onStartQuiz && firstLesson?.quiz && (
                  <button
                    onClick={() => onStartQuiz(topic)}
                    className="py-3.5 px-5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 font-semibold text-sm transition-all flex items-center gap-2"
                  >
                    <Brain size={16} className="text-indigo-600 dark:text-indigo-400" />
                    Practice Skill Quiz
                  </button>
                )}

                <button
                  onClick={onBack}
                  className="py-3.5 px-4 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-sm transition-all"
                >
                  Explore Curriculum
                </button>
              </div>
            </div>

            {/* Right 5 Cols: Visual Preview & Cosmo Tip */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2.5">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Interactive Visual Preview
                  </span>
                  <span className="text-[11px] font-semibold text-blue-600 dark:text-cyan-400 truncate max-w-[160px]">
                    {firstLesson?.scenes[0]?.title || 'Dynamic Model'}
                  </span>
                </div>
                <ConceptPreview topic={topic} />
              </div>

              <div className="flex items-start gap-3 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800 rounded-xl p-3.5">
                <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-xl shrink-0 shadow-xs">
                  🦉
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Cosmo AI Tutor is Ready
                    </span>
                    {onAskTutor && (
                      <button
                        onClick={() =>
                          onAskTutor(`Let's explore ${topic.title} (Standard ${topic.standardCode})`)
                        }
                        className="text-[11px] font-bold text-blue-600 dark:text-cyan-400 hover:underline"
                      >
                        Open Tutor →
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug mt-0.5">
                    Each step includes core intuition, formulas, a worked example, and an interactive check!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Objectives & Key Takeaways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {firstLesson && firstLesson.objectives.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Target size={18} className="text-blue-600 dark:text-cyan-400" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Learning Objectives
                </h2>
              </div>
              <ul className="space-y-3">
                {firstLesson.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    <span className="w-6 h-6 shrink-0 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-700 dark:text-cyan-300 text-xs font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <MathRenderer content={obj} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {firstLesson && firstLesson.takeaways.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Sparkles size={18} className="text-amber-500" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Key Mathematical Takeaways
                </h2>
              </div>
              <ul className="space-y-3">
                {firstLesson.takeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                    <div className="flex-1">
                      <MathRenderer content={point} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Structured Skill & Lesson Breakdown */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Compass size={18} className="text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Interactive Lesson Steps in This Topic
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {totalScenes} Guided Steps
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {topic.lessons.map((lesson) => {
              const done = progress.completedLessons.includes(lesson.id);
              return (
                <div key={lesson.id} className="py-3 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800 font-mono">
                          {lesson.standard.code}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          <MathRenderer content={lesson.title} className="inline" />
                        </h3>
                      </div>
                    </div>

                    <button
                      onClick={() => onStartLearning(lesson)}
                      className="shrink-0 py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <Play size={13} fill="currentColor" />
                      {done ? 'Review Lesson' : 'Start Lesson'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    {lesson.scenes.map((sc, sIdx) => (
                      <div
                        key={sc.id}
                        onClick={() => onStartLearning(lesson)}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 hover:border-blue-400 cursor-pointer transition-all"
                      >
                        <span className="text-[10px] font-extrabold uppercase text-blue-600 dark:text-cyan-400 block">
                          Step {sIdx + 1}
                        </span>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                          {sc.title}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                          {sc.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicIntroScreen;
