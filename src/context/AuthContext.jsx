import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase';
import { db } from '../firebase';
import { ref, set, update, onValue } from 'firebase/database';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login manual con username (para el flujo actual) – ahora persiste en Firebase
  const login = async (userData) => {
    // userData puede ser { username } o { username, character }
    setUser(userData);
    const newProfile = {
      username: userData.username,
      character: userData.character || null,
      balance: 50000, // bono inicial
    };
    setProfile(newProfile);
    // Guardar en Realtime Database bajo la clave del nombre de usuario
    const profileRef = ref(db, `profiles/${userData.username}`);
    await set(profileRef, newProfile);
  };

  // Actualiza el perfil tanto en estado local como en Firebase
  const updateProfile = async (updates) => {
    if (!profile?.username) return;
    const profileRef = ref(db, `profiles/${profile.username}`);
    const updated = { ...profile, ...updates };
    await update(profileRef, updates);
    setProfile(updated);
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
  };

  // Google Sign In (lo dejamos por si después lo usamos)
  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error('Google sign-in error', e);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Sign-out error', e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        login,
        updateProfile,
        logout,
        signIn,
        signOut: signOutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);