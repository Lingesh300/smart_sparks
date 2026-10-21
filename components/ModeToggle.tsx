import React from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';
import { AppMode } from '../types';

interface ModeToggleProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ mode, setMode }) => {
  return (
    <div className="flex items-center justify-center p-4 absolute top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="bg-slate-900/90 backdrop-blur-md shadow-xl rounded-full p-1.5 flex gap-1 pointer-events-auto border border-indigo-900/50">
        <button
          onClick={() => setMode('diary')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
            mode === 'diary'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen size={15} />
          Study Notes
        </button>
        <button
          onClick={() => setMode('tutor')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
            mode === 'tutor'
              ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <GraduationCap size={15} />
          Cosmo AI Tutor 🦉
        </button>
      </div>
    </div>
  );
};

export default ModeToggle;