import React, { useState } from 'react';
import { CHARS } from '../chars';
import { S } from '../styles';

export default function Home() {
  const headerAvatar = '👤';
  const [balance, setBalance] = useState(50000);

  const joinChallenge = (cost) => {
    if (balance < cost) {
      alert('❌ No tenés suficientes $RAZON.');
      return;
    }
    setBalance(b => b - cost);
    alert('✅ Te uniste al desafío.');
  };

  return (
    <div style={{minHeight:'100vh',background:S.bg,fontFamily:'Inter,sans-serif',color:S.txt,paddingBottom:80}}>
      {/* HEADER */}
      <header style={{background:S.card,borderBottom:`1px solid ${S.border}`,padding:'10px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:36,height:36,border:`2px solid ${S.gold}`,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem'}}>{headerAvatar}</div>
          <div>
            <div style={{fontWeight:800,color:'#29b6f6',fontSize:'1.1rem'}}>Tenía Razón</div>
            <div style={{fontSize:'.6rem',color:S.muted}}>Mateo • usuario</div>
          </div>
        </div>
        <div style={{background:'rgba(41,182,246,.08)',border:`1px solid rgba(41,182,246,.2)`,borderRadius:20,padding:'5px 12px',display:'flex',alignItems:'center',gap:6}}>
          <span style={{fontSize:'.85rem',fontWeight:700,color:'#29b6f6'}}>{balance.toLocaleString('es-AR')}</span>
          <span style={{fontSize:'.6rem',color:S.muted}}>$RAZON</span>
        </div>
      </header>

      {/* HAPPENING NOW */}
      <section style={{padding:14}}>
        <div style={{background:'#0a1a2e',border:`1px solid rgba(41,182,246,.25)`,borderRadius:20,padding:18,marginBottom:14}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
            <div>
              <div style={{fontSize:'.72rem',color:'#29b6f6',marginBottom:3}}>🔴 HAPPENING NOW</div>
              <div style={{fontWeight:800,fontSize:'1.15rem'}}>Desafío Semanal Elite</div>
              <div style={{fontSize:'.72rem',color:S.muted,marginTop:2}}>10.000 pasos × 7 días</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontWeight:800,fontSize:'2rem',color:S.gold,lineHeight:1}}>2.4M</div>
              <div style={{fontSize:'.62rem',color:S.muted}}>$RAZON</div>
              <div style={{fontSize:'.62rem',color:S.muted}}>≈ $240.000 ARS</div>
            </div>
          </div>
          <button
            onClick={() => joinChallenge(50000)}
            style={{width:'100%',background:'#29b6f6',color:S.bg,border:'none',borderRadius:12,padding:14,fontWeight:800,fontSize:'1rem',cursor:'pointer'}}>
            UNIRME — 50k $RAZON · $5.000 ARS
          </button>
        </div>
      </section>

      {/* TEAM WAR */}
      <section style={{padding:14}}>
        <div style={{fontWeight:700,fontSize:'1rem',marginBottom:10}}>⚔️ Guerra de Equipos — Esta semana</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
          {Object.entries(CHARS).map(([key, c]) => (
            <div key={key} style={{background:S.card,border:`1px solid ${S.border}`,borderRadius:14,padding:'10px 6px',textAlign:'center'}}>
              <div style={{fontSize:'1.5rem'}}>{c.emoji}</div>
              <div style={{fontSize:'.7rem',fontWeight:800,color:c.color,marginTop:4}}>{c.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM NAV (kept for completeness, actual navigation handled by App layout) */}
    </div>
  );
}
