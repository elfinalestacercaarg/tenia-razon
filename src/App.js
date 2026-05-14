import React, { useState } from 'react';

const CHARS = {
  nico: { emoji:'🎖️', color:'#ffd600', name:'NICO', desc:'Coach militar. Sin filtro. Sin excusas.', frases:['Dale, salí a caminar. Hagamos plata.','No me vengas con cuentos. Salí ya.','El cansancio es temporal. Perder la plata no.'] },
  nahue: { emoji:'⚡', color:'#ef5350', name:'NAHUE', desc:'Explosión de energía. Creativo e inteligente.', frases:['¡Vamos! ¡Sos una máquina!','¡Cada paso es un $RAZON más en tu bolsillo!','¡Hoy rompemos el récord!'] },
  stephie: { emoji:'💋', color:'#f06292', name:'STEPHIE', desc:'Refinada, elegante y coqueta.', frases:['Darling, las chicas que caminan tienen otro porte.','Un cuerpo trabajado es el mejor accesorio.','Caminá hoy y mañana te ponés ese vestido.'] },
  mia: { emoji:'🌸', color:'#66bb6a', name:'MÍA', desc:'Inteligente, buena y siempre del lado tuyo.', frases:['¡Hoy es un día perfecto para sumar pasos!','Cada paso que dás es una decisión inteligente.','No tenés que ser perfecta. Solo intentarlo.'] },
};

const S = {
  bg:'#080c10', card:'#0f1520', card2:'#131c2a',
  border:'#1e2d40', gold:'#ffd600', danger:'#ef5350',
  success:'#66bb6a', txt:'#e8f4fd', muted:'#5a7a99',
};

export default function App() {
  const [screen, setScreen] = useState('login');
  const [username, setUsername] = useState('');
  const [char, setChar] = useState(null);
  const [balance, setBalance] = useState(50000);
  const [tab, setTab] = useState('home');

  const ch = char ? CHARS[char] : null;
  const frase = ch ? ch.frases[Math.floor(Math.random()*ch.frases.length)] : '';

  // ── LOGIN ──
  if (screen === 'login') return (
    <div style={{minHeight:'100vh',background:S.bg,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24,fontFamily:'Inter,sans-serif',color:S.txt}}>
      <div style={{fontSize:'4rem',marginBottom:8,animation:'float 3s ease-in-out infinite'}}>🏆</div>
      <div style={{fontWeight:900,fontSize:'2.4rem',color:'#29b6f6',letterSpacing:-1}}>Tenía Razón</div>
      <div style={{fontSize:'.72rem',color:S.muted,letterSpacing:4,marginBottom:32}}>LA APP QUE TE LO DEMUESTRA</div>
      <div style={{background:S.card,border:`1px solid ${S.border}`,borderRadius:20,padding:28,width:'100%',maxWidth:360}}>
        <label style={{fontSize:'.68rem',color:S.muted,letterSpacing:2,display:'block',marginBottom:8}}>USUARIO</label>
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Tu usuario"
          onKeyDown={e=>e.key==='Enter'&&username&&setScreen('chars')}
          style={{width:'100%',background:S.bg,border:`1px solid ${S.border}`,borderRadius:10,padding:'13px 16px',color:S.txt,marginBottom:12,fontSize:'.95rem',outline:'none',boxSizing:'border-box'}}/>
        <label style={{fontSize:'.68rem',color:S.muted,letterSpacing:2,display:'block',marginBottom:8}}>CONTRASEÑA</label>
        <input type="password" placeholder="donata2026"
          onKeyDown={e=>e.key==='Enter'&&username&&setScreen('chars')}
          style={{width:'100%',background:S.bg,border:`1px solid ${S.border}`,borderRadius:10,padding:'13px 16px',color:S.txt,marginBottom:16,fontSize:'.95rem',outline:'none',boxSizing:'border-box'}}/>
        <button onClick={()=>username&&setScreen('chars')}
          style={{width:'100%',background:'#29b6f6',color:S.bg,border:'none',borderRadius:12,padding:14,fontWeight:800,fontSize:'1.1rem',cursor:'pointer',marginBottom:10}}>
          ENTRAR
        </button>
        <button onClick={()=>{if(!username){alert('Poné un usuario');return;}setBalance(50000);setScreen('chars');}}
          style={{width:'100%',background:S.card2,color:S.txt,border:`1px solid ${S.border}`,borderRadius:12,padding:14,fontWeight:600,fontSize:'.88rem',cursor:'pointer'}}>
          CREAR CUENTA → 🎁 50.000 $RAZON gratis
        </button>
      </div>
      <div style={{marginTop:16,fontSize:'.75rem',color:S.muted,background:'rgba(41,182,246,.07)',border:'1px solid rgba(41,182,246,.15)',borderRadius:10,padding:'8px 16px'}}>
        💰 $240.000 ARS repartidos esta semana · 1.247 jugando ahora
      </div>
    </div>
  );

  // ── ELEGIR PERSONAJE ──
  if (screen === 'chars') return (
    <div style={{minHeight:'100vh',background:S.bg,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24,fontFamily:'Inter,sans-serif',color:S.txt}}>
      <div style={{fontWeight:800,fontSize:'1.5rem',marginBottom:6}}>Elegí tu equipo</div>
      <div style={{fontSize:'.82rem',color:S.muted,marginBottom:24,textAlign:'center'}}>Tu coach te acompaña en cada desafío.<br/>Los equipos compiten entre sí 👊</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,width:'100%',maxWidth:400}}>
        {Object.entries(CHARS).map(([k,c])=>(
          <div key={k} onClick={()=>setChar(k)}
            style={{background:char===k?`rgba(${k==='nico'?'255,214,0':k==='nahue'?'239,83,80':k==='stephie'?'240,98,146':'102,187,106'},.1)`:S.card,
              border:`2px solid ${char===k?c.color:S.border}`,borderRadius:20,padding:20,textAlign:'center',cursor:'pointer',transition:'all .2s',position:'relative'}}>
            <div style={{fontSize:'2.5rem',marginBottom:6}}>{c.emoji}</div>
            <div style={{fontWeight:800,color:c.color,fontSize:'1rem'}}>{c.name}</div>
            <div style={{fontSize:'.68rem',color:S.muted,marginTop:4,lineHeight:1.4}}>{c.desc}</div>
            {char===k && <div style={{position:'absolute',top:8,right:8,fontSize:'.55rem',fontWeight:700,background:c.color,color:S.bg,padding:'2px 6px',borderRadius:10}}>✓ ELEGIDO</div>}
          </div>
        ))}
      </div>
      {char && (
        <button onClick={()=>setScreen('app')}
          style={{marginTop:20,width:'100%',maxWidth:400,background:CHARS[char].color,color:S.bg,border:'none',borderRadius:14,padding:15,fontWeight:800,fontSize:'1.15rem',cursor:'pointer'}}>
          UNIRME AL EQUIPO {CHARS[char].name} ▸
        </button>
      )}
    </div>
  );

  // ── APP PRINCIPAL ──
  return (
    <div style={{minHeight:'100vh',background:S.bg,fontFamily:'Inter,sans-serif',color:S.txt,paddingBottom:80}}>

      {/* HEADER */}
      <div style={{background:S.card,borderBottom:`1px solid ${S.border}`,padding:'10px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:36,height:36,border:`2px solid ${ch.color}`,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem'}}>{ch.emoji}</div>
          <div>
            <div style={{fontWeight:800,color:'#29b6f6',fontSize:'1.1rem'}}>Tenía Razón</div>
            <div style={{fontSize:'.6rem',color:ch.color}}>Equipo {ch.name} · {username}</div>
          </div>
        </div>
        <div style={{background:'rgba(41,182,246,.08)',border:'1px solid rgba(41,182,246,.2)',borderRadius:20,padding:'5px 12px',display:'flex',alignItems:'center',gap:6}}>
          <span style={{fontSize:'.85rem',fontWeight:700,color:'#29b6f6'}}>{balance.toLocaleString('es-AR')}</span>
          <span style={{fontSize:'.6rem',color:S.muted}}>$RAZON</span>
        </div>
      </div>

      {/* HOME */}
      {tab==='home' && (
        <div style={{padding:14}}>
          {/* Coach bubble */}
          <div style={{background:'rgba(41,182,246,.06)',border:'1px solid rgba(41,182,246,.15)',borderRadius:16,padding:'12px 14px',marginBottom:14,display:'flex',gap:10,alignItems:'flex-start'}}>
            <span style={{fontSize:'1.5rem'}}>{ch.emoji}</span>
            <div style={{fontSize:'.82rem',color:S.muted,lineHeight:1.5}}><b style={{color:ch.color}}>{ch.name}:</b> {frase}</div>
          </div>

          {/* Conversor rápido */}
          <div style={{background:'rgba(41,182,246,.05)',border:'1px solid rgba(41,182,246,.12)',borderRadius:12,padding:'10px 14px',marginBottom:14,display:'flex',alignItems:'center',gap:8}}>
            <span style={{fontSize:'.75rem',color:S.muted}}>ARS $</span>
            <input type="number" placeholder="Ej: 5000" onChange={e=>document.getElementById('conv-res').textContent=(parseFloat(e.target.value)||0)*10+' $RAZON'}
              style={{flex:1,background:'none',border:'none',color:S.txt,fontSize:'.95rem',outline:'none'}}/>
            <span style={{fontSize:'.75rem',color:S.muted}}>=</span>
            <span id="conv-res" style={{fontWeight:700,color:S.gold,fontSize:'.95rem'}}>— $RAZON</span>
          </div>

          {/* Challenge destacado */}
          <div style={{background:'#0a1a2e',border:'1px solid rgba(41,182,246,.25)',borderRadius:20,padding:18,marginBottom:14}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
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
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:14}}>
              {[['50k $RAZON','Entrada'],['48','Jugando'],['5 días','Quedan']].map(([v,l])=>(
                <div key={l} style={{background:'rgba(0,0,0,.3)',borderRadius:10,padding:9,textAlign:'center'}}>
                  <div style={{fontWeight:700,fontSize:'.88rem'}}>{v}</div>
                  <div style={{fontSize:'.6rem',color:S.muted}}>{l}</div>
                </div>
              ))}
            </div>
            <button onClick={()=>{
              if(balance<50000){alert('❌ No tenés suficientes $RAZON. Cargá plata en Wallet.');return;}
              setBalance(b=>b-50000);
              alert('✅ ¡Te uniste! A caminar 🚶');
            }} style={{width:'100%',background:'#29b6f6',color:S.bg,border:'none',borderRadius:12,padding:14,fontWeight:800,fontSize:'1rem',cursor:'pointer'}}>
              UNIRME — 50k $RAZON · $5.000 ARS
            </button>
          </div>

          {/* Guerra de equipos */}
          <div style={{fontWeight:700,fontSize:'1rem',marginBottom:10}}>⚔️ Guerra de Equipos — Esta semana</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:16}}>
            {Object.entries(CHARS).map(([k,c])=>(
              <div key={k} style={{background:k===char?`rgba(${k==='nico'?'255,214,0':k==='nahue'?'239,83,80':k==='stephie'?'240,98,146':'102,187,106'},.1)`:S.card,border:`1px solid ${k===char?c.color:S.border}`,borderRadius:14,padding:'10px 6px',textAlign:'center'}}>
                <div style={{fontSize:'1.5rem'}}>{c.emoji}</div>
                <div style={{fontSize:'.7rem',fontWeight:700,color:c.color,marginTop:4}}>{c.name}</div>
                <div style={{fontSize:'.62rem',color:S.muted,marginTop:2}}>{k==='nahue'?'2.4M':k==='stephie'?'2.1M':k==='nico'?'1.8M':'1.6M'}</div>
              </div>
            ))}
          </div>

          {/* Amigos */}
          <div style={{fontWeight:700,fontSize:'1rem',marginBottom:10}}>👥 Amigos en acción</div>
          <div style={{background:S.card,border:`1px solid ${S.border}`,borderRadius:16,padding:'0 14px'}}>
            {[
              {n:'Nico',e:'⚡',t:'NAHUE',tc:'#ef5350',s:'✓ día 5/7 · 12.450 pasos',ok:true},
              {n:'Caro',e:'💋',t:'STEPHIE',tc:'#f06292',s:'⚠️ 8.200/10.000 pasos hoy',ok:null},
              {n:'Seba',e:'💀',t:'NICO',tc:'#ffd600',s:'✗ falló día 3 · perdió $5.000 ARS',ok:false},
            ].map((f,i)=>(
              <div key={f.n} style={{display:'flex',alignItems:'center',gap:10,padding:'11px 0',borderBottom:i<2?`1px solid ${S.border}`:'none'}}>
                <div style={{width:40,height:40,borderRadius:'50%',background:'rgba(41,182,246,.08)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem'}}>{f.e}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:'.88rem',display:'flex',alignItems:'center',gap:6}}>
                    {f.n}
                    <span style={{fontSize:'.62rem',background:`rgba(41,182,246,.1)`,color:f.tc,padding:'2px 6px',borderRadius:10}}>{f.t}</span>
                  </div>
                  <div style={{fontSize:'.72rem',color:S.muted,marginTop:2}}>{f.s}</div>
                </div>
                <div style={{fontWeight:700,fontSize:'.88rem',color:f.ok?S.success:f.ok===false?S.danger:S.gold}}>{f.ok?'+80k':f.ok===false?'💀':S.gold}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHALLENGES */}
      {tab==='challenges' && (
        <div style={{padding:14}}>
          <div style={{fontWeight:700,fontSize:'1rem',marginBottom:12}}>🔥 Desafíos activos</div>
          {[
            {n:'Desafío Semanal Elite',p:10000,d:7,e:50000,pool:2400000,part:48},
            {n:'Caminata del fin de semana',p:8000,d:3,e:20000,pool:440000,part:22},
            {n:'Maratonista 30 días',p:12000,d:30,e:100000,pool:1500000,part:15},
          ].map(c=>(
            <div key={c.n} style={{background:S.card,border:`1px solid ${S.border}`,borderRadius:16,padding:16,marginBottom:12}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
                <div>
                  <div style={{fontSize:'.7rem',color:'#29b6f6'}}>{c.p.toLocaleString()} pasos × {c.d} días</div>
                  <div style={{fontWeight:700,fontSize:'1rem'}}>{c.n}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontWeight:800,fontSize:'1.1rem',color:S.gold}}>{Math.round(c.pool/1000)}k</div>
                  <div style={{fontSize:'.6rem',color:S.muted}}>$RAZON</div>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6,marginBottom:10}}>
                {[[Math.round(c.e/1000)+'k','Entrada'],[c.part,'Jugando'],[c.d+'d','Días']].map(([v,l])=>(
                  <div key={l} style={{background:S.card2,borderRadius:8,padding:7,textAlign:'center'}}>
                    <div style={{fontWeight:600,fontSize:'.85rem'}}>{v}</div>
                    <div style={{fontSize:'.6rem',color:S.muted}}>{l}</div>
                  </div>
                ))}
              </div>
              <button onClick={()=>{
                if(balance<c.e){alert('❌ No tenés suficientes $RAZON');return;}
                setBalance(b=>b-c.e);alert(`✅ Unido a "${c.n}". ¡A caminar!`);
              }} style={{width:'100%',background:'#29b6f6',color:S.bg,border:'none',borderRadius:10,padding:12,fontWeight:700,fontSize:'.9rem',cursor:'pointer'}}>
                UNIRME — {Math.round(c.e/1000)}k $RAZON · ${(c.e/10).toLocaleString()} ARS
              </button>
            </div>
          ))}
        </div>
      )}

      {/* WALLET */}
      {tab==='wallet' && (
        <div style={{padding:14}}>
          <div style={{background:'linear-gradient(135deg,#0a1f35,#0d2540)',border:'1px solid rgba(41,182,246,.25)',borderRadius:20,padding:22,marginBottom:14,textAlign:'center'}}>
            <div style={{fontSize:'.7rem',color:S.muted,letterSpacing:2,marginBottom:6}}>TU BALANCE</div>
            <div style={{fontWeight:800,fontSize:'2.6rem',color:'#29b6f6'}}>{balance.toLocaleString('es-AR')}</div>
            <div style={{fontWeight:600,color:'#29b6f6',marginBottom:4}}>$RAZON</div>
            <div style={{fontSize:'.82rem',color:S.muted}}>≈ ${(balance/10).toLocaleString('es-AR')} ARS · ${(balance/10000).toFixed(2)} USD</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:14}}>
              <button onClick={()=>{const a=prompt('¿Cuántos ARS querés cargar?\n(mín $2.000)');if(a&&parseFloat(a)>=2000){setBalance(b=>b+parseFloat(a)*10);alert(`✅ +${(parseFloat(a)*10).toLocaleString()} $RAZON`);}}} style={{background:'rgba(41,182,246,.1)',border:'1px solid rgba(41,182,246,.2)',borderRadius:12,padding:11,color:'#29b6f6',fontWeight:600,fontSize:'.82rem',cursor:'pointer'}}>
                💳 Cargar MP
              </button>
              <button onClick={()=>{if(balance<500000){alert('Mínimo 500.000 $RAZON para retirar');}else{alert('💸 Retiro iniciado. 48hs hábiles.');}}} style={{background:'rgba(41,182,246,.1)',border:'1px solid rgba(41,182,246,.2)',borderRadius:12,padding:11,color:'#29b6f6',fontWeight:600,fontSize:'.82rem',cursor:'pointer'}}>
                📤 Retirar
              </button>
            </div>
          </div>
          {/* Conversor */}
          <div style={{fontWeight:700,marginBottom:10}}>💱 Conversor</div>
          <div style={{background:S.card2,borderRadius:12,padding:14,marginBottom:12}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
              <span style={{fontSize:'.72rem',color:S.muted,width:60}}>ARS $</span>
              <input type="number" placeholder="Ej: 10000" onChange={e=>document.getElementById('c1').textContent=(parseFloat(e.target.value)||0)*10+' $RAZON'}
                style={{flex:1,background:S.bg,border:`1px solid ${S.border}`,borderRadius:8,padding:'8px 12px',color:S.txt,fontSize:'.9rem',outline:'none'}}/>
              <span id="c1" style={{fontWeight:700,color:S.gold,fontSize:'.88rem',minWidth:80}}>— $RAZON</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:'.72rem',color:S.muted,width:60}}>$RAZON</span>
              <input type="number" placeholder="Ej: 50000" onChange={e=>document.getElementById('c2').textContent='$'+(parseFloat(e.target.value)||0)/10+' ARS'}
                style={{flex:1,background:S.bg,border:`1px solid ${S.border}`,borderRadius:8,padding:'8px 12px',color:S.txt,fontSize:'.9rem',outline:'none'}}/>
              <span id="c2" style={{fontWeight:700,color:S.gold,fontSize:'.88rem',minWidth:80}}>— ARS</span>
            </div>
            <div style={{fontSize:'.68rem',color:S.muted,textAlign:'center',marginTop:10}}>10 $RAZON = $1 ARS · 10.000 $RAZON = $1 USD</div>
          </div>
          {/* Historial */}
          <div style={{fontWeight:700,marginBottom:10}}>📊 Historial</div>
          <div style={{background:S.card,border:`1px solid ${S.border}`,borderRadius:16,padding:'0 14px'}}>
            {[
              {i:'🎁',d:'Bono bienvenida',f:'Hoy',a:'+50.000',ok:true},
              {i:'🏆',d:'Ganaste: Desafío 3 días',f:'Hace 5 días',a:'+120.000',ok:true},
              {i:'💀',d:'Perdiste: Desafío 7 días',f:'Hace 12 días',a:'-50.000',ok:false},
            ].map((t,i,arr)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'11px 0',borderBottom:i<arr.length-1?`1px solid ${S.border}`:'none'}}>
                <div style={{width:34,height:34,borderRadius:10,background:t.ok?'rgba(102,187,106,.12)':'rgba(239,83,80,.12)',display:'flex',alignItems:'center',justifyContent:'center'}}>{t.i}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:'.86rem',fontWeight:500}}>{t.d}</div>
                  <div style={{fontSize:'.7rem',color:S.muted}}>{t.f}</div>
                </div>
                <div style={{fontWeight:700,color:t.ok?S.success:S.danger}}>{t.a}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RANKING */}
      {tab==='ranking' && (
        <div style={{padding:14}}>
          <div style={{fontWeight:700,fontSize:'1rem',marginBottom:12}}>🏆 Ranking Global</div>
          <div style={{background:S.card,border:`1px solid ${S.border}`,borderRadius:16,padding:'0 14px'}}>
            {[
              {pos:'🥇',n:'Facu_runner',e:'⚡',t:'NAHUE',tc:'#ef5350',pts:'890k',steps:'98.4k'},
              {pos:'🥈',n:'Mari_fit',e:'💋',t:'STEPHIE',tc:'#f06292',pts:'750k',steps:'87.2k'},
              {pos:'🥉',n:username||'Vos',e:ch.emoji,t:ch.name,tc:ch.color,pts:'170k',steps:'52.1k'},
              {pos:'4',n:'Rodri_cba',e:'🎖️',t:'NICO',tc:'#ffd600',pts:'120k',steps:'41.8k'},
              {pos:'5',n:'Pau_walk',e:'🌸',t:'MÍA',tc:'#66bb6a',pts:'95k',steps:'38.5k'},
            ].map((r,i,arr)=>(
              <div key={r.n} style={{display:'flex',alignItems:'center',gap:10,padding:'11px 0',borderBottom:i<arr.length-1?`1px solid ${S.border}`:'none'}}>
                <div style={{fontWeight:800,fontSize:'1rem',width:26,textAlign:'center'}}>{r.pos}</div>
                <div style={{width:38,height:38,borderRadius:'50%',background:'rgba(41,182,246,.08)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem'}}>{r.e}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:'.88rem',color:r.n===username?ch.color:S.txt}}>{r.n}</div>
                  <div style={{fontSize:'.7rem',color:S.muted}}>{r.steps} pasos · <span style={{color:r.tc}}>{r.t}</span></div>
                </div>
                <div style={{fontWeight:700,color:S.gold,fontSize:'.9rem'}}>{r.pts}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COACH */}
      {tab==='coach' && (
        <div style={{padding:14,paddingBottom:140}}>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
            <div style={{fontSize:'2.5rem'}}>{ch.emoji}</div>
            <div>
              <div style={{fontWeight:800,fontSize:'1.1rem',color:ch.color}}>{ch.name}</div>
              <div style={{fontSize:'.72rem',color:S.muted}}>{ch.desc}</div>
            </div>
          </div>
          {ch.frases.map((f,i)=>(
            <div key={i} style={{background:S.card2,borderRadius:16,padding:'12px 14px',marginBottom:10,fontSize:'.86rem',lineHeight:1.5,color:S.muted,borderLeft:`3px solid ${ch.color}`}}>
              {ch.emoji} {f}
            </div>
          ))}
          <div style={{marginTop:16,background:S.card,border:`1px solid ${S.border}`,borderRadius:16,padding:14}}>
            <div style={{fontSize:'.78rem',color:S.muted,marginBottom:10}}>Preguntale algo a {ch.name}:</div>
            {['¿Cuánto puedo ganar?','Estoy cansado/a','Dame tips para caminar más'].map(q=>(
              <button key={q} onClick={()=>alert(`${ch.emoji} ${ch.name}: ${ch.frases[0]}`)}
                style={{display:'block',width:'100%',background:S.card2,border:`1px solid ${S.border}`,borderRadius:10,padding:'10px 14px',color:S.txt,fontSize:'.82rem',textAlign:'left',cursor:'pointer',marginBottom:8}}>
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* BOTTOM NAV */}
      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'rgba(8,12,16,.98)',borderTop:`1px solid ${S.border}`,display:'flex',alignItems:'center',padding:'8px 0',zIndex:100}}>
        {[
          {id:'home',icon:'🏠',label:'Inicio'},
          {id:'challenges',icon:'🏆',label:'Desafíos'},
          {id:'plus',icon:'➕',label:''},
          {id:'ranking',icon:'📊',label:'Ranking'},
          {id:'wallet',icon:'💰',label:'Wallet'},
        ].map(t=>(
          <button key={t.id} onClick={()=>t.id!=='plus'&&setTab(t.id)}
            style={{flex:1,background:'none',border:'none',display:'flex',flexDirection:'column',alignItems:'center',gap:3,cursor:'pointer',padding:'4px 0',color:tab===t.id?ch.color:S.muted,fontSize:'.55rem',fontWeight:tab===t.id?600:400}}>
            {t.id==='plus'
              ? <div style={{width:50,height:50,background:ch.color,borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem',color:S.bg,marginTop:-18,boxShadow:`0 4px 20px ${ch.color}50`}}>➕</div>
              : <><span style={{fontSize:'1.2rem'}}>{t.icon}</span><span>{t.label}</span></>
            }
          </button>
        ))}
      </div>
    </div>
  );
}