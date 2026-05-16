import React, { useState, useEffect } from 'react';
import { CHARS } from '../chars';
import { S } from '../styles';
import { useAuth } from '../context/AuthContext';
import app from '../firebase';
import { getDatabase, ref, set } from 'firebase/database';

// Datos de desafíos disponibles
const CHALLENGES = [
  { id: 1, name: 'Desafío Semanal Elite', steps: 10000, days: 7, entry: 50000, pool: 2400000, active: true, type: 'semanal' },
  { id: 2, name: 'Caminata del fin de semana', steps: 8000, days: 3, entry: 20000, pool: 440000, active: true, type: 'corto' },
  { id: 3, name: 'Maratonista 30 días', steps: 12000, days: 30, entry: 100000, pool: 1500000, active: true, type: 'largo' },
  { id: 4, name: 'Sprint Diario', steps: 5000, days: 1, entry: 10000, pool: 200000, active: true, type: 'diario' },
  { id: 5, name: 'Ultra Caminante', steps: 20000, days: 14, entry: 80000, pool: 1800000, active: true, type: 'extra' },
];

// Datos del equipo actual para guerra de equipos
const TEAM_STATS = {
  nico: { wins: 847, losses: 312, emoji: '🎖️', streak: 5 },
  nahue: { wins: 723, losses: 290, emoji: '⚡', streak: 3 },
  stephie: { wins: 801, losses: 298, emoji: '💋', streak: 7 },
  mia: { wins: 765, losses: 301, emoji: '🌸', streak: 4 },
};

