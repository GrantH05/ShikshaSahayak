'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
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
        background: 'white',
        padding: '3rem',
        borderRadius: '2rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        width: '100%',
        maxWidth: '450px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            👨‍🏫 शिक्षक सहायक
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
            अपने शिक्षक खाते से लॉगिन करें
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '1rem',
            marginBottom: '1.5rem',
            borderLeft: '4px solid #dc2626'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teacher@school.com"
              required
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: '2px solid #e5e7eb',
                borderRadius: '1rem',
                fontSize: '1rem',
                transition: 'all 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
              disabled={loading}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: '2px solid #e5e7eb',
                borderRadius: '1rem',
                fontSize: '1rem',
                transition: 'all 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
              disabled={loading}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              type="submit"
              disabled={loading || !email || !password}
              style={{
                padding: '1.25rem',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white',
                border: 'none',
                borderRadius: '1rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
                opacity: loading || !email || !password ? 0.6 : 1,
                boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)',
                transition: 'all 0.2s'
              }}
            >
              {loading ? '⏳ लॉगिन हो रहा है...' : 'लॉगिन करें'}
            </button>
            
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '1rem', fontSize: '0.95rem' }}>
              <strong>डेमो अकाउंट:</strong><br/>
              teacher@school.com / 123456
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

