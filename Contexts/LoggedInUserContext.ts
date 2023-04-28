import React from 'react'

export const AuthContext= React.createContext({
    loggedInUser:null,
    setLoggedInUser:null,
});

export const AuthProvider = AuthContext.Provider;

export default AuthContext