import React, { useState, useEffect } from 'react';
import {
  Compass,
  BookOpen,
  Gamepad2,
  Brain,
  Award,
  FileText,
  Sparkles,
  Star,
  Sun,
  Moon,
} from 'lucide-react';
import { AppNavView, CurriculumLesson, CurriculumTopic, QuizData, StudentProgress } from './types';
import { getStudentProgress, updateStudentGrade, awardLessonCompletion } from './services/progressService';
import { GEORGIA_CURRICULUM, getCurriculumForGrade, getLessonById } from './data/curriculum';
import { stopSpeaking } from './services/speech';
import StudentDashboard from './components/StudentDashboard';
import CurriculumBrowser from './components/CurriculumBrowser';
import LessonPlayer from './components/LessonPlayer';
import MathGalaxyGame from './components/MathGalaxyGame';
import ProgressView from './components/ProgressView';
import QuizModal from './components/QuizModal';
import TutorView from './components/TutorView';
import DiaryView from './components/DiaryView';
import TopicIntroScreen from './components/TopicIntroScreen';

const THEME_STORAGE_KEY = 'mathgalaxy_theme';

const findTopicForLesson = (lesson: CurriculumLesson): CurriculumTopic | null => {
  for (const g of GEORGIA_CURRICULUM) {
    for (const t of g.topics) {
      if (t.lessons.some(l => l.id === lesson.id)) {
        return t;
      }
    }
  }
  return null;
};

const findTopicById = (topicId: string): CurriculumTopic | null => {
  for (const g of GEORGIA_CURRICULUM) {
    const found = g.topics.find(t => t.id === topicId);
    if (found) return found;
  }
  return null;
};

