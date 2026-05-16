import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';   // ← CAMBIADO
import Login from './Login';
import CharSelect from './CharSelect';
import Home from './pages/Home';
import Challenges from './pages/Challenges';
import Wallet from './pages/Wallet';
import Ranking from './pages/Ranking';
import { S } from './styles';

// Simple guard for authenticated routes
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
};

// Layout that renders the page content and the bottom navigation
const Layout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Inicio' },
    { id: 'challenges', icon: '🏆', label: 'Desafíos' },
    { id: 'plus', icon: '➕', label: '' },
    { id: 'ranking', icon: '📊', label: 'Ranking' },
    { id: 'wallet', icon: '💰', label: 'Wallet' },
  ];

  return (
    <>
      <Outlet />
      <nav style={{position:'fixed',bottom:0,left:0,right:0,background:'rgba(8,12,16,.98)',borderTop:`1px solid ${S.border}`,display:'flex',alignItems:'center',padding:'8px 0',zIndex:100}}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => t.id !== 'plus' && navigate(`/${t.id}`)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              cursor: 'pointer',
              padding: '4px 0',
              color: pathname.startsWith(`/${t.id}`) ? '#ffd600' : S.muted,
              fontSize: '.55rem',
            }}
          >
            {t.id === 'plus' ? (
              <div style={{width:50,height:50,background:'#ffd600',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem',color:S.bg,marginTop:-18,boxShadow:'0 4px 20px #ffd60050'}}>{t.icon}</div>
            ) : (
              <><span style={{fontSize:'1.2rem'}}>{t.icon}</span><span>{t.label}</span></>
            )}
          </button>
        ))}
      </nav>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/chars" element={<CharSelect />} />
          <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route path="/home" element={<Home />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;