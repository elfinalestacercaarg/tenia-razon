import React from 'react';
import { CHARS } from '../chars';
import { S } from '../styles';

// Simple static leaderboard – replace with real data later
const leaderboard = [
  { pos: '🥇', name: 'Facu_runner', char: 'nahue', points: '890k', steps: '98.4k' },
  { pos: '🥈', name: 'Mari_fit', char: 'stephie', points: '750k', steps: '87.2k' },
  { pos: '🥉', name: 'Tú', char: 'nico', points: '170k', steps: '52.1k' },
  { pos: '4', name: 'Rodri_cba', char: 'nico', points: '120k', steps: '41.8k' },
  { pos: '5', name: 'Pau_walk', char: 'mia', points: '95k', steps: '38.5k' },
];

export default function Ranking() {
  return (
    <div style={{minHeight:'100vh',background:S.bg,fontFamily:'Inter,sans-serif',color:S.txt,paddingBottom:80}}>
      {/* HEADER */}
      <header style={{background:S.card,borderBottom:`1px solid ${S.border}`,padding:'10px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{fontWeight:800,color:'#29b6f6',fontSize:'1.1rem'}}>Ranking</div>
      </header>

      <section style={{padding:14}}>
        <div style={{fontWeight:700,fontSize:'1rem',marginBottom:12}}>🏆 Ranking Global</div>
        <div style={{background:S.card,border:`1px solid ${S.border}`,borderRadius:16,padding:'0 14px'}}>
          {leaderboard.map((r,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'11px 0',borderBottom:i<leaderboard.length-1?`1px solid ${S.border}`:'none'}}>
              <div style={{fontWeight:800,fontSize:'1rem',width:26,textAlign:'center'}}>{r.pos}</div>
              <div style={{width:38,height:38,borderRadius:'50%',background:'rgba(41,182,246,.08)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem'}}>{CHARS[r.char].emoji}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:'.88rem',color:CHARS[r.char].color}}>{r.name}</div>
                <div style={{fontSize:'.7rem',color:S.muted}}>{r.steps} pasos · <span style={{color:CHARS[r.char].color}}>{CHARS[r.char].name}</span></div>
              </div>
              <div style={{fontWeight:700,color:S.gold,fontSize:'.9rem'}}>{r.points}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
