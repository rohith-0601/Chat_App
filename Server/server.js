const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const cors = require("cors");


const app = express();
app.use(express.json)
const server = http.createServer(app);
const io = socketIo(server,{
    cors:{
        origin:"*",
        methods: ["GET","POST"]
    }
})

app.use(cors())

io.on("connection",(socket)=>{
    console.log(`someone connected with id ${socket._id}`)

    socket.on("join-room",({username,room})=>{
        socket.join(room);
        console.log(`${username} joined the room`);

        socket.to(room).emit("recieve_message",{
            sender: "system",
            text: `${username} joined the room`

        })
    })

    socket.on("sendmessage",({room,sender,text})=>{
        io.to(room).emit("receive_message",{sender,text})
    })

    socket.on("disconnect",()=>{
        console.log("user disconnected")
    })
})








server.listen(5001,()=>{
    console.log("server connected and running...")
})


