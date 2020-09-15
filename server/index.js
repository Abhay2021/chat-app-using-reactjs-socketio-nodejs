const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const router = require('./router');
const {addUser,removeUser,getUser,getUsersInRoom} = require('./user.js');

app.use(router);
app.use(cors());
io.on('connection',(socket)=>{
    console.log('we have new connections!!');
       
    //Using the custom event created at frontend side by us (i.e. in chat.js componenet)
    socket.on('join',({name,room},callback)=>{
        const {error,user} = addUser({id:socket.id,name,room});
        console.log("error",error,"user",user);
        if(error) return callback(error);

        socket.join(user.room);
        //System generated message to joined new user to a room
        socket.emit('message',{user:'admin',text:`${user.name} welcome to room ${user.room}`});
        //Broadcast a message to everyone in the room about new user
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name}, has joined`});

        io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)});
        
        callback();
    })

    socket.on('sendMessage',(message,callback)=>{
        const user = getUser(socket.id);
        
        io.to(user.room).emit('message',{user:user.name,text:message});
        io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)});
        
        callback();
    });
    socket.on('disconnect',()=>{
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left`});
        }
    })

});

server.listen(PORT,()=>{
    console.log(`hello server port ${PORT}`);
});
