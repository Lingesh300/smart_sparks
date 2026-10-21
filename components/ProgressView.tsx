import React from 'react';
import { Trophy, Award, CheckCircle, BookOpen, Star, Flame } from 'lucide-react';
import { StudentProgress } from '../types';
import { ALL_BADGES, calculateLevel } from '../services/progressService';
import { getLessonById } from '../data/curriculum';
import MathRenderer from './MathRenderer';

interface ProgressViewProps {
  progress: StudentProgress;
  onExploreLessons: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ progress, onExploreLessons }) => {
  const levelInfo = calculateLevel(progress.xp);
  const xpInCurrentLevel = progress.xp - levelInfo.currentLevelBaseXp;
  const xpNeededForLevel = levelInfo.nextLevelXp - levelInfo.currentLevelBaseXp;
  const levelProgressPct = Math.min(100, Math.max(0, (xpInCurrentLevel / xpNeededForLevel) * 100));

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 overflow-y-auto transition-colors">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <Trophy size={14} /> Student Mastery Record
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              Progress, Analytics &amp; Achievements
            </h2>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2 self-start md:self-auto shadow-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Progress Saved Automatically</span>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-3xl">
                🎖️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-600 dark:text-cyan-400">
                    Level {levelInfo.level}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Grade {progress.grade}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {levelInfo.title}
                </h3>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Total Accumulated XP
              </span>
              <span className="text-3xl font-extrabold text-blue-600 dark:text-cyan-400">
                {progress.xp} XP
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span>Progress to Level {levelInfo.level + 1}</span>
              <span className="text-blue-600 dark:text-cyan-400 font-bold">
                {xpInCurrentLevel} / {xpNeededForLevel} XP
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${levelProgressPct}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Stars Collected
              </span>
              <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1 flex items-center justify-center gap-1.5">
                <Star size={20} className="text-amber-500 fill-amber-400" /> {progress.stars}
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Skills &amp; Lessons Mastered
              </span>
              <div className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-1 flex items-center justify-center gap-1.5">
                <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400" />{' '}
                {progress.completedLessons.length}
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Active Study Streak
              </span>
              <div className="text-2xl font-extrabold text-orange-600 dark:text-orange-400 mt-1 flex items-center justify-center gap-1.5">
                <Flame size={20} className="text-orange-500" /> {progress.streakDays} Day
                {progress.streakDays === 1 ? '' : 's'}
              </div>
            </div>
          </div>
        </div>

        {/* Badges Gallery */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
              <Award size={18} className="text-blue-600 dark:text-cyan-400" /> Mastery Badges &amp; Certificates
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              {progress.unlockedBadges.length} of {ALL_BADGES.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_BADGES.map(badge => {
              const isUnlocked = progress.unlockedBadges.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                    isUnlocked
                      ? 'bg-white dark:bg-slate-900 border-blue-200 dark:border-blue-800 shadow-xs'
                      : 'bg-slate-100/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-70'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border ${
                      isUnlocked
                        ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800'
                        : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {badge.icon}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{badge.title}</h4>
                      {isUnlocked && <CheckCircle size={14} className="text-emerald-600 dark:text-emerald-400" />}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {badge.description}
                    </p>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider block pt-1 ${
                        isUnlocked ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'
                      }`}
                    >
                      {isUnlocked ? '✓ Unlocked' : 'Locked'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quizzes and Lessons History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <BookOpen size={16} className="text-blue-600 dark:text-cyan-400" /> Completed Skills &amp; Lessons
            </h4>

            {progress.completedLessons.length > 0 ? (
              <div className="space-y-2">
                {progress.completedLessons.map(id => {
                  const found = getLessonById(id);
                  return (
                    <div
                      key={id}
                      className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-100 block">
                          {found ? <MathRenderer content={found.title} className="inline" /> : id}
                        </span>
                        {found && (
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            Grade {found.grade} • Standard {found.standard.code}
                          </span>
                        )}
                      </div>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1 shrink-0">
                        <CheckCircle size={14} /> Mastered
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700">
                <p>No lessons completed yet.</p>
                <button
                  onClick={onExploreLessons}
                  className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline"
                >
                  Browse Curriculum Skills →
                </button>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400" /> Quiz History &amp; Accuracy
            </h4>

            {progress.completedQuizzes.length > 0 ? (
              <div className="space-y-2">
                {progress.completedQuizzes.map((q, idx) => {
                  const pct = Math.round((q.score / q.total) * 100);
                  return (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-100">{q.topicId}</div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          {new Date(q.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-2.5 py-1 rounded-md font-bold border ${
                            pct >= 80
                              ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                              : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                          }`}
                        >
                          {q.score} / {q.total} ({pct}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700">
                <p>No quizzes completed yet. Practice a skill quiz to record your accuracy!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressView;
