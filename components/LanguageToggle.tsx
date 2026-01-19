'use client';
import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

interface Props {
  lang: 'en' | 'hi';
  onChange: (lang: 'en' | 'hi') => void;
}

export default function LanguageToggle({ lang, onChange }: Props) {
  return (
    <div className="flex mt-4 space-x-2 bg-white/50 rounded-full p-1 max-w-max mx-auto">
      <button
        onClick={() => onChange('en')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center space-x-1 ${
          lang === 'en'
            ? 'bg-blue-500 text-white shadow-lg'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Globe className="w-4 h-4" />
        <span>EN</span>
      </button>
      <button
        onClick={() => onChange('hi')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center space-x-1 ${
          lang === 'hi'
            ? 'bg-orange-500 text-white shadow-lg'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span>हिं</span>
      </button>
    </div>
  );
}

