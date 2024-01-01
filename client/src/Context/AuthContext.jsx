import axios from 'axios';
import { getData, haveData } from '../Authoraization/Auth';
import { useState,createContext,useEffect } from 'react';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const [contestRunning,setContestRunning] = useState(false);

    useEffect(() => {
        if (haveData()) {
            setUsername(getData().data.username);
            setEmail(getData().data.email);
            setCurrentUserId(getData().data.id)
        }
    }, []);
    return (
        <AuthContext.Provider value={{ 
            username, 
            email, 
            setUsername, 
            setEmail,
            currentUserId,
            contestRunning,
            setContestRunning, 
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;