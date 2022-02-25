const port = 5000
const express = require('express');
const http = require('http');

    const corsOPTIONS = {
        origin: '*',
        credentials: true
    }

const server = express();
const httpserver = http.createServer(server);
const io = require('socket.io')(httpserver, {cors: corsOPTIONS});
httpserver.listen(port, () => { 
    console.log(`server online @port: ${port}`)
});




io.on('connection', socket => {
    console.log(`User Connected With ID:${socket.id}`);
    
    socket.on('join_room', (data) => {
        socket.join(data)
        console.log(`User ID:${socket.id} Joined Room With ID:${data}`)
    });


    socket.on('handle_msg', (msg) => {
        socket.to(msg.room).emit('msg_client', (msg));
    })




    socket.on('disconnect', () => {
        console.log(`User Disconnected With ID:${socket.id}`);
    })
});

