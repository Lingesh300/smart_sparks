import React from 'react';
import {
  Sparkles,
  Play,
  Gamepad2,
  Brain,
  BookOpen,
  Compass,
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  Flame,
  ChevronRight,
  Layers
} from 'lucide-react';
import { StudentProgress, CurriculumLesson, CurriculumTopic, SchoolStage } from '../types';
import { calculateLevel } from '../services/progressService';
import { GEORGIA_CURRICULUM, getCurriculumForGrade, getAllLessons } from '../data/curriculum';
import MathRenderer from './MathRenderer';

interface StudentDashboardProps {
  progress: StudentProgress;
  onSelectGrade: (grade: number) => void;
  onOpenCurriculum: () => void;
  onOpenTopicIntro?: (topic: CurriculumTopic) => void;
  onOpenLesson: (lesson: CurriculumLesson) => void;
  onOpenGames: (gameId?: string) => void;
  onOpenTutor: (initialTopic?: string) => void;
  onOpenProgress: () => void;
  onStartQuiz?: (topic: CurriculumTopic) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  progress,
  onSelectGrade,
  onOpenCurriculum,
  onOpenTopicIntro,
  onOpenLesson,
  onOpenGames,
  onOpenTutor,
  onOpenProgress,
  onStartQuiz,
}) => {
  const levelInfo = calculateLevel(progress.xp);
  const currentGradeCurriculum =
    getCurriculumForGrade(progress.grade) || getCurriculumForGrade(12)!;
  const featuredTopic =
    currentGradeCurriculum.topics.find(t =>
      t.lessons.some(l => !progress.completedLessons.includes(l.id))
    ) || currentGradeCurriculum.topics[0];
  const featuredLesson = featuredTopic?.lessons[0];

  const allLessons = getAllLessons();
  const totalCurriculumLessons = allLessons.length;
  const completedLessonsCount = progress.completedLessons.length;

  const xpInCurrentLevel = progress.xp - levelInfo.currentLevelBaseXp;
  const xpNeededForLevel = levelInfo.nextLevelXp - levelInfo.currentLevelBaseXp;
  const levelProgressPct = Math.min(100, Math.max(0, (xpInCurrentLevel / xpNeededForLevel) * 100));

  const handleTopicSelect = (topic: CurriculumTopic) => {
    if (onOpenTopicIntro) {
      onOpenTopicIntro(topic);
    } else if (topic.lessons[0]) {
      onOpenLesson(topic.lessons[0]);
    }
  };

  const stages: { key: SchoolStage; label: string; grades: string }[] = [
    { key: 'elementary', label: 'Elementary Mathematics', grades: 'Grades 1–5 (20 Topics)' },
    { key: 'middle', label: 'Middle School Mathematics', grades: 'Grades 6–8 (12 Topics)' },
    { key: 'high', label: 'High School Pathways', grades: 'Grades 9–12 (16 Topics)' },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-y-auto transition-colors">
      {/* ── TOP IXL-INSPIRED GRADE SELECTION RIBBON ──────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 py-3 shrink-0 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1 shrink-0">
              Select Grade:
            </span>
            {GEORGIA_CURRICULUM.map(g => {
              const isSelected = progress.grade === g.grade;
              const isGradeDone = g.topics.every(t =>
                t.lessons.every(l => progress.completedLessons.includes(l.id))
              );
              return (
                <button
                  key={g.grade}
                  onClick={() => onSelectGrade(g.grade)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : isGradeDone
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-cyan-300'
                  }`}
                >
                  <span>Grade {g.grade}</span>
                  {isGradeDone && (
                    <CheckCircle size={11} className={isSelected ? 'text-white' : 'text-emerald-600'} />
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={onOpenCurriculum}
            className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1 shrink-0 self-start sm:self-auto"
          >
            <span>Browse All 48 Georgia Topics</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── MAIN DASHBOARD CONTAINER ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* ── COMPACT STUDENT SUMMARY & RECOMMENDED SKILL BANNER ─────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left 8 Cols: Active Grade Pathway & Continue Learning */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-cyan-300 text-xs font-bold">
                  <Sparkles size={13} />
                  <span>
                    Georgia Standards of Excellence • Grade {progress.grade} ({currentGradeCurriculum.topics.length} Core Topics)
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Welcome back, <strong className="text-slate-800 dark:text-white">{progress.studentName}</strong>
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {currentGradeCurriculum.gradeName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentGradeCurriculum.description}
              </p>
            </div>

            {featuredTopic && featuredLesson && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/90 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                      Recommended Next Topic
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                      {featuredTopic.standardCode}
                    </span>
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {featuredTopic.icon} <MathRenderer content={featuredTopic.title} className="inline" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {featuredLesson.objectives[0]}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleTopicSelect(featuredTopic)}
                    className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <Play size={13} fill="currentColor" />
                    Start Topic
                  </button>

                  {onStartQuiz && (
                    <button
                      onClick={() => onStartQuiz(featuredTopic)}
                      className="py-2.5 px-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-bold text-xs transition-all flex items-center gap-1.5"
                    >
                      <Brain size={13} className="text-indigo-600 dark:text-indigo-400" />
                      Quiz
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right 4 Cols: Compact Real Student Progress Scorecard */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Student Progress
                </span>
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Level {levelInfo.level}: {levelInfo.title}
                </h2>
              </div>
              <button
                onClick={onOpenProgress}
                className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Analytics</span>
                <ArrowRight size={12} />
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-300">{progress.xp} Total XP</span>
                <span className="text-blue-600 dark:text-cyan-400 font-bold">
                  {xpInCurrentLevel}/{xpNeededForLevel} XP to Lvl {levelInfo.level + 1}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/60 dark:border-slate-700">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${levelProgressPct}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 text-center">
                <div className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1">
                  <CheckCircle size={14} className="text-emerald-600 dark:text-emerald-400" />
                  {completedLessonsCount}/{totalCurriculumLessons}
                </div>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block mt-0.5">
                  Skills Done
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 text-center">
                <div className="text-base font-extrabold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
                  <Star size={14} className="text-amber-500 fill-amber-400" />
                  {progress.stars}
                </div>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block mt-0.5">
                  Stars Earned
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 text-center">
                <div className="text-base font-extrabold text-orange-600 dark:text-orange-400 flex items-center justify-center gap-1">
                  <Flame size={14} className="text-orange-500" />
                  {progress.streakDays}d
                </div>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block mt-0.5">
                  Study Streak
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN TWO-COLUMN IXL-STYLE SKILL DIRECTORY & PRACTICE HUB ───────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT 8 COLS: Active Grade Topics (4 per grade) & Complete K-12 Directory */}
          <div className="lg:col-span-8 space-y-6">
            {/* Active Grade Topic & Skill Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
              <div className="px-6 py-4 bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BookOpen size={17} className="text-blue-600 dark:text-cyan-400" />
                  <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    Grade {progress.grade} Syllabus Topics ({currentGradeCurriculum.topics.length} Units)
                  </h2>
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Click any topic or skill to view objectives &amp; start learning
                </span>
              </div>

              <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {currentGradeCurriculum.topics.map((topic, tIdx) => {
                  const completedInTopic = topic.lessons.filter(l =>
                    progress.completedLessons.includes(l.id)
                  ).length;
                  const isTopicDone =
                    completedInTopic === topic.lessons.length && topic.lessons.length > 0;
                  const unitLetter = String.fromCharCode(65 + tIdx);

                  return (
                    <div key={topic.id} className="p-5 sm:p-6 space-y-4">
                      {/* Topic Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-xl shrink-0">
                            {topic.icon}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-extrabold text-blue-700 dark:text-cyan-300 font-mono">
                                Unit {unitLetter} • {topic.standardCode}
                              </span>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                {topic.domain}
                              </span>
                              {isTopicDone && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                  <CheckCircle size={11} /> Mastered
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => handleTopicSelect(topic)}
                              className="text-left text-base sm:text-lg font-extrabold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400 transition-colors mt-0.5 block"
                            >
                              <MathRenderer content={topic.title} className="inline" />
                            </button>
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                              {topic.description}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleTopicSelect(topic)}
                          className="shrink-0 self-start py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                        >
                          <span>Topic Intro</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>

                      {/* IXL-Style Numbered Skill Rows inside Topic */}
                      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-700/80 divide-y divide-slate-200/70 dark:divide-slate-700/70">
                        {topic.lessons.map((lesson, lIdx) => {
                          const isDone = progress.completedLessons.includes(lesson.id);
                          const skillCode = `${unitLetter}.${lIdx + 1}`;

                          return (
                            <div
                              key={lesson.id}
                              className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-blue-50/40 dark:hover:bg-blue-950/30 transition-colors"
                            >
                              <div className="flex items-start gap-3 min-w-0">
                                <span className="text-xs font-extrabold text-blue-700 dark:text-cyan-400 font-mono mt-0.5 shrink-0">
                                  {skillCode}
                                </span>
                                <div className="min-w-0">
                                  <button
                                    onClick={() => handleTopicSelect(topic)}
                                    className="text-left text-sm font-bold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-cyan-400 hover:underline transition-colors block"
                                  >
                                    <MathRenderer content={lesson.title} className="inline" />
                                  </button>
                                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                                    Standard {lesson.standard.code} • {lesson.scenes.length} interactive steps • Worked examples &amp; quick checks • +{lesson.xpReward} XP
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                                {isDone && (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold">
                                    <CheckCircle size={12} /> 100%
                                  </span>
                                )}
                                <button
                                  onClick={() => onOpenLesson(lesson)}
                                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-bold transition-colors"
                                >
                                  {isDone ? 'Review Lesson' : 'Start Lesson'}
                                </button>
                                {onStartQuiz && (
                                  <button
                                    onClick={() => onStartQuiz(topic)}
                                    className="px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold transition-colors"
                                    title="Take Skill Quiz"
                                  >
                                    Quiz
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── ALL GRADES K-12 STRUCTURED SKILL DIRECTORY (ALL 48 TOPICS) ── */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Layers size={18} className="text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    Complete Georgia K–12 Mathematics Syllabus (All 12 Grades • 48 Topics)
                  </h2>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Select any grade or topic below to launch its Topic Introduction
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {stages.map(stageInfo => {
                  const stageGrades = GEORGIA_CURRICULUM.filter(g => g.stage === stageInfo.key);
                  return (
                    <div
                      key={stageInfo.key}
                      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 p-4 space-y-3"
                    >
                      <div className="border-b border-slate-200 dark:border-slate-700 pb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 block">
                          {stageInfo.grades}
                        </span>
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                          {stageInfo.label}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {stageGrades.map(g => {
                          const isCurrentGrade = progress.grade === g.grade;
                          return (
                            <div
                              key={g.grade}
                              className={`p-2.5 rounded-xl border transition-all ${
                                isCurrentGrade
                                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800'
                                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800'
                              }`}
                            >
                              <button
                                onClick={() => onSelectGrade(g.grade)}
                                className="w-full text-left flex items-center justify-between text-xs font-extrabold text-blue-700 dark:text-cyan-300 mb-1.5"
                              >
                                <span>Grade {g.grade}</span>
                                <span className="text-[10px] text-slate-400">{g.topics.length} topics</span>
                              </button>
                              <ul className="space-y-1">
                                {g.topics.map((t, idx) => {
                                  const done = t.lessons.every(l =>
                                    progress.completedLessons.includes(l.id)
                                  );
                                  return (
                                    <li key={t.id}>
                                      <button
                                        onClick={() => {
                                          onSelectGrade(g.grade);
                                          handleTopicSelect(t);
                                        }}
                                        className="w-full text-left px-1.5 py-1 rounded hover:bg-blue-50 dark:hover:bg-slate-800 text-[11px] text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-300 flex items-center justify-between gap-1.5 transition-colors"
                                      >
                                        <span className="truncate">
                                          <strong className="font-mono text-slate-400 mr-1">
                                            {String.fromCharCode(65 + idx)}.
                                          </strong>
                                          {t.title}
                                        </span>
                                        {done && (
                                          <CheckCircle
                                            size={11}
                                            className="text-emerald-600 dark:text-emerald-400 shrink-0"
                                          />
                                        )}
                                      </button>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT 4 COLS: Cosmo AI Tutor, Interactive Skill Games & Activity Log */}
          <div className="lg:col-span-4 space-y-6">
            {/* Cosmo AI Tutor Station Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-2xl shrink-0">
                  🦉
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 block">
                    AI Learning Companion
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Cosmo Visual Tutor Studio
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Get step-by-step explanations, custom SVG diagrams, concept maps, and personalized tutor-generated quizzes on any Georgia math standard.
              </p>

              <button
                onClick={() =>
                  onOpenTutor(
                    featuredLesson
                      ? `Grade ${featuredLesson.grade} Mathematics: ${featuredLesson.title} (${featuredLesson.standard.code})`
                      : `Grade ${progress.grade} Mathematics`
                  )
                }
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Brain size={15} /> Open Cosmo Tutor Studio
              </button>
            </div>

            {/* Interactive Mathematics Games Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <Gamepad2 size={17} className="text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    Interactive Skill Challenges
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                  Earn Stars &amp; XP
                </span>
              </div>

              <div className="space-y-2">
                {[
                  {
                    id: 'game-calculus-area',
                    title: 'Area Accumulator',
                    sub: 'Calculus • Riemann Sums (C.INT.1)',
                    badge: 'G12',
                  },
                  {
                    id: 'game-fraction-blaster',
                    title: 'Fraction Frequency Alignment',
                    sub: 'Fractions • Equivalence (4.NR.4)',
                    badge: 'G4',
                  },
                  {
                    id: 'game-orbit-slope',
                    title: 'Orbit Trajectory Launcher',
                    sub: 'Algebra • Slope-Intercept (8.FGR.5)',
                    badge: 'G8',
                  },
                ].map(g => (
                  <button
                    key={g.id}
                    onClick={() => onOpenGames(g.id)}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-700 hover:border-blue-300 transition-all flex items-center justify-between gap-2 group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                          {g.badge}
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-cyan-300">
                          {g.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                        {g.sub}
                      </span>
                    </div>
                    <Play size={14} className="text-slate-400 group-hover:text-blue-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Real Activity Log */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <Award size={17} className="text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    Recent Practice Log
                  </h3>
                </div>
                <button
                  onClick={onOpenProgress}
                  className="text-[11px] font-bold text-blue-600 dark:text-cyan-400 hover:underline"
                >
                  All Badges
                </button>
              </div>

              {progress.recentActivities.length > 0 ? (
                <div className="space-y-2">
                  {progress.recentActivities.slice(0, 5).map(act => (
                    <div
                      key={act.id}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-sm shrink-0">
                          {act.type === 'lesson' ? '📖' : act.type === 'quiz' ? '📝' : '🎮'}
                        </span>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-800 dark:text-slate-100 truncate">
                            {act.title}
                          </div>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            Grade {act.grade} • {act.timestamp}
                          </span>
                        </div>
                      </div>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold shrink-0 ml-2">
                        +{act.xpEarned} XP
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700 text-center text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
                  <Compass size={20} className="mx-auto text-slate-400" />
                  <p>No completed activities yet. Select a topic on the left to begin practicing!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
