const io = require('socket.io')(8900,{
    cors:{
        origin:"http://localhost:3000"
    }
})
let users = [];

const addUser = (userId, socketId) => {
    if (!users.some((user) => user.userId === userId)) {
      users.push({ userId, socketId });
    }
  };
  
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
}

const getUser = (id) => {
    return users.find(user => user.userId === id);
}

io.on('connection',(socket)=>{
    console.log('User Connect');
    socket.on('addUser',(userId)=>{
        addUser(userId,socket.id)
        io.emit('getUsers',users);
    })

    // get & send message.
    socket.on('sendMessage',({sender,receiver,text})=>{
        const user = getUser(receiver);
        io.to(user.socketId).emit('getMessage',{sender,text});
    })


    socket.on('disconnect',()=>{
        console.log('A User is disconnected')
        removeUser(socket.id)
        io.emit('getUsers',users);
    })
})