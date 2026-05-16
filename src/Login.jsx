import React, { useState } from 'react';
import { useAuth } from './context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    login({ username: username.trim() });
    navigate('/chars');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0f14',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '360px',
        background: '#11171f',
        borderRadius: '20px',
        padding: '32px 24px',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#fff', marginBottom: '8px' }}>Tenía Razón</h1>
        <p style={{ color: '#888', marginBottom: '32px' }}>
          Ingresá tu nombre para empezar
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tu nombre"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: '16px',
              borderRadius: '12px',
              border: '1px solid #333',
              background: '#1a2129',
              color: '#fff',
              marginBottom: '16px',
              outline: 'none'
            }}
          />

          <button
            type="submit"
            disabled={!username.trim()}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              fontWeight: '700',
              borderRadius: '12px',
              border: 'none',
              background: username.trim() ? '#ffd600' : '#444',
              color: '#111',
              cursor: username.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}