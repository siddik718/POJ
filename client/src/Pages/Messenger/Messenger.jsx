import { Box, Container, CssBaseline, TextField, styled, Button, Typography } from '@mui/material'
import Conversation from '../../Components/Conversation';
import MessageShow from '../../Components/MessageShow';
import { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../../Context/AuthContext';
import axios from 'axios';

// connecting socket
import { io } from 'socket.io-client';

const TopBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    // border: '1px solid red',
    minHeight: 'calc(100vh - 100px)',
    maxHeight: 'calc(100vh - 100px)',
});
const ConversationBox = styled(Box)({
    // border: '1px solid red',
    flex: 2,
    padding: '10px',
    fontFamily: 'sans-serif',
    fontSize: '700',
    fontWeight: '500',
    overflow: 'scroll'
});
const Chat = styled(Box)({
    flex: 6,
    display: 'flex',
    flexDirection: 'column'
})
const ChatBox = styled(Box)({
    // border: '1px solid red',
    padding: '10px',
    overflow: 'scroll',
});
const ChatInput = styled(Box)({
    marginTop: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'
})
const MyTextArea = styled('textarea')({
    width: '80%',
    height: '90px',
    padding: '10px',
    border: 'none',
    '&:click': {
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        
    }
})
const MySubmitButton = styled(Button)({
    width: '70px',
    height: '40px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#7151f4',
    color: 'white',
    '&:hover': {
        color: 'black'
    },
    position: 'absolute',
    right: '50px',
    bottom: '5px',
})

const Messenger = () => {
    const [users, setUsers] = useState([]);
    const [currectChat, setCurrentChat] = useState({});
    const [messages, setMessages] = useState([]);
    const [sendMessages, setSendMessages] = useState("");
    const { currentUserId } = useContext(AuthContext);

    const scrollRef = useRef();
    const socket = useRef(io("ws://localhost:8900"))
    useEffect(()=>{
        socket.current = io("ws://localhost:8900");
        socket.current.on('getMessage',(data)=>{
           (currectChat && currectChat.friend === data.sender && setMessages([...messages,data.text]));
        })
    },[currectChat,currentUserId,messages])
    useEffect(()=>{
        socket.current.emit('addUser',currentUserId);
        socket.current.on('getUsers',(users)=>{
            console.log(users);
        });
    },[currentUserId]);

    // Fetch Users.
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const api = process.env.REACT_APP_USER_API;
                const response = await axios.get(api);
                setUsers(response.data.users.filter((user => user._id !== currentUserId)));
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser();
    }, [currentUserId]);

    // handle click on user 
    const handleClick = async (friend, me) => {
        // get the conversation Id.
        const api = process.env.REACT_APP_CONVERSATION_API;
        try {
            // search conversation with friend.
            const response = await axios.get(api, {
                params: { me, friend }
            });
            // console.log(response.data);
            setCurrentChat(response.data[0]);
            // console.log(currectChat)
        } catch (err) {
            // console.log(err.response);
            if (err.response.status === 404) {
                // create a conversation then as there are no previous conversation between them.
                try {
                    const response = await axios.post(api, { me, friend });
                    // console.log(response.data);
                    setCurrentChat(response.data);
                    // console.log(currectChat)
                } catch (err2) {
                    console.log(err2);
                }
            } else {
                console.log(err);
            }
        }
    }

    // get all the messages between certain friend and user
    useEffect(() => {
        const getMessages = async () => {
            try {
                const api = process.env.REACT_APP_MESSAGE_API + currectChat._id;
                const response = await axios.get(api);
                setMessages(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        getMessages();
    }, [currectChat])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:'smooth'});

    },[messages]);

    // handle Send Messages
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(sendMessages);
        socket.current.emit('sendMessage',{
            sender:currentUserId,receiver:currectChat.friend,message:sendMessages
        })
        try {
            const api = process.env.REACT_APP_MESSAGE_API;
            const response = await axios.post(api, {
                conversationId: currectChat._id,
                sender: currentUserId,
                receiver: currectChat.friend,
                message: sendMessages,
            })
            // console.log(response);
            setMessages(prevMessages => [...prevMessages, response.data]);
            setSendMessages("");
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <Container maxWidth='lg' >
            <CssBaseline />
            <TopBox>
                <ConversationBox>
                    <Box>
                        <TextField label="Find A User" variant="standard" />
                    </Box>
                    <Box>
                        {users.length > 0 && users.map((user) => (
                            <div key={user._id} onClick={() => handleClick(user._id, currentUserId)}>
                                <Conversation name={user.username} />
                            </div>
                        ))}
                    </Box>
                </ConversationBox>
                <Chat>
                    {currectChat ?
                        <>
                            <ChatBox>
                                {messages.length > 0 && messages.map((msg) => (
                                    <div key={msg._id} ref={scrollRef}>
                                        <MessageShow message={msg.message} own={msg.sender === currentUserId} />
                                    </div>
                                ))}
                            </ChatBox>
                            <ChatInput>
                                <MyTextArea
                                    placeholder='Send Message'
                                    value={sendMessages}
                                    onChange={(e) => setSendMessages(e.target.value)}
                                />
                                <MySubmitButton
                                    onClick={handleSubmit}
                                >Send</MySubmitButton>
                            </ChatInput>
                        </>
                        :
                        <Typography variant="caption" color="textSecondary">
                            Open a New Conversation
                        </Typography>
                    }
                </Chat>
            </TopBox>
        </Container>
    )
}

export default Messenger;