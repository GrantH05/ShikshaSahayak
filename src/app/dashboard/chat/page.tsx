'use client';
import { useState, useEffect, useRef } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!question.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      question: question.trim(),
      answer: '',
      language,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMessage.question,
          language
        })
      });

      const data = await response.json();
      
      if (data.answer) {
        setMessages(prev => prev.map((msg: any) =>
          msg.id === userMessage.id
            ? { ...msg, answer: data.answer }
            : msg
        ));
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #e0e7ff 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            🤖 AI शिक्षक सहायक
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#64748b' }}>
            {language === 'hi' ? 'प्रश्न पूछें, तुरंत उत्तर पाएं!' : 'Ask questions, get instant answers!'}
          </p>
          
          {/* Language Toggle */}
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button
              onClick={() => setLanguage('en')}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '1.5rem',
                fontWeight: '600',
                border: '2px solid #3b82f6',
                background: language === 'en' ? '#3b82f6' : 'white',
                color: language === 'en' ? 'white' : '#3b82f6',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e: any) => { e.target.style.transform = 'scale(1.05)'; }}
              onMouseOut={(e: any) => { e.target.style.transform = 'scale(1)'; }}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '1.5rem',
                fontWeight: '600',
                border: '2px solid #8b5cf6',
                background: language === 'hi' ? '#8b5cf6' : 'white',
                color: language === 'hi' ? 'white' : '#8b5cf6',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e: any) => { e.target.style.transform = 'scale(1.05)'; }}
              onMouseOut={(e: any) => { e.target.style.transform = 'scale(1)'; }}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '2rem',
          padding: '2rem',
          background: 'white',
          borderRadius: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          minHeight: '400px',
          maxHeight: '60vh'
        }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#94a3b8' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💬</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {language === 'hi' ? 'कोई बातचीत शुरू करें' : 'Start a conversation'}
              </h3>
              <p>{language === 'hi' ? 'यहाँ अपना पहला प्रश्न लिखें' : 'Write your first question here'}</p>
            </div>
          ) : (
            messages.map((msg: any) => (
              <div key={msg.id} style={{ marginBottom: '2rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    background: '#3b82f6',
                    color: 'white',
                    padding: '1rem 1.5rem',
                    borderRadius: '1.5rem 1.5rem 1.5rem 0.5rem',
                    maxWidth: '70%',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                  }}>
                    <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>आपका प्रश्न:</p>
                    <p>{msg.question}</p>
                  </div>
                </div>
                
                {msg.answer && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                      color: 'white',
                      padding: '1.5rem 2rem',
                      borderRadius: '1.5rem 1.5rem 0.5rem 1.5rem',
                      maxWidth: '75%',
                      boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {msg.answer}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{
                background: '#f1f5f9',
                padding: '1.5rem 2rem',
                borderRadius: '1.5rem 1.5rem 0.5rem 1.5rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    border: '3px solid #e2e8f0',
                    borderTop: '3px solid #8b5cf6',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <span style={{ color: '#64748b' }}>
                    {language === 'hi' ? 'AI सोच रहा है...' : 'AI is thinking...'}
                </span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '2rem',
          boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={
                  language === 'hi'
                    ? "अपना प्रश्न यहाँ लिखें... (Enter दबाएं भेजने के लिए)"
                    : "Type your question here... (Press Enter to send)"
                }
                style={{
                  flex: 1,
                  padding: '1.25rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '1.5rem',
                  resize: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  minHeight: '100px',
                  fontFamily: 'inherit'
                }}
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !question.trim()}
                style={{
                  padding: '1.25rem 2rem',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  fontWeight: '600',
                  borderRadius: '1.5rem',
                  border: 'none',
                  cursor: loading || !question.trim() ? 'not-allowed' : 'pointer',
                  opacity: loading || !question.trim() ? 0.6 : 1,
                  boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)',
                  transition: 'all 0.2s'
                }}
              >
                {loading ? '⏳' : 'भेजें'}
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}

