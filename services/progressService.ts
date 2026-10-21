import { StudentProgress, AchievementBadge } from '../types';

const STORAGE_KEY = 'mathgalaxy_student_progress_v1';

export const ALL_BADGES: AchievementBadge[] = [
  {
    id: 'first_launch',
    title: 'First Orbit',
    description: 'Complete your first interactive math lesson in Math Galaxy.',
    icon: '🚀'
  },
  {
    id: 'calculus_pioneer',
    title: 'Accumulation Master',
    description: 'Master Riemann sums and the intuition of integral calculus.',
    icon: '🌌'
  },
  {
    id: 'quiz_ace',
    title: 'Stellar Perfection',
    description: 'Score 100% on any Georgia mathematics quiz.',
    icon: '⭐'
  },
  {
    id: 'game_champion',
    title: 'Galactic Champion',
    description: 'Earn 3 stars in any interactive mathematics challenge game.',
    icon: '🏆'
  },
  {
    id: 'algebra_pilot',
    title: 'Trajectory Navigator',
    description: 'Master linear functions, slopes, and trajectory equations.',
    icon: '📐'
  },
  {
    id: 'fraction_pro',
    title: 'Fraction Commander',
    description: 'Equate visual fractions across planetary fuel cores.',
    icon: '🍰'
  }
];

export const getLevelTitle = (level: number): string => {
  if (level <= 1) return 'Space Cadet';
  if (level === 2) return 'Stellar Explorer';
  if (level === 3) return 'Orbital Navigator';
  if (level === 4) return 'Cosmic Voyager';
  if (level === 5) return 'Galactic Pioneer';
  if (level === 6) return 'Nebula Specialist';
  if (level === 7) return 'Quantum Pilot';
  if (level === 8) return 'Calculus Commander';
  return 'Cosmic Math Master';
};

export const calculateLevel = (xp: number): { level: number; title: string; nextLevelXp: number; currentLevelBaseXp: number } => {
  // 250 XP per level
  const xpPerLevel = 250;
  const level = Math.max(1, Math.floor(xp / xpPerLevel) + 1);
  const currentLevelBaseXp = (level - 1) * xpPerLevel;
  const nextLevelXp = level * xpPerLevel;
  return {
    level,
    title: getLevelTitle(level),
    nextLevelXp,
    currentLevelBaseXp
  };
};

const createInitialProgress = (): StudentProgress => {
  return {
    studentId: 'student-' + Math.random().toString(36).substring(2, 9),
    studentName: 'Astro Cadet',
    grade: 12, // Defaults to Grade 12 for rich demonstration of calculus & progression
    xp: 0,
    stars: 0,
    level: 1,
    levelTitle: 'Space Cadet',
    streakDays: 1,
    completedLessons: [],
    completedQuizzes: [],
    completedGames: [],
    unlockedBadges: [],
    recentActivities: []
  };
};

/**
 * Notify parent learning platform if running inside an iframe
 */
const notifyParentPlatform = (eventType: string, data: any) => {
  try {
    if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
      window.parent.postMessage(
        {
          source: 'MATH_GALAXY',
          type: eventType,
          payload: data,
          timestamp: new Date().toISOString()
        },
        '*'
      );
    }
  } catch (err) {
    console.warn('Failed to dispatch postMessage to parent frame:', err);
  }
};

export const getStudentProgress = (): StudentProgress => {
  if (typeof window === 'undefined') return createInitialProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = createInitialProgress();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed: StudentProgress = JSON.parse(raw);
    const { level, title } = calculateLevel(parsed.xp || 0);
    parsed.level = level;
    parsed.levelTitle = title;
    return parsed;
  } catch (e) {
    console.error('Error loading progress from storage:', e);
    return createInitialProgress();
  }
};

export const saveStudentProgress = (progress: StudentProgress): void => {
  if (typeof window === 'undefined') return;
  try {
    const { level, title } = calculateLevel(progress.xp);
    progress.level = level;
    progress.levelTitle = title;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    notifyParentPlatform('PROGRESS_UPDATED', progress);
  } catch (e) {
    console.error('Error saving student progress:', e);
  }
};

export const updateStudentGrade = (grade: number): StudentProgress => {
  const current = getStudentProgress();
  current.grade = grade;
  saveStudentProgress(current);
  return current;
};

export const updateStudentName = (name: string): StudentProgress => {
  const current = getStudentProgress();
  current.studentName = name;
  saveStudentProgress(current);
  return current;
};

