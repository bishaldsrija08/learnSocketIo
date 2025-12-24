const app = require('express')();
const { Server } = require("socket.io");
const connectToDatabase = require("./database/index.js");
const Book = require('./models/bookModel.js');
connectToDatabase()



// app.get("/", (req, res) => {
//     res.send("Hello, World!");
// })

const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

const io = new Server(server);

// CRUD
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("addBook", async (bookData) => {
        try {
            // Add book => Create Operation
            if (bookData) {
                const { bookName, bookPrice } = bookData;

                // Save to database
                const savedBook = await Books.create({
                    bookName,
                    bookPrice
                })
                socket.emit("response", {
                    status: 200,
                    message: "Book added successfully",
                    data: savedBook
                })
            }

        } catch (error) {
            socket.emit("response", {
                status: 500,
                message: "Internal Server Error"
            })
        }
    })
    // Get Books => Read Operation
    socket.on("getBooks", async (data) => {
        try {
            const books = await Book.find();
            console.log(books)
            socket.emit("response", {
                status: 200,
                data: books,
                message: "Books fetched successfully"
            })
        } catch (error) {
            // console.log(error.message)
            socket.emit("response", {
                status: 500,
                message: "Internal Server Error"
            })
        }
    })
    // Update Book => Update Operation
    socket.on("updateBook", async (data) => {
        try {
            if (data) {
                const { bookId, bookName, bookPrice } = data;
                const updatedBook = await Book.findByIdAndUpdate(bookId, {
                    bookName,
                    bookPrice
                }, {
                    new: true
                })
                socket.emit("response", {
                    status: 200,
                    data: updatedBook,
                    message: "Books updated successfully"
                })
            }
        } catch (error) {
            socket.emit("response", {
                status: 500,
                message: "Internal Server Error"
            })
        }
    })
    // Delete Book => Delete Operation
    socket.on("delteBook", async (data) => {
        try {
            if(data){
                const {bookId} = data
            await Book.findByIdAndDelete(bookId)
            socket.emit("response", {
                status: 200,
                message: "Book deleted successfully"
            })

        }} catch (error) {
            socket.emit("response", {
                status: 500,
                message: "Internal Server Error"
            })
        }

    })
})