'use client';
import ChatBox from '@/components/ChatBox';
import LanguageToggle from '@/components/LanguageToggle';
import { useState } from 'react';

export default function Home() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">शिक्षक सहायक</h1>
        <p className="text-xl text-gray-600">AI Classroom Assistant | बोलें या टाइप करें</p>
        <LanguageToggle lang={lang} onChange={setLang} />
      </header>
      <ChatBox lang={lang} />
    </main>
  );
}

