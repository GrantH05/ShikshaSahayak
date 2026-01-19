'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ✅ FIX: Wait for client before rendering dynamic content
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ FIX: Show loading until hydrated
  if (!isClient) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#f8fafc',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ fontSize: '2rem' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      display: 'flex' 
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '260px' : '70px',
        background: 'linear-gradient(180deg, #1e293b 0%, #334155 100%)',
        color: 'white',
        transition: 'all 0.3s ease',
        height: '100vh',
        position: 'fixed',
        zIndex: 100,
        overflow: 'hidden'
      }}>
        <div style={{ 
          padding: '2rem 1.5rem', 
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem'
        }}>
          <div style={{
            width: '50px', height: '50px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', fontWeight: 'bold'
          }}>
            👨‍🏫
          </div>
          {sidebarOpen && (
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>Sunita Kumari</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Primary Teacher</div>
            </div>
          )}
        </div>

        <nav style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link href="/dashboard" style={navStyle(true)}>📊 डैशबोर्ड</Link>
          <Link href="/dashboard/chat" style={navStyle()}>💬 AI चैट</Link>
          <Link href="/dashboard/history" style={navStyle()}>📚 इतिहास</Link>
          <Link href="/dashboard/profile" style={navStyle()}>👤 प्रोफाइल</Link>
        </nav>

        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer', padding: '0.75rem',
          background: 'rgba(255,255,255,0.1)', borderRadius: '50%'
        }} onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? '◀️' : '▶️'}
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        marginLeft: sidebarOpen ? '260px' : '70px',
        flex: 1,
        padding: '2rem',
        transition: 'margin-left 0.3s ease'
      }}>
        <div style={{
          background: 'white',
          padding: '1.5rem 2rem',
          borderRadius: '1.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e293b' }}>
              शिक्षक डैशबोर्ड
            </h1>
            <p style={{ color: '#64748b', marginTop: '0.25rem' }}>
              {/* ✅ FIX: Static date string */}
              19 जनवरी 2026 | सरल शिक्षण सहायक
            </p>
          </div>
          <button style={{
            padding: '0.75rem 1.5rem',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(239,68,68,0.3)'
          }} onClick={() => {
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            window.location.href = '/login';
          }}>
            🚪 लॉगआउट
          </button>
        </div>

        <div style={{ 
          background: 'white', 
          borderRadius: '1.5rem', 
          padding: '2rem', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          minHeight: '60vh'
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function navStyle(active = false) {
  return {
    padding: '1rem 1.5rem',
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    fontWeight: active ? '700' : '500',
    fontSize: '1rem',
    transition: 'all 0.2s',
    borderRadius: '0 1rem 1rem 0',
    margin: '0 0.5rem'
  };
}

