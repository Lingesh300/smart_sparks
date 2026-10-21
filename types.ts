export type AppMode = 'diary' | 'tutor';

export type AppNavView = 
  | 'dashboard' 
  | 'curriculum' 
  | 'topic-intro'
  | 'lesson' 
  | 'game' 
  | 'tutor' 
  | 'progress' 
  | 'diary';

export type SchoolStage = 'elementary' | 'middle' | 'high';

export interface Insight {
  text: string;
  relatedTopic?: string;
}

export interface TutorResponse {
  mindmap_code?: string | null;
  svg_code: string | null;
  speech_response: string;
  question?: string | null;
  scaffolding_state: 'example' | 'problem' | 'fading';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  mindmap?: string | null;
  svg?: string | null;
  id?: number;
}

export interface GeminiConfig {
  temperature?: number;
  topK?: number;
  topP?: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizData {
  topic: string;
  questions: QuizQuestion[];
}

// ── Math Galaxy Curriculum & Game Data Models ─────────────────────────────────

export interface GeorgiaStandard {
  code: string;        // e.g. "C.INT.1", "1.NR.1", "A.PAR.6"
  domain: string;      // e.g. "Integral Calculus", "Numerical Reasoning", "Patterning & Algebraic Reasoning"
  description: string;
  grade: number;
}

export interface WorkedExample {
  problem: string;
  steps: string[];
  answer: string;
}

export interface QuickCheck {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonScene {
  id: string;
  title: string;
  conceptStep: number;
  totalSteps: number;
  narration: string;
  explanation: string;
  formula?: string;
  workedExample?: WorkedExample;
  quickCheck?: QuickCheck;
  visualType: 
    | 'riemann_sum'          // Calculus area under curve animation
    | 'fraction_galaxy'      // Elementary/Middle visual fraction bar & pie
    | 'linear_trajectory'    // Algebra slope-intercept / function coordinate graph
    | 'geometry_shapes'      // Geometric transformations, trig & spatial reasoning
    | 'number_line'          // Elementary/Middle number line & place value
    | 'svg_custom';          // Custom SVG demonstration
  visualConfig?: Record<string, any>;
  caption: string;
  interactiveControls?: boolean;
}

export interface CurriculumLesson {
  id: string;
  topicId: string;
  grade: number;
  title: string;
  standard: GeorgiaStandard;
  objectives: string[];
  scenes: LessonScene[];
  takeaways: string[];
  quiz: QuizData;
  gameId?: string;
  xpReward: number;
}

export interface CurriculumTopic {
  id: string;
  grade: number;
  stage: SchoolStage;
  title: string;
  domain: string;
  standardCode: string;
  description: string;
  icon: string;
  xpReward: number;
  lessons: CurriculumLesson[];
}

export interface GradeCurriculum {
  grade: number;
  gradeName: string;
  stage: SchoolStage;
  description: string;
  topics: CurriculumTopic[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface StudentProgress {
  studentId: string;
  studentName: string;
  grade: number;
  xp: number;
  stars: number;
  level: number;
  levelTitle: string;
  streakDays: number;
  completedLessons: string[];
  completedQuizzes: {
    topicId: string;
    score: number;
    total: number;
    timestamp: string;
  }[];
  completedGames: {
    gameId: string;
    score: number;
    stars: number;
    timestamp: string;
  }[];
  unlockedBadges: string[];
  recentActivities: {
    id: string;
    type: 'lesson' | 'quiz' | 'game' | 'tutor';
    title: string;
    grade: number;
    xpEarned: number;
    timestamp: string;
  }[];
}