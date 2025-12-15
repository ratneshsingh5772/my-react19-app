import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContextInstance';

// --- STEP 2: Create the Provider Component ---
export const AuthProvider = ({ children }) => {
  // 'user' will be null if not logged in, or an object if logged in
  const [user, setUser] = useState(null);

  // Mock Login Function (In real apps, this would fetch from an API)
  const login = (username) => {
    setUser({ name: username, role: 'Admin' });
  };

  // Logout Function
  const logout = () => {
    setUser(null);
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
  }), [user]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};