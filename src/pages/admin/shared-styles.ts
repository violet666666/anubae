import type { CSSProperties } from 'react';

export const cardStyle: CSSProperties = {
  backgroundColor: '#111111',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '16px',
};

export const inputStyle: CSSProperties = {
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

export const labelStyle: CSSProperties = {
  color: '#999',
  fontSize: '0.875rem',
  marginBottom: '6px',
  display: 'block',
};

export const primaryBtn: CSSProperties = {
  backgroundColor: '#80f0ff',
  color: '#000',
  fontWeight: 700,
  borderRadius: '10px',
  padding: '12px 20px',
  border: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
};

export const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = '#80f0ff';
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(128,240,255,0.1)';
};

export const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
  e.currentTarget.style.boxShadow = 'none';
};
