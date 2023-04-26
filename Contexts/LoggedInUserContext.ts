import React from 'react'
import IUser from '../api/Models/User'
const LoggedInUserContext= React.createContext<IUser>(null);
export const LoggedInUserProvider= LoggedInUserContext.Provider
export default LoggedInUserContext