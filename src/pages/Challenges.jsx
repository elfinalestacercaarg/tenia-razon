import React from 'react';
import { CHARS } from '../chars';
import { S } from '../styles';

const challenges = [
  { name: 'Desafío Semanal Elite', steps: 10000, days: 7, entry: 50000, pool: 2400000 },
  { name: 'Caminata del fin de semana', steps: 8000, days: 3, entry: 20000, pool: 440000 },
  { name: 'Maratonista 30 días', steps: 12000, days: 30, entry: 100000, pool: 1500000 },
];

export default function Challenges() {
  return (
    <div style={{minHeight:'100vh',background:S.bg,fontFamily:'Inter,sans-serif',color:S.txt,paddingBottom:80}}>
      {/* HEADER */}
      <header style={{background:S.card,borderBottom:`1px solid ${S.border}`,padding:'10px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{fontWeight:800,color:'#29b6f6',fontSize:'1.1rem'}}>Desafíos</div>
      </header>

      <section style={{padding:14}}>
        {challenges.map((c, i) => (
          <div key={i} style={{background:S.card,border:`1px solid ${S.border}`,borderRadius:16,padding:16,marginBottom:12}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
              <div>
                <div style={{fontSize:'.7rem',color:'#29b6f6'}}>{c.steps.toLocaleString()} pasos × {c.days} días</div>
                <div style={{fontWeight:800,fontSize:'1rem'}}>{c.name}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontWeight:800,fontSize:'1.1rem',color:S.gold}}>{Math.round(c.pool/1000)}k</div>
                <div style={{fontSize:'.6rem',color:S.muted}}>$RAZON</div>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6,marginBottom:10}}>
              {[['Entrada',c.entry],['Jugando',Math.round(c.pool/50000)],['Días',c.days]].map(([label,value])=>(
                <div key={label} style={{background:S.card2,borderRadius:8,padding:7,textAlign:'center'}}>
                  <div style={{fontWeight:600,fontSize:'.85rem'}}>{typeof value==='number'?value.toLocaleString():value}</div>
                  <div style={{fontSize:'.6rem',color:S.muted}}>{label}</div>
                </div>
              ))}
            </div>
            <button style={{width:'100%',background:'#29b6f6',color:S.bg,border:'none',borderRadius:10,padding:12,fontWeight:700,fontSize:'.9rem',cursor:'pointer'}}>
              UNIRME — {Math.round(c.entry/1000)}k $RAZON
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