export const App: React.FC = () => {
  // ── Light / Dark Theme Mode State (Synced Globally) ─────────────────────────
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };


  // ── Real Student Progression State ──────────────────────────────────────────
  const [progress, setProgress] = useState<StudentProgress>(() => getStudentProgress());

  // ── Active Curriculum Context ───────────────────────────────────────────────
  const initialGradeCurriculum =
    getCurriculumForGrade(progress.grade) || getCurriculumForGrade(12)!;
  const defaultTopic = initialGradeCurriculum.topics[0] || null;
  const defaultLesson = defaultTopic?.lessons[0] || null;

  const [activeView, setActiveView] = useState<AppNavView>('dashboard');
  const [previousTopicSourceView, setPreviousTopicSourceView] = useState<'dashboard' | 'curriculum'>('curriculum');
  const [isEmbedded, setIsEmbedded] = useState(false);

  const [selectedTopic, setSelectedTopic] = useState<CurriculumTopic | null>(defaultTopic);
  const [activeLesson, setActiveLesson] = useState<CurriculumLesson | null>(defaultLesson);
  const [activeGameId, setActiveGameId] = useState<string>('game-calculus-area');

  // ── Quiz Modal State ────────────────────────────────────────────────────────
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [currentQuizData, setCurrentQuizData] = useState<QuizData | null>(defaultLesson?.quiz || null);

  // ── Preserved Tutor & Diary Shared Context State ─────────────────────────────
  const [diaryText, setDiaryText] = useState('');
  const [diaryImage, setDiaryImage] = useState<string | null>(null);
  const [diaryImageMime, setDiaryImageMime] = useState<string | null>(null);
  const [tutorMemory, setTutorMemory] = useState<string | null>(() => {
    return defaultLesson
      ? `Grade ${defaultLesson.grade} Mathematics: ${defaultLesson.title} (${defaultLesson.standard.code})`
      : null;
  });

  const navigateToView = (view: AppNavView) => {
    stopSpeaking();
    setActiveView(view);
  };

  // ── 1. Parent Platform URL Query & postMessage Integration ─────────────────
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const embedParam = params.get('embed');
      const gradeParam = params.get('grade');
      const topicParam = params.get('topic');
      const lessonParam = params.get('lesson');
      const viewParam = params.get('view') as AppNavView | null;

      if (embedParam === 'true' || window.self !== window.top) {
        setIsEmbedded(true);
      }

      if (gradeParam) {
        const parsedGrade = parseInt(gradeParam, 10);
        if (parsedGrade >= 1 && parsedGrade <= 12) {
          const updated = updateStudentGrade(parsedGrade);
          setProgress(updated);
          const gc = getCurriculumForGrade(parsedGrade);
          if (gc?.topics[0]) {
            setSelectedTopic(gc.topics[0]);
            if (gc.topics[0].lessons[0]) {
              setActiveLesson(gc.topics[0].lessons[0]);
            }
          }
        }
      }

      if (topicParam) {
        const foundTopic = findTopicById(topicParam);
        if (foundTopic) {
          setSelectedTopic(foundTopic);
          if (foundTopic.lessons[0]) {
            setActiveLesson(foundTopic.lessons[0]);
          }
          setActiveView('topic-intro');
        }
      }

      if (lessonParam) {
        const foundLesson = getLessonById(lessonParam);
        if (foundLesson) {
          setActiveLesson(foundLesson);
          const parentTopic = findTopicForLesson(foundLesson);
          if (parentTopic) setSelectedTopic(parentTopic);
          setActiveView('lesson');
          setTutorMemory(
            `Grade ${foundLesson.grade} Mathematics: ${foundLesson.title} (${foundLesson.standard.code})`
          );
        }
      } else if (
        viewParam &&
        ['dashboard', 'curriculum', 'topic-intro', 'lesson', 'game', 'tutor', 'progress', 'diary'].includes(viewParam)
      ) {
        setActiveView(viewParam);
      }
    }

    const handleParentMessage = (event: MessageEvent) => {
      try {
        const data = event.data;
        if (!data || typeof data !== 'object') return;

        if (data.type === 'NAVIGATE_LESSON' && data.payload?.lessonId) {
          const lesson = getLessonById(data.payload.lessonId);
          if (lesson) {
            stopSpeaking();
            setActiveLesson(lesson);
            const parentTopic = findTopicForLesson(lesson);
            if (parentTopic) setSelectedTopic(parentTopic);
            setActiveView('lesson');
            setTutorMemory(
              `Grade ${lesson.grade} Mathematics: ${lesson.title} (${lesson.standard.code})`
            );
          }
        }

        if (data.type === 'SET_GRADE' && data.payload?.grade) {
          const updated = updateStudentGrade(data.payload.grade);
          setProgress(updated);
        }
      } catch (err) {
        console.warn('Parent message processing error:', err);
      }
    };

    window.addEventListener('message', handleParentMessage);
    return () => window.removeEventListener('message', handleParentMessage);
  }, []);

  const refreshProgress = () => {
    setProgress(getStudentProgress());
  };

  const handleSelectGrade = (grade: number) => {
    stopSpeaking();
    const updated = updateStudentGrade(grade);
    setProgress(updated);

    const gradeCurriculum = getCurriculumForGrade(grade);
    if (gradeCurriculum && gradeCurriculum.topics.length > 0) {
      const firstTopic = gradeCurriculum.topics[0];
      setSelectedTopic(firstTopic);
      const firstLesson = firstTopic.lessons[0];
      if (firstLesson) {
        setActiveLesson(firstLesson);
        setCurrentQuizData(firstLesson.quiz);
        setTutorMemory(
          `Grade ${firstLesson.grade} Mathematics: ${firstLesson.title} (${firstLesson.standard.code})`
        );
      }
    }
  };

  const handleOpenTopicIntro = (topic: CurriculumTopic, source: 'dashboard' | 'curriculum' = 'curriculum') => {
    stopSpeaking();
    setPreviousTopicSourceView(source);
    setSelectedTopic(topic);
    if (topic.grade !== progress.grade) {
      const updated = updateStudentGrade(topic.grade);
      setProgress(updated);
    }
    if (topic.lessons[0]) {
      setActiveLesson(topic.lessons[0]);
      setCurrentQuizData(topic.lessons[0].quiz);
      setTutorMemory(
        `Grade ${topic.lessons[0].grade} Mathematics: ${topic.lessons[0].title} (${topic.lessons[0].standard.code})`
      );
    }
    setActiveView('topic-intro');
  };

  const handleOpenLesson = (lesson: CurriculumLesson) => {
    stopSpeaking();
    setActiveLesson(lesson);
    const parentTopic = findTopicForLesson(lesson);
    if (parentTopic) {
      setSelectedTopic(parentTopic);
    }
    setCurrentQuizData(lesson.quiz);
    setTutorMemory(`Grade ${lesson.grade} Mathematics: ${lesson.title} (${lesson.standard.code})`);
    setActiveView('lesson');
  };

  const handleOpenGame = (gameId?: string) => {
    stopSpeaking();
    setActiveGameId(gameId || activeLesson?.gameId || 'game-calculus-area');
    setActiveView('game');
  };

  const handleOpenTutor = (topicPrompt?: string) => {
    stopSpeaking();
    if (topicPrompt) {
      setTutorMemory(topicPrompt);
    }
    setActiveView('tutor');
  };

  const handleOpenQuiz = (topic?: CurriculumTopic) => {
    stopSpeaking();
    if (topic && topic.lessons[0]?.quiz) {
      setCurrentQuizData(topic.lessons[0].quiz);
    } else if (activeLesson?.quiz) {
      setCurrentQuizData(activeLesson.quiz);
    }
    setIsQuizModalOpen(true);
  };

  const handleLessonComplete = (lessonId: string, xpEarned: number) => {
    if (activeLesson) {
      const result = awardLessonCompletion(
        lessonId,
        activeLesson.grade,
        activeLesson.title,
        xpEarned
      );
      setProgress(result.progress);
    }
  };

  const navItems: { id: AppNavView; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Learning', icon: <Compass size={15} /> },
    { id: 'curriculum', label: 'Curriculum', icon: <BookOpen size={15} /> },
    { id: 'lesson', label: 'Lesson Player', icon: <Sparkles size={15} /> },
    { id: 'game', label: 'Skill Games', icon: <Gamepad2 size={15} /> },
    { id: 'tutor', label: 'Cosmo Tutor 🦉', icon: <Brain size={15} /> },
    { id: 'progress', label: 'Analytics', icon: <Award size={15} /> },
    { id: 'diary', label: 'Notes', icon: <FileText size={15} /> },
  ];

  return (
    <div className="w-full h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 flex flex-col overflow-hidden transition-colors">
      {/* ── TOP NAVIGATION BAR WITH LIGHT / DARK MODE TOGGLE ────────────────── */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 sm:px-6 flex items-center justify-between z-30 shrink-0 shadow-xs transition-colors">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => navigateToView('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-lg shadow-xs group-hover:bg-blue-700 transition-colors">
              🪐
            </div>
            <div>
              <div className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                MATH GALAXY
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800 font-mono font-bold">
                  GSE K–12
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Structured Mathematics &amp; Visual AI Learning
              </div>
            </div>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          {navItems.map(item => {
            const isCurrent =
              activeView === item.id ||
              (item.id === 'curriculum' && activeView === 'topic-intro');
            return (
              <button
                key={item.id}
                onClick={() => navigateToView(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-slate-700/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Status Pill, Theme Mode Toggle (Light/Dark) & API Key */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <span className="text-blue-700 dark:text-cyan-300">Grade {progress.grade}</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Star size={13} className="text-amber-500 fill-amber-400" /> {progress.stars}
            </span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-emerald-700 dark:text-emerald-400">Lvl {progress.level}</span>
          </div>

          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="px-2.5 py-1.5 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <>
                <Moon size={15} className="text-indigo-600" />
                <span className="hidden xl:inline">Dark</span>
              </>
            ) : (
              <>
                <Sun size={15} className="text-amber-400" />
                <span className="hidden xl:inline">Light</span>
              </>
            )}
          </button>

        </div>
      </header>

      {/* ── MOBILE / TABLET QUICK NAV ────────────────────────────────────────── */}
      <div className="lg:hidden flex items-center justify-around bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-2 py-1.5 z-20 shrink-0 overflow-x-auto">
        {navItems.slice(0, 6).map(item => {
          const isCurrent =
            activeView === item.id ||
            (item.id === 'curriculum' && activeView === 'topic-intro');
          return (
            <button
              key={item.id}
              onClick={() => navigateToView(item.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                isCurrent
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-300'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {item.label.replace(' 🦉', '')}
            </button>
          );
        })}
      </div>

      {/* ── MAIN CONTENT WORKSPACE ───────────────────────────────────────────── */}
      <main className="flex-1 w-full h-full overflow-hidden relative">
        {activeView === 'dashboard' && (
          <StudentDashboard
            progress={progress}
            onSelectGrade={handleSelectGrade}
            onOpenCurriculum={() => navigateToView('curriculum')}
            onOpenTopicIntro={topic => handleOpenTopicIntro(topic, 'dashboard')}
            onOpenLesson={handleOpenLesson}
            onOpenGames={handleOpenGame}
            onOpenTutor={handleOpenTutor}
            onOpenProgress={() => navigateToView('progress')}
            onStartQuiz={handleOpenQuiz}
          />
        )}

        {activeView === 'curriculum' && (
          <CurriculumBrowser
            currentGrade={progress.grade}
            completedLessons={progress.completedLessons}
            onSelectGrade={handleSelectGrade}
            onOpenTopicIntro={topic => handleOpenTopicIntro(topic, 'curriculum')}
            onOpenLesson={lesson => {
              const parentTopic = findTopicForLesson(lesson);
              if (parentTopic) {
                handleOpenTopicIntro(parentTopic, 'curriculum');
              } else {
                handleOpenLesson(lesson);
              }
            }}
            onStartQuiz={handleOpenQuiz}
            onAskTutor={(topicTitle, standardCode) => {
              handleOpenTutor(
                `Let's investigate: ${topicTitle} (Georgia Standard ${standardCode})`
              );
            }}
          />
        )}

        {activeView === 'topic-intro' && selectedTopic && (
          <TopicIntroScreen
            topic={selectedTopic}
            progress={progress}
            onStartLearning={lesson => handleOpenLesson(lesson)}
            onBack={() => navigateToView(previousTopicSourceView)}
            onStartQuiz={handleOpenQuiz}
            onAskTutor={prompt => handleOpenTutor(prompt)}
          />
        )}

        {activeView === 'lesson' && activeLesson && (
          <LessonPlayer
            lesson={activeLesson}
            onComplete={handleLessonComplete}
            onStartQuiz={() => handleOpenQuiz()}
            onStartGame={handleOpenGame}
            onAskTutor={prompt => handleOpenTutor(prompt)}
            onBackToCurriculum={() => {
              const parentTopic = findTopicForLesson(activeLesson) || selectedTopic;
              if (parentTopic) {
                setSelectedTopic(parentTopic);
                navigateToView('topic-intro');
              } else {
                navigateToView('curriculum');
              }
            }}
          />
        )}

        {activeView === 'game' && (
          <MathGalaxyGame
            gameId={activeGameId}
            onFinish={() => navigateToView('dashboard')}
            onAskTutor={prompt => handleOpenTutor(prompt)}
            onSelectGame={id => setActiveGameId(id)}
            onGameComplete={refreshProgress}
          />
        )}

        {activeView === 'tutor' && (
          <div className="w-full h-full flex flex-col">
            <TutorView
              contextMemory={diaryText || `Grade ${progress.grade} Mathematics`}
              contextImage={diaryImage}
              contextImageMime={diaryImageMime}
              activeTutorMemory={tutorMemory}
              mode="full"
            />
          </div>
        )}

        {activeView === 'progress' && (
          <ProgressView
            progress={progress}
            onExploreLessons={() => navigateToView('curriculum')}
          />
        )}

        {activeView === 'diary' && (
          <div className="w-full h-full flex flex-col">
            <DiaryView
              initialText={diaryText}
              onUpdateText={setDiaryText}
              contextMemory={diaryText}
              initialImage={diaryImage}
              onUpdateImage={(img, mime) => {
                setDiaryImage(img);
                setDiaryImageMime(mime);
              }}
              onSendToTutor={text => {
                setTutorMemory(text);
                navigateToView('tutor');
              }}
            />
          </div>
        )}
      </main>

      {/* ── INTERACTIVE QUIZ MODAL ───────────────────────────────────────────── */}
      {isQuizModalOpen && currentQuizData && (
        <QuizModal
          quizData={currentQuizData}
          isOpen={isQuizModalOpen}
          onClose={() => setIsQuizModalOpen(false)}
          onQuizComplete={refreshProgress}
          onAskTutor={q => {
            setIsQuizModalOpen(false);
            handleOpenTutor(`I have a question about this quiz problem: "${q}"`);
          }}
        />
      )}
    </div>
  );
};

export default App;