// Helper para formato de tiempo
function formatTime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${mins}m`;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

export default function Home() {
  const [balance, setBalance] = useState(profile?.balance ?? 50000);

  // Keep balance in sync with profile changes
  useEffect(() => {
    if (profile?.balance !== undefined) {
      setBalance(profile.balance);
    }
  }, [profile?.balance]);
  const [lives, setLives] = useState(3);
  // Extra lives per type (shield, boost, heal)
  const [extraLives, setExtraLives] = useState({ shield: 0, boost: 0, heal: 0 });
  const [joinedChallenges, setJoinedChallenges] = useState([]);
  const [selectedChar, setSelectedChar] = useState(null);
  const [timeLeft, setTimeLeft] = useState(86400 * 4); // 4 días de ejemplo
  const [showSuccess, setShowSuccess] = useState(false);
  const { user, profile, updateProfile } = useAuth();

  // Timer de cuenta regresiva
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Verificar si hay vidas extra disponibles
  const checkExtraLives = () => {
    if (lives < 5) {
      setLives(l => l + 1);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

    // Purchase extra life (shield, boost, heal)
  const purchaseLife = (type) => {
    const cost = 20000;
    const totalExtra = Object.values(extraLives).reduce((a,b) => a + b, 0);
    if (balance < cost) {
      alert('❌ No tenés suficientes $RAZON para comprar vida extra.');
      return;
    }
    if (totalExtra >= 3) {
      alert('❌ Ya alcanzaste el límite de 3 vidas extra por desafío.');
      return;
    }
    if (extraLives[type] >= 3) {
      alert('❌ No puedes comprar más de 3 vidas de este tipo.');
      return;
    }
    setBalance(b => b - cost);
    setExtraLives(prev => ({...prev, [type]: prev[type] + 1 }));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1500);
  };

  const joinChallenge = async (challenge) => {
    if (joinedChallenges.includes(challenge.id)) {
      alert('Ya estás inscrito en este desafío.');
      return;
    }
    if (balance < challenge.entry) {
      alert('❌ No tenés suficientes $RAZON. Necesitás ' + challenge.entry.toLocaleString() + ' $RAZON.');
      return;
    }
    // Update local balance
    setBalance(b => b - challenge.entry);
    // Persist to Firebase using username as key
    if (profile?.username) {
      const db = getDatabase(app);
      const profileRef = ref(db, `profiles/${profile.username}`);
      const updated = {
        ...profile,
        balance: (profile?.balance ?? balance) - challenge.entry,
        challenges: [...(profile?.challenges ?? []), challenge.id],
      };
      await set(profileRef, updated);
      updateProfile({ balance: updated.balance, challenges: updated.challenges });
    }
    setJoinedChallenges(j => [...j, challenge.id]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const activeChallenge = CHALLENGES[0];

  return (
    <div style={{minHeight:'100vh',background:S.bg,fontFamily:'Inter,sans-serif',color:S.txt,paddingBottom:80}}>
      {/* SUCCESS TOAST */}
      {showSuccess && (
        <div style={{
          position: 'fixed',top:20,left:50,right:50,zIndex:200,
          background:'rgba(102,187,106,.9)',borderRadius:12,padding:14,
          textAlign:'center',fontWeight:700,color:S.bg,fontSize:'.9rem',
          animation:'fadeIn 0.3s ease'
        }}>
          ✅ ¡Te uniste al desafío!
        </div>
      )}

      {/* HEADER */}
      <header style={{background:S.card,borderBottom:`1px solid ${S.border}`,padding:'10px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:36,height:36,border:`2px solid ${S.gold}`,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem'}}>👤</div>
          <div>
            <div style={{fontWeight:800,color:'#29b6f6',fontSize:'1.1rem'}}>Tenía Razón</div>
            <div style={{fontSize:'.6rem',color:S.muted}}>Mateo • usuario</div>
          </div>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          {/* Vidas Extra */}
          <div style={{background:'rgba(239,83,80,.1)',border:`1px solid rgba(239,83,80,.2)`,borderRadius:20,padding:'5px 10px',display:'flex',alignItems:'center',gap:5}}>
            <span style={{fontSize:'1rem'}}>❤️</span>
            <span style={{fontWeight:800,color:'#ef5350',fontSize:'.85rem'}}>{lives}</span>
            <button
              onClick={checkExtraLives}
              style={{background:'none',border:'none',color:'#ef5350',cursor:'pointer',fontSize:'.75rem',fontWeight:700,padding:0}}
              title="Reclamar vidas extra"
            >
              +
            </button>
          </div>
          {/* Balance */}
          <div style={{background:'rgba(41,182,246,.08)',border:`1px solid rgba(41,182,246,.2)`,borderRadius:20,padding:'5px 12px',display:'flex',alignItems:'center',gap:6}}>
            <span style={{fontSize:'.85rem',fontWeight:700,color:'#29b6f6'}}>{balance.toLocaleString('es-AR')}</span>
            <span style={{fontSize:'.6rem',color:S.muted}}>$RAZON</span>
          </div>
        </div>
      </header>
      {/* Purchase extra lives */}
      <section style={{padding: '0 14px 14px'}}>
        <div style={{fontWeight:700,fontSize:'.9rem',marginBottom:8,display:'flex',alignItems:'center',gap:6}}>
          <span>💎 Comprar Vidas Extra</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
          {['shield','boost','heal'].map(type => (
            <div key={type} style={{background:S.card,border:`1px solid ${S.border}`,borderRadius:10,padding:10,textAlign:'center'}}>
              <div style={{fontSize:'1.2rem',marginBottom:4}}>{type.charAt(0).toUpperCase()+type.slice(1)}</div>
              <div style={{fontSize:'.68rem',color:S.muted,marginBottom:6}}>Cost: 20k $RAZON</div>
              <button
                onClick={() => purchaseLife(type)}
                style={{background:'#29b6f6',color:S.bg,border:'none',borderRadius:6,padding:'6px 0',fontWeight:700,fontSize:'.75rem',cursor: extraLives[type] >= 3 ? 'not-allowed' : 'pointer',opacity: extraLives[type] >= 3 ? 0.5 : 1}}
              >
                {extraLives[type] >= 3 ? 'Máx' : 'Comprar'}
              </button>
              <div style={{marginTop:4,fontSize:'.68rem',color:S.muted}}>{extraLives[type]}/3</div>
            </div>
          ))}
        </div>
      </section>

      {/* HAPPENING NOW */}
      <section style={{padding:14}}>
        <div style={{background:'linear-gradient(135deg,#0a1a2e,#0d2540)',border:`1px solid rgba(41,182,246,.3)`,borderRadius:20,padding:18,marginBottom:14,position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,right:0,width:120,height:120,background:'radial-gradient(circle,rgba(41,182,246,.1) 0%,transparent 70%)',borderRadius:'50%'}} />
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
            <div>
              <div style={{fontSize:'.72rem',color:'#29b6f6',marginBottom:3,display:'flex',alignItems:'center',gap:6}}>
                <span style={{width:8,height:8,background:'#ef5350',borderRadius:'50%',display:'inline-block',animation:'pulse 2s infinite'}} />
                HAPPENING NOW
              </div>
              <div style={{fontWeight:800,fontSize:'1.15rem',lineHeight:1.2}}>{activeChallenge.name}</div>
              <div style={{fontSize:'.72rem',color:S.muted,marginTop:2}}>
                {activeChallenge.steps.toLocaleString()} pasos × {activeChallenge.days} días
              </div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontWeight:800,fontSize:'2rem',color:S.gold,lineHeight:1}}>
                {Math.round(activeChallenge.pool/1000)}k
              </div>
              <div style={{fontSize:'.62rem',color:S.muted}}>$RAZON</div>
              <div style={{fontSize:'.62rem',color:S.muted}}>≈ ${(activeChallenge.pool/10).toLocaleString()} ARS</div>
            </div>
          </div>

          {/* Timer */}
          <div style={{background:'rgba(0,0,0,.2)',borderRadius:10,padding:10,marginBottom:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{fontSize:'.7rem',color:S.muted}}>⏱️ Tiempo restante</div>
            <div style={{fontWeight:800,fontSize:'.9rem',color:'#29b6f6'}}>{formatTime(timeLeft)}</div>
          </div>

          {/* Progreso */}
          <div style={{marginBottom:12}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
              <span style={{fontSize:'.68rem',color:S.muted}}>Progreso semanal</span>
              <span style={{fontSize:'.68rem',color:'#29b6f6',fontWeight:600}}>6.2/10k pasos</span>
            </div>
            <div style={{background:'rgba(0,0,0,.3)',borderRadius:6,height:8,overflow:'hidden'}}>
              <div style={{width:'62%',height:'100%',background:'linear-gradient(90deg,#29b6f6,#66bb6a)',borderRadius:6,transition:'width 0.3s'}} />
            </div>
          </div>

          {/* Botón Unirse */}
          <button
            onClick={() => joinChallenge(activeChallenge)}
            style={{
              width:'100%',
              background: joinedChallenges.includes(activeChallenge.id) ? '#66bb6a' : '#29b6f6',
              color: joinedChallenges.includes(activeChallenge.id) ? '#fff' : S.bg,
              border: 'none',
              borderRadius: 12,
              padding: 14,
              fontWeight: 800,
              fontSize: '1rem',
              cursor: joinedChallenges.includes(activeChallenge.id) ? 'default' : 'pointer',
            }}
          >
            {joinedChallenges.includes(activeChallenge.id) ? '✅ INSCRITO' : `UNIRME — ${activeChallenge.entry.toLocaleString()} $RAZON`}
          </button>
          {joinedChallenges.includes(activeChallenge.id) && (
            <div style={{textAlign:'center',marginTop:8,fontSize:'.68rem',color:S.muted}}>
              Ya estás participando. ¡Vamos! 💪
            </div>
          )}
        </div>
      </section>

      {/* DESAFÍOS DISPONIBLES */}
      <section style={{padding: '0 14px 14px'}}>
        <div style={{fontWeight:700,fontSize:'1rem',marginBottom:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span>🏆 Desafíos</span>
          <span style={{fontSize:'.7rem',color:S.muted}}>{joinedChallenges.length}/{CHALLENGES.length} inscritos</span>
        </div>
        <div style={{display:'flex',gap:10,overflowX:'auto',paddingBottom:8}}>
          {CHALLENGES.filter(c => c.active).map(c => (
            <div key={c.id} style={{
              minWidth:180,
              background: joinedChallenges.includes(c.id) ? 'rgba(102,187,106,.1)' : S.card,
              border: `1px solid ${joinedChallenges.includes(c.id) ? 'rgba(102,187,106,.3)' : S.border}`,
              borderRadius: 16,
              padding: 14,
            }}>
              <div style={{fontWeight:700,fontSize:'.85rem',marginBottom:6}}>{c.name}</div>
              <div style={{fontSize:'.65rem',color:S.muted,marginBottom:8}}>
                {c.steps.toLocaleString()} pasos × {c.days}d
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                <span style={{fontWeight:700,color:S.gold,fontSize:'.8rem'}}>
                  {Math.round(c.pool/1000)}k
                </span>
                <span style={{fontSize:'.6rem',color:S.muted}}>${c.entry.toLocaleString()}</span>
              </div>
              <button
                onClick={() => joinChallenge(c)}
                style={{
                  width:'100%',
                  background: joinedChallenges.includes(c.id) ? 'rgba(102,187,106,.3)' : '#29b6f6',
                  color: joinedChallenges.includes(c.id) ? S.bg : S.bg,
                  border: 'none',
                  borderRadius: 8,
                  padding: 8,
                  fontWeight: 700,
                  fontSize: '.75rem',
                  cursor: joinedChallenges.includes(c.id) ? 'default' : 'pointer',
                }}
              >
                {joinedChallenges.includes(c.id) ? '✅ Hecho' : 'UNIRSE'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* GUERRA DE EQUIPOS */}
      <section style={{padding: '0 14px 14px'}}>
        <div style={{fontWeight:700,fontSize:'1rem',marginBottom:12}}>
          ⚔️ Guerra de Equipos — Esta semana
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>
          {Object.entries(CHARS).map(([key, c]) => {
            const stats = TEAM_STATS[key];
            const isSelected = selectedChar === key;
            const winRate = Math.round((stats.wins / (stats.wins + stats.losses)) * 100);
            return (
              <div
                key={key}
                onClick={() => setSelectedChar(key === selectedChar ? null : key)}
                style={{
                  background: isSelected ? `rgba(${hexToRgb(c.color)},.15)` : S.card,
                  border: `2px solid ${isSelected ? c.color : S.border}`,
                  borderRadius: 16,
                  padding: 14,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'center',
                }}
              >
                <div style={{fontSize:'2.2rem',marginBottom:6}}>{c.emoji}</div>
                <div style={{fontWeight:800,fontSize:'1rem',color:c.color,marginBottom:4}}>{c.name}</div>
                <div style={{fontSize:'.68rem',color:S.muted,marginBottom:8,lineHeight:1.3}}>{c.desc}</div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:4,marginBottom:8}}>
                  <div style={{background:S.bg,borderRadius:6,padding:4}}>
                    <div style={{fontWeight:700,fontSize:'.75rem',color:c.color}}>{stats.wins}</div>
                    <div style={{fontSize:'.55rem',color:S.muted}}>Ganadas</div>
                  </div>
                  <div style={{background:S.bg,borderRadius:6,padding:4}}>
                    <div style={{fontWeight:700,fontSize:'.75rem',color:S.gold}}>{winRate}%</div>
                    <div style={{fontSize:'.55rem',color:S.muted}}>Win rate</div>
                  </div>
                  <div style={{background:S.bg,borderRadius:6,padding:4}}>
                    <div style={{fontWeight:700,fontSize:'.75rem',color:'#ef5350'}}>{stats.streak}</div>
                    <div style={{fontSize:'.55rem',color:S.muted}}>Racha</div>
                  </div>
                </div>
                {/* Frase del personaje */}
                <div style={{fontSize:'.65rem',color:S.muted,fontStyle:'italic',marginBottom:6}}>
                  "{c.frases[0]}"
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedChar(key);
                    setLives(l => Math.min(l + 1, 5));
                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 1500);
                  }}
                  style={{
                    width:'100%',
                    background: isSelected ? c.color : 'rgba(255,255,255,.05)',
                    color: isSelected ? S.bg : S.txt,
                    border: `1px solid ${isSelected ? c.color : S.border}`,
                    borderRadius: 8,
                    padding: 8,
                    fontWeight: 700,
                    fontSize: '.72rem',
                    cursor: 'pointer',
                  }}
                >
                  {isSelected ? '✅ Equipo Seleccionado' : 'Elegir Equipo'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* INFO DE VIDA EXTRA */}
      <section style={{padding: '0 14px 14px'}}>
        <div style={{
          background:'rgba(239,83,80,.05)',
          border:`1px solid rgba(239,83,80,.15)`,
          borderRadius:16,
          padding:14,
        }}>
          <div style={{fontWeight:700,fontSize:'.9rem',marginBottom:8,display:'flex',alignItems:'center',gap:6}}>
            <span>❤️</span> Vidas Extra
          </div>
          <div style={{display:'flex',gap:4,marginBottom:8}}>
            {[1,2,3,4,5].map(i => (
              <div key={i} style={{
                width:36,height:36,borderRadius:10,
                background: i <= lives ? 'rgba(239,83,80,.2)' : 'rgba(255,255,255,.03)',
                border: `1px solid ${i <= lives ? '#ef5350' : S.border}`,
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:'1.1rem',
              }}>
                {i <= lives ? '❤️' : '🖤'}
              </div>
            ))}
          </div>
          <div style={{fontSize:'.68rem',color:S.muted,lineHeight:1.5}}>
            Las vidas te protegen de penalizaciones. ¡Se pueden ganar completando desafíos o eligiendo equipo!
          </div>
        </div>
      </section>

      {/* ELEMENTOS INLINE */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// Helper para convertir hex a rgb
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : '255,255,255';
}
