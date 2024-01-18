import './Messenger.css';
import axios from 'axios';
import { Alert } from '@mui/material';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import { useContext, useEffect, useState } from 'react';
const ENDPOINT = "http://localhost:8000";

const Message = () => {
    const { username, currentUserId } = useContext(AuthContext);
    const user = username;
    const receiver = useParams().id;
    const [receivername, setReceivername] = useState('');
    const [error, setError] = useState(false);
    // get receiver name.
    useEffect(() => {
        const receiverName = async () => {
            try {
                const api = process.env.REACT_APP_USER_API + "sayMyName/" + receiver;
                const res = await axios.get(api);
                setReceivername(res.data.users.username);
            } catch (err) {
                setError(true)
            }
        }
        receiverName();
    }, [receiver])

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [socket, setSocket] = useState(null);

    // initial socket.
    useEffect(() => {
        const newSocket = io(ENDPOINT);
        setSocket(newSocket);
        return () => newSocket.disconnect();
    }, [user])

    // add users
    useEffect(() => {
        if (socket === null) return;
        socket.emit('addNewUser', currentUserId);
        socket.on('getOnlineUser', (res) => {
            console.log(res);
        })
        return () => socket.off('getOnlineUser');
    }, [socket, currentUserId])

    // receive message.
    useEffect(() => {
        if (socket === null) return;

        socket.on('getMessage', res => {
            setMessages((prev) => [...prev, res]);
        })
        return () => socket.off('getMessage');
    }, [socket, receiver])


    useEffect(() => {
        const sender = currentUserId;
        const fetchMessages = async () => {
            try {
                const api = process.env.REACT_APP_MESSAGE_API + 'get';
                const res = await axios.get(api, {
                    params: { sender, receiver }
                })
                setMessages(res.data);
            } catch (error) {
                setError(true)
            }
        }
        fetchMessages()
    }, [receiver, currentUserId])


    const handleSendMessage = async () => {
        if (inputMessage.trim() !== '') {
            const message = {
                sender: currentUserId,
                receiver: receiver,
                message: inputMessage
            }
            const api = process.env.REACT_APP_MESSAGE_API + 'send';
            const res = await axios.post(api, message);
            setMessages(prev => [...prev, res.data]);
            // send message.
            if (socket === null) return;
            socket.emit('sendMessage', (receiver, message))
            setInputMessage('');
        }
    };
    return (
        <div className="chat-container">
            {error && <Alert severity="warning">Please Try Again!</Alert>}

            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} >
                        <strong>{message.sender === currentUserId ? username : receivername}:</strong> {message.message}
                    </div>
                ))}
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Message;
