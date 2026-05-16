import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import { CHARS } from './chars';
import { S } from './styles';

export default function CharSelect() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [selectedChar, setSelectedChar] = useState(null);

  const handleEnter = () => {
    if (!username || !selectedChar) {
      if (!username) alert('Ingresá tu usuario');
      if (!selectedChar) alert('Selecciona un personaje');
      return;
    }
    login({ username: username.trim(), character: selectedChar });
    navigate('/home');
  };

  return (
    <div style={{minHeight:'100vh',background:S.bg,fontFamily:'Inter,sans-serif',color:S.txt,padding:24}}>
      <div style={{textAlign:'center',marginBottom:24}}>
        <div style={{fontSize:'3rem',marginBottom:8}}>👤</div>
        <div style={{fontWeight:800,fontSize:'1.8rem',color:'#29b6f6'}}>
          Elegí tu personaje
        </div>
        <div style={{fontSize:'.85rem',color:S.muted,marginTop:4}}>
          Este será tu guía en los desafíos
        </div>
      </div>

      <div style={{background:S.card,borderRadius:16,padding:20}}>
        <div style={{fontWeight:700,fontSize:'1rem',marginBottom:16,color:'#29b6f6'}}>
          ¿Con quién querés andar?
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:12}}>
          {Object.entries(CHARS).map(([key, char]) => (
            <div
              key={key}
              onClick={() => setSelectedChar(key)}
              style={{
                background: selectedChar === key ? `rgba(${hexToRgb(char.color)},.15)` : S.card2,
                border: `2px solid ${selectedChar === key ? char.color : S.border}`,
                borderRadius: 14,
                padding: 16,
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'center',
              }}
            >
              <div style={{fontSize:'2.5rem',marginBottom:8}}>{char.emoji}</div>
              <div style={{fontWeight:800,fontSize:'1rem',color:char.color,marginBottom:4}}>
                {char.name}
              </div>
              <div style={{fontSize:'.7rem',color:S.muted,lineHeight:1.3}}>
                {char.desc}
              </div>
              {selectedChar === key && (
                <div style={{width:20,height:20,background:char.color,borderRadius:'50%',margin:'8px auto 0'}}>
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{marginTop:20}}>
        <div style={{fontWeight:600,fontSize:'.9rem',marginBottom:8,display:'flex',alignItems:'center',gap:6}}>
          <span>📝</span> Tu usuario
        </div>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Tu usuario o email"
          style={{
            width: '100%',
            background: S.bg,
            border: `1px solid ${S.border}`,
            borderRadius: 10,
            padding: '13px 16px',
            color: S.txt,
            fontSize: '.95rem',
            outline: 'none',
            boxSizing: 'border-box'
          }}
          onKeyDown={e => e.key === 'Enter' && handleEnter()}
        />
      </div>

      <button
        onClick={handleEnter}
        style={{
          width: '100%',
          marginTop: 24,
          background: '#29b6f6',
          color: S.bg,
          border: 'none',
          borderRadius: 12,
          padding: 14,
          fontWeight: 800,
          fontSize: '1rem',
          cursor: (!username || !selectedChar) ? 'not-allowed' : 'pointer',
          opacity: (!username || !selectedChar) ? 0.6 : 1
        }}
      >
        {selectedChar ? `Continuar con ${CHARS[selectedChar].name}` : 'Selecciona un personaje'}
      </button>

      <div style={{marginTop:16, fontSize:'.75rem', color:S.muted, textAlign:'center'}}>
        Después de elegir, recibirás 50.000 $RAZON iniciales
      </div>
    </div>
  );
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : '255,255,255';
}