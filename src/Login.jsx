import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { S } from './styles'; // We'll create a styles helper later

export default function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleEnter = () => {
    if (!username) return;
    login(username);
    navigate('/chars');
  };

  return (
    <div style={{minHeight:'100vh',background:S.bg,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24,fontFamily:'Inter,sans-serif',color:S.txt}}>
      <div style={{fontSize:'4rem',marginBottom:8,animation:'float 3s ease-in-out infinite'}}>🏆</div>
      <div style={{fontWeight:900,fontSize:'2.4rem',color:'#29b6f6',letterSpacing:-1}}>Tenía Razón</div>
      <div style={{fontSize:'.72rem',color:S.muted,letterSpacing:4,marginBottom:32}}>LA APP QUE TE LO DEMUESTRA</div>
      <div style={{background:S.card,border:`1px solid ${S.border}`,borderRadius:20,padding:28,width:'100%',maxWidth:360}}>
        <label style={{fontSize:'.68rem',color:S.muted,letterSpacing:2,display:'block',marginBottom:8}}>USUARIO</label>
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Tu usuario"
          onKeyDown={e=>e.key==='Enter'&&handleEnter()}
          style={{width:'100%',background:S.bg,border:`1px solid ${S.border}`,borderRadius:10,padding:'13px 16px',color:S.txt,marginBottom:12,fontSize:'.95rem',outline:'none',boxSizing:'border-box'}}/>
        <label style={{fontSize:'.68rem',color:S.muted,letterSpacing:2,display:'block',marginBottom:8}}>CONTRASEÑA</label>
        <input type="password" placeholder="donata2026"
          onKeyDown={e=>e.key==='Enter'&&handleEnter()}
          style={{width:'100%',background:S.bg,border:`1px solid ${S.border}`,borderRadius:10,padding:'13px 16px',color:S.txt,marginBottom:16,fontSize:'.95rem',outline:'none',boxSizing:'border-box'}}/>
        <button onClick={handleEnter}
          style={{width:'100%',background:'#29b6f6',color:S.bg,border:'none',borderRadius:12,padding:14,fontWeight:800,fontSize:'1.1rem',cursor:'pointer',marginBottom:10}}>
          ENTRAR
        </button>
        <button onClick={() => {
            if (!username) { alert('Poné un usuario'); return; }
            // For demo creation: set balance to 50000 via context after login
            login(username);
            navigate('/chars');
          }}
          style={{width:'100%',background:S.card2,color:S.txt,border:`1px solid ${S.border}`,borderRadius:12,padding:14,fontWeight:600,fontSize:'.88rem',cursor:'pointer'}}>
          CREAR CUENTA → 🎁 50.000 $RAZON gratis
        </button>
      </div>
      <div style={{marginTop:16,fontSize:'.75rem',color:S.muted,background:'rgba(41,182,246,.07)',border:'1px solid rgba(41,182,246,.15)',borderRadius:10,padding:'8px 16px'}}>
        💰 $240.000 ARS repartidos esta semana · 1.247 jugando ahora
      </div>
    </div>
  );
}
