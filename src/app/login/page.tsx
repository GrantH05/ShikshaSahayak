'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LanguageToggle from '../../../components/LanguageToggle';
import { useLanguage } from '../../lib/language-context';

const translations = {
  en: {
    title: '👨‍🏫 Teacher Assistant',
    subtitle: 'Login with your teacher account',
    email: 'Email',
    emailPlaceholder: 'teacher@school.com',
    password: 'Password',
    login: 'Login',
    loggingIn: 'Logging in...',
    demoAccount: 'Demo Account:',
    demoEmail: 'teacher@school.com',
    demoPassword: '123456',
    error: {
      invalid: 'Invalid email or password',
      network: 'Network error. Please try again.',
      required: 'Email and password required'
    }
  },
  hi: {
    title: '👨‍🏫 शिक्षक सहायक',
    subtitle: 'अपने शिक्षक खाते से लॉगिन करें',
    email: 'ईमेल',
    emailPlaceholder: 'teacher@school.com',
    password: 'पासवर्ड',
    login: 'लॉगिन करें',
    loggingIn: 'लॉगिन हो रहा है...',
    demoAccount: 'डेमो अकाउंट:',
    demoEmail: 'teacher@school.com',
    demoPassword: '123456',
    error: {
      invalid: 'गलत ईमेल या पासवर्ड',
      network: 'नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।',
      required: 'ईमेल और पासवर्ड आवश्यक'
    }
  }
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError(t.error.required);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (data.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(data.error || t.error.invalid);
      }
    } catch (err) {
      setError(t.error.network);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '3rem 3.5rem',
        borderRadius: '2.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        width: '100%',
        maxWidth: '450px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{
            fontSize: '2.75rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            lineHeight: '1.2'
          }}>
            {t.title}
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.15rem', margin: 0 }}>
            {t.subtitle}
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <LanguageToggle />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '1.25rem',
            borderRadius: '1rem',
            marginBottom: '2rem',
            borderLeft: '5px solid #dc2626',
            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.15)'
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.75rem', 
              fontWeight: '600', 
              color: '#374151',
              fontSize: '1.05rem'
            }}>
              {t.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '1.25rem 1.5rem',
                border: '2px solid #e5e7eb',
                borderRadius: '1.25rem',
                fontSize: '1.05rem',
                transition: 'all 0.25s',
                outline: 'none',
                background: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.75rem', 
              fontWeight: '600', 
              color: '#374151',
              fontSize: '1.05rem'
            }}>
              {t.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '1.25rem 1.5rem',
                border: '2px solid #e5e7eb',
                borderRadius: '1.25rem',
                fontSize: '1.05rem',
                transition: 'all 0.25s',
                outline: 'none',
                background: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email || !password}
            style={{
              padding: '1.5rem 2rem',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: 'white',
              border: 'none',
              borderRadius: '1.25rem',
              fontSize: '1.15rem',
              fontWeight: '700',
              cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
              boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)',
              transition: 'all 0.3s ease',
              opacity: loading || !email || !password ? 0.7 : 1,
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              if (!loading && email && password) {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(59, 130, 246, 0.5)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.4)';
            }}
          >
            {loading ? (
              <>
                <span style={{ marginRight: '1rem' }}>⏳</span>
                {t.loggingIn}
              </>
            ) : (
              t.login
            )}
          </button>
        </form>

        {/* Demo Info */}
        <div style={{ 
          marginTop: '2rem', 
          padding: '1.5rem', 
          background: 'rgba(59, 130, 246, 0.1)', 
          borderRadius: '1.25rem', 
          textAlign: 'center',
          border: '2px dashed rgba(59, 130, 246, 0.3)'
        }}>
          <div style={{ fontWeight: '700', fontSize: '1.1rem', color: '#1e40af', marginBottom: '0.5rem' }}>
            {t.demoAccount}
          </div>
          <div style={{ color: '#1e40af', marginBottom: '0.25rem' }}>
            📧 {t.demoEmail}
          </div>
          <div style={{ color: '#1e40af' }}>
            🔑 {t.demoPassword}
          </div>
        </div>
      </div>
    </div>
  );
}

