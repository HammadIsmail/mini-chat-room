const http = require('http');
const express = require("express");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
app.use(express.static("./public"))
app.use(express.static("./src"))
const io = new Server(server);

// socket io



io.on("connection",(socket)=>{
    console.log("user connected with id",socket.id)

    socket.emit('socketId',socket.id)



    socket.on("user-message",(message)=>{
        console.log("A new message : ",message)
        io.emit('message',{text:message,id:socket.id,type:'sent'})
    })

    socket.on("incoming-message",(message)=>{
        console.log("A new message : ",message)
        io.emit('message', { text: message.text, id: message.id, type: 'received' });
    })

    socket.on('disconnect', () => {
        console.log(`Client with socket id ${socket.id} disconnected`);
    });



})


app.get("/",(req,res,next)=>{

    return res.sendFile("index.html")
})


server.listen(process.env.PORT,()=>{
    console.log(`Server is runing on ${process.env.PORT}`)
})