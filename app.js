const app = require('express')();
const { Server } = require("socket.io");




// app.get("/", (req, res) => {
//     res.send("Hello, World!");
// })

const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

const io = new Server(server);

io.on("connection", (socket) => {

    socket.emit("hi", {
        greetings: "Welcome to the server!"
    });

    // console.log(socket.id)
    // console.log("A user connected");

    // socket.on("disconnect", ()=>{
    //     console.log("A user disconnected");
    // })

    socket.on("sendData", (data)=>{
        console.log(data)
        if(data){
            io.emit("responseData", {
                data
            })
        }
    })
})