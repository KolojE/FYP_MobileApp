import React from 'react'
import IUser from '../api/Models/User';

export const AuthContext = React.createContext<{
    loggedInUser: IUser,
    setLoggedInUser: React.Dispatch<React.SetStateAction<IUser>> | null
}>({
    loggedInUser: null,
    setLoggedInUser: null,
});

export const AuthProvider = AuthContext.Provider;

export default AuthContext