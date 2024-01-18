import { getData, haveData } from '../Authoraization/Auth';
import { useState,createContext,useEffect } from 'react';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const [isAdmin,setIsAdmin] = useState(false);

    useEffect(() => {
        if (haveData()) {
            setUsername(getData().data.username);
            setEmail(getData().data.email);
            setCurrentUserId(getData().data.id);
            setIsAdmin(getData().data.isAdmin);
        }
    }, []);
    return (
        <AuthContext.Provider value={{ 
            username, 
            setUsername, 
            email, 
            setEmail,
            currentUserId,
            setCurrentUserId,
            isAdmin,
            setIsAdmin,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;