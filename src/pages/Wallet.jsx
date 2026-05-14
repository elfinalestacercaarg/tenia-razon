import React, { useState } from 'react';
import { S } from '../styles';
import { CHARS } from '../chars';

export default function Wallet() {
  const [balance, setBalance] = useState(50000);

  const cargar = () => {
    const amt = prompt('¿Cuántos ARS querés cargar? (mín $2.000)');
    const num = parseFloat(amt);
    if (num && num >= 2000) {
      setBalance(b => b + num * 10);
      alert(`✅ +${(num * 10).toLocaleString()} $RAZON`);
    }
  };

  const retirar = () => {
    if (balance < 500000) {
      alert('Mínimo 500.000 $RAZON para retirar');
      return;
    }
    alert('💸 Retiro iniciado. 48hs hábiles.');
  };

  return (
    <div style={{minHeight:'100vh',background:S.bg,fontFamily:'Inter,sans-serif',color:S.txt,paddingBottom:80}}>
      {/* HEADER */}
      <header style={{background:S.card,borderBottom:`1px solid ${S.border}`,padding:'10px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{fontWeight:800,color:'#29b6f6',fontSize:'1.1rem'}}>Wallet</div>
        <div style={{background:'rgba(41,182,246,.08)',border:`11px solid rgba(41,182,246,.2)`,borderRadius:20,padding:'5px 12px',display:'flex',alignItems:'center',gap:6}}>
          <span style={{fontSize:'.85rem',fontWeight:700,color:'#29b6f6'}}>{balance.toLocaleString('es-AR')}</span>
          <span style={{fontSize:'.6rem',color:S.muted}}>$RAZON</span>
        </div>
      </header>

      <section style={{padding:14}}>
        <div style={{background:'linear-gradient(135deg,#0a1f35,#0d2540)',border:`1px solid rgba(41,182,246,.25)`,borderRadius:20,padding:22,marginBottom:14,textAlign:'center'}}>
          <div style={{fontSize:'.7rem',color:S.muted,letterSpacing:2,marginBottom:6}}>TU BALANCE</div>
          <div style={{fontWeight:800,fontSize:'2.6rem',color:'#29b6f6'}}>{balance.toLocaleString('es-AR')}</div>
          <div style={{fontWeight:600,color:'#29b6f6',marginBottom:4}}>$RAZON</div>
          <div style={{fontSize:'.82rem',color:S.muted}}>≈ ${(balance/10).toLocaleString('es-AR')} ARS</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:14}}>
            <button onClick={cargar} style={{background:'rgba(41,182,246,.1)',border:`1px solid rgba(41,182,246,.2)`,borderRadius:12,padding:11,color:'#29b6f6',fontWeight:600,fontSize:'.82rem',cursor:'pointer'}}>
              💳 Cargar MP
            </button>
            <button onClick={retirar} style={{background:'rgba(41,182,246,.1)',border:`1px solid rgba(41,182,246,.2)`,borderRadius:12,padding:11,color:'#29b6f6',fontWeight:600,fontSize:'.82rem',cursor:'pointer'}}>
              📤 Retirar
            </button>
          </div>
        </div>

        {/* Conversor rápido */}
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
      </section>
    </div>
  );
}
