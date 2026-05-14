import React, { createContext, useContext, useState } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import app from './firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  // Placeholder login – replace with real auth as needed
  const login = (username) => {
    const uid = btoa(username); // simple stable uid for demo
    setUser({ uid, username });
    // Load or create profile in Realtime DB
    const db = getDatabase(app);
    const profileRef = ref(db, `profiles/${uid}`);
    onValue(profileRef, snap => {
      if (snap.exists()) setProfile(snap.val());
      else {
        const init = { balance: 50000, char: null };
        set(profileRef, init);
        setProfile(init);
      }
    }, { onlyOnce: true });
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
  };

  const updateProfile = (updates) => {
    if (!user) return;
    const db = getDatabase(app);
    const profileRef = ref(db, `profiles/${user.uid}`);
    set(profileRef, { ...profile, ...updates });
    setProfile(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ user, profile, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
