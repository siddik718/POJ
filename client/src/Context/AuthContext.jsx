import { getData, haveData } from '../Authoraization/Auth';
import { useState,createContext,useEffect } from 'react';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    useEffect(() => {
        if (haveData()) {
            setUsername(getData().data.username);
            setEmail(getData().data.email);
        }
    }, []);
    return (
        <AuthContext.Provider value={{ username, email, setUsername, setEmail }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;