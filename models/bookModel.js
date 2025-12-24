const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String
    },
    bookPrice: {
        type: Number
    }
})

const Book = mongoose.model("Book", bookSchema)
module.exports = Book;