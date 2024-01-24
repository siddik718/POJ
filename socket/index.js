import { Server } from "socket.io";
const io = new Server({ 
    cors: "https://poj.netlify.app",
    methods: ["GET", "POST"]
});
let onlineUser = [];
io.on("connection", (socket) => {
  console.log('A User Connected : ', socket.id);
    socket.on('addNewUser',(userId)=>{
        if(!onlineUser.some(user=>user.userId === userId)){
            onlineUser.push({userId,socketId:socket.id})
        }
        console.log("online User : ", onlineUser);
    })
    io.emit('getOnlineUser',onlineUser);
    // add message.
    socket.on('sendMessage',(data)=>{
        console.log('send data : ',data);
        const user = onlineUser.find(user=>user.userId === data.receiver);
        if(user) {
            io.to(user.socketId).emit('getMessage',data)
        }
    })
    socket.on('disconnect',()=>{
        onlineUser = onlineUser.filter(user=>user.socketId !== socket.id);
        console.log('A user is disconnected');
    })
});
io.listen(8000);