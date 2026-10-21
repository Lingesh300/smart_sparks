import React, { useState, useEffect } from 'react';
import {
  Brain,
  Sparkles,
  CheckCircle,
  Play,
  ArrowRight
} from 'lucide-react';
import { CurriculumLesson, CurriculumTopic, SchoolStage } from '../types';
import { GEORGIA_CURRICULUM, getCurriculumForGrade } from '../data/curriculum';
import MathRenderer from './MathRenderer';

interface CurriculumBrowserProps {
  currentGrade: number;
  completedLessons: string[];
  onSelectGrade: (grade: number) => void;
  onOpenTopicIntro?: (topic: CurriculumTopic) => void;
  onOpenLesson: (lesson: CurriculumLesson) => void;
  onStartQuiz: (topic: CurriculumTopic) => void;
  onAskTutor: (topicName: string, standardCode: string) => void;
}

export const CurriculumBrowser: React.FC<CurriculumBrowserProps> = ({
  currentGrade,
  completedLessons,
  onSelectGrade,
  onOpenTopicIntro,
  onOpenLesson,
  onStartQuiz,
  onAskTutor,
}) => {
  const [selectedStage, setSelectedStage] = useState<SchoolStage>(() => {
    if (currentGrade <= 5) return 'elementary';
    if (currentGrade <= 8) return 'middle';
    return 'high';
  });

  useEffect(() => {
    if (currentGrade <= 5) setSelectedStage('elementary');
    else if (currentGrade <= 8) setSelectedStage('middle');
    else setSelectedStage('high');
  }, [currentGrade]);

  const gradeData =
    getCurriculumForGrade(currentGrade) || GEORGIA_CURRICULUM[GEORGIA_CURRICULUM.length - 1];

  const handleStageSelect = (stage: SchoolStage) => {
    setSelectedStage(stage);
    if (stage === 'elementary' && (currentGrade < 1 || currentGrade > 5)) {
      onSelectGrade(4);
    } else if (stage === 'middle' && (currentGrade < 6 || currentGrade > 8)) {
      onSelectGrade(8);
    } else if (stage === 'high' && (currentGrade < 9 || currentGrade > 12)) {
      onSelectGrade(12);
    }
  };

  const handleTopicSelect = (topic: CurriculumTopic) => {
    if (onOpenTopicIntro) {
      onOpenTopicIntro(topic);
    } else if (topic.lessons[0]) {
      onOpenLesson(topic.lessons[0]);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 overflow-y-auto transition-colors">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        {/* Header & Stage Switcher */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles size={14} /> Official Georgia K–12 Mathematics Syllabus (GSE)
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              Curriculum &amp; Skill Browser
            </h2>
          </div>

          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs self-start md:self-auto">
            <button
              onClick={() => handleStageSelect('elementary')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedStage === 'elementary'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Elementary (Grades 1–5)
            </button>
            <button
              onClick={() => handleStageSelect('middle')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedStage === 'middle'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Middle School (Grades 6–8)
            </button>
            <button
              onClick={() => handleStageSelect('high')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedStage === 'high'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              High School (Grades 9–12)
            </button>
          </div>
        </div>

        {/* Grade Selector Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0 mr-1">
            Select Grade:
          </span>
          {GEORGIA_CURRICULUM.filter(g => g.stage === selectedStage).map(g => (
            <button
              key={g.grade}
              onClick={() => onSelectGrade(g.grade)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                currentGrade === g.grade
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-300'
              }`}
            >
              Grade {g.grade} ({g.topics.length} Topics)
            </button>
          ))}
        </div>

        {/* Current Grade Header Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
              Active Georgia Mathematics Pathway
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {gradeData.gradeName}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              {gradeData.description}
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-cyan-300 text-xs font-bold shrink-0 text-center">
            {gradeData.topics.length} Syllabus Units
          </div>
        </div>

        {/* Topics & Skills List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {gradeData.topics.map((topic, tIdx) => {
            const completedCount = topic.lessons.filter(l => completedLessons.includes(l.id)).length;
            const isTopicDone =
              completedCount === topic.lessons.length && topic.lessons.length > 0;
            const unitLetter = String.fromCharCode(65 + tIdx);

            return (
              <div
                key={topic.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-2xl shrink-0">
                        {topic.icon}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800 font-mono">
                            Unit {unitLetter} • {topic.standardCode}
                          </span>
                          {isTopicDone && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                              <CheckCircle size={11} /> Mastered
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleTopicSelect(topic)}
                          className="text-left text-base sm:text-lg font-extrabold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400 transition-colors mt-1 block"
                        >
                          <MathRenderer content={topic.title} className="inline" />
                        </button>
                      </div>
                    </div>

                    <span className="text-xs text-amber-700 dark:text-amber-300 font-bold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 shrink-0">
                      +{topic.xpReward} XP
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                {/* Lessons List inside this topic */}
                <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  {topic.lessons.map(lesson => {
                    const isCompleted = completedLessons.includes(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {isCompleted ? (
                              <CheckCircle size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                            )}
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              <MathRenderer content={lesson.title} className="inline" />
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 pl-4">
                            {lesson.scenes.length} interactive steps • Worked examples • Concept checks
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => handleTopicSelect(topic)}
                            className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-xs flex items-center justify-center gap-1.5 transition-all"
                          >
                            <Play size={12} fill="currentColor" />
                            {isCompleted ? 'Review Topic' : 'Topic Intro & Start'}
                          </button>

                          <button
                            onClick={() => onStartQuiz(topic)}
                            className="py-2 px-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-indigo-50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold flex items-center gap-1 transition-all"
                          >
                            <Brain size={13} /> Quiz
                          </button>

                          <button
                            onClick={() => onAskTutor(lesson.title, lesson.standard.code)}
                            className="py-2 px-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1 transition-all"
                          >
                            🦉 Cosmo
                          </button>
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
    </div>
  );
};

export default CurriculumBrowser;