export const awardLessonCompletion = (
  lessonId: string, 
  grade: number, 
  title: string, 
  xpEarned: number
): { progress: StudentProgress; newBadges: AchievementBadge[] } => {
  const current = getStudentProgress();
  const alreadyCompleted = current.completedLessons.includes(lessonId);
  const actualXp = alreadyCompleted ? Math.floor(xpEarned * 0.2) : xpEarned;

  if (!alreadyCompleted) {
    current.completedLessons.push(lessonId);
  }

  current.xp += actualXp;
  current.stars += 3;

  const newBadges: AchievementBadge[] = [];

  // Check badges
  if (!current.unlockedBadges.includes('first_launch')) {
    current.unlockedBadges.push('first_launch');
    const b = ALL_BADGES.find(x => x.id === 'first_launch');
    if (b) newBadges.push(b);
  }

  if (lessonId.includes('riemann') && !current.unlockedBadges.includes('calculus_pioneer')) {
    current.unlockedBadges.push('calculus_pioneer');
    const b = ALL_BADGES.find(x => x.id === 'calculus_pioneer');
    if (b) newBadges.push(b);
  }

  current.recentActivities.unshift({
    id: 'act-' + Date.now(),
    type: 'lesson',
    title: `Completed: ${title}`,
    grade,
    xpEarned: actualXp,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  current.recentActivities = current.recentActivities.slice(0, 10);
  saveStudentProgress(current);

  notifyParentPlatform('LESSON_COMPLETED', {
    lessonId,
    title,
    grade,
    xpEarned: actualXp,
    totalXp: current.xp,
    level: current.level
  });

  return { progress: current, newBadges };
};

export const awardQuizCompletion = (
  topicId: string, 
  score: number, 
  total: number, 
  xpEarned: number
): { progress: StudentProgress; newBadges: AchievementBadge[] } => {
  const current = getStudentProgress();
  const percentage = Math.round((score / total) * 100);

  current.completedQuizzes.push({
    topicId,
    score,
    total,
    timestamp: new Date().toISOString()
  });

  current.xp += xpEarned;
  if (score >= total) {
    current.stars += 3;
  } else if (score >= total / 2) {
    current.stars += 2;
  } else {
    current.stars += 1;
  }

  const newBadges: AchievementBadge[] = [];

  if (score === total && !current.unlockedBadges.includes('quiz_ace')) {
    current.unlockedBadges.push('quiz_ace');
    const b = ALL_BADGES.find(x => x.id === 'quiz_ace');
    if (b) newBadges.push(b);
  }

  current.recentActivities.unshift({
    id: 'act-' + Date.now(),
    type: 'quiz',
    title: `Quiz: ${topicId} (${score}/${total})`,
    grade: current.grade,
    xpEarned,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  current.recentActivities = current.recentActivities.slice(0, 10);
  saveStudentProgress(current);

  notifyParentPlatform('QUIZ_COMPLETED', {
    topicId,
    score,
    total,
    percentage,
    xpEarned
  });

  return { progress: current, newBadges };
};

export const awardGameCompletion = (
  gameId: string, 
  score: number, 
  starsEarned: number, 
  xpEarned: number
): { progress: StudentProgress; newBadges: AchievementBadge[] } => {
  const current = getStudentProgress();

  current.completedGames.push({
    gameId,
    score,
    stars: starsEarned,
    timestamp: new Date().toISOString()
  });

  current.xp += xpEarned;
  current.stars += starsEarned;

  const newBadges: AchievementBadge[] = [];

  if (starsEarned >= 3 && !current.unlockedBadges.includes('game_champion')) {
    current.unlockedBadges.push('game_champion');
    const b = ALL_BADGES.find(x => x.id === 'game_champion');
    if (b) newBadges.push(b);
  }

  if (gameId === 'game-orbit-slope' && !current.unlockedBadges.includes('algebra_pilot')) {
    current.unlockedBadges.push('algebra_pilot');
    const b = ALL_BADGES.find(x => x.id === 'algebra_pilot');
    if (b) newBadges.push(b);
  }

  if (gameId === 'game-fraction-blaster' && !current.unlockedBadges.includes('fraction_pro')) {
    current.unlockedBadges.push('fraction_pro');
    const b = ALL_BADGES.find(x => x.id === 'fraction_pro');
    if (b) newBadges.push(b);
  }

  current.recentActivities.unshift({
    id: 'act-' + Date.now(),
    type: 'game',
    title: `Game: ${gameId} (${starsEarned} Stars)`,
    grade: current.grade,
    xpEarned,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  current.recentActivities = current.recentActivities.slice(0, 10);
  saveStudentProgress(current);

  notifyParentPlatform('GAME_COMPLETED', {
    gameId,
    score,
    stars: starsEarned,
    xpEarned
  });

  return { progress: current, newBadges };
};
