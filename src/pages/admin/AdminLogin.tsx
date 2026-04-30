import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Email atau password salah.');
      setLoading(false);
    } else {
      navigate('/admin/panel', { replace: true });
    }
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: '#1a1a1a',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    padding: '12px 16px',
    color: '#ffffff',
    width: '100%',
    outline: 'none',
    fontSize: '0.95rem',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  };

  const labelStyle: React.CSSProperties = {
    color: '#999',
    fontSize: '0.875rem',
    marginBottom: '6px',
    display: 'block',
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = '#80f0ff';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(128,240,255,0.1)';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: '#111111',
          border: '1px solid rgba(128,240,255,0.15)',
          borderRadius: '20px',
          padding: '40px',
        }}
      >
        <img
          src="/anubae-logo2.png"
          alt="Anubae Organizer"
          className="h-12 w-auto object-contain mx-auto mb-8"
        />

        <h1
          className="text-white font-bold text-center text-2xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Admin Panel
        </h1>
        <p className="text-sm text-center mb-8" style={{ color: '#666' }}>
          Masuk untuk mengelola website
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" style={labelStyle}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="admin@anubae.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{ ...inputStyle, paddingRight: '44px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: '#999',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full font-bold transition-transform hover:scale-[1.01]"
            style={{
              backgroundColor: loading ? 'rgba(128,240,255,0.7)' : '#80f0ff',
              color: '#000',
              borderRadius: '10px',
              padding: '14px',
              fontSize: '1rem',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = 'rgba(128,240,255,0.85)';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#80f0ff';
            }}
          >
            {loading ? (
              <div
                className="animate-spin"
                style={{
                  width: '18px',
                  height: '18px',
                  border: '2px solid rgba(0,0,0,0.25)',
                  borderTopColor: '#000',
                  borderRadius: '50%',
                }}
              />
            ) : (
              <>
                <LogIn size={18} />
                Masuk
              </>
            )}
          </button>

          {error && (
            <p className="text-sm text-center" style={{ color: '#ff6b6b' }}>
              {error}
            </p>
          )}
        </form>
      </div>

      <p
        className="text-xs text-center"
        style={{ color: '#444', marginTop: '24px' }}
      >
        Hanya untuk admin resmi Anubae Organizer
      </p>
    </div>
  );
};

export default AdminLogin;
