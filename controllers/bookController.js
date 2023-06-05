const asyncHandler = require("express-async-handler");
const fs = require('fs');
const Book = require("../models/bookModel");

//@desc Get all book
//@route GET /api/books
//@access public
const getAllBooks = asyncHandler(async (req, res) => {
    const books = await Book.find();
    res.status(200).json(books);
});

//@desc Create new book
//@route POST /api/books
//@access private
const createBook = asyncHandler(async (req, res) => {
    const { title, author, publisher, description, price, isbn, category, publishedDate, numPages } = req.body;
    const image = req.file.filename; // Store the filename of the uploaded image

    if (!title || !author || !publisher || !description || !price || !image || !isbn || !category || !publishedDate || !numPages) {
        res.status(400);
        throw new Error("All fields are required!");
    }

    const book = await Book.create({
        title,
        author,
        publisher,
        description,
        price,
        image,
        isbn,
        category,
        publishedDate,
        numPages
    });

    res.status(201).json(book);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getBook = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
        res.status(404);
        throw new Error("Book not found");
    }

    res.status(200).json(book);
});

//@desc Update book
//@route PUT /api/books/:id
//@access private
const updateBook = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, author, publisher, description, price, isbn, category, publishedDate, numPages } = req.body;
    const image = req.file.filename;

    const book = await Book.findById(id);

    if (!book) {
        res.status(404);
        throw new Error("Book not found");
    }

    // if (book.user_id.toString() !== req.user.id) {
    //     res.status(403);
    //     throw new Error("User don't have permission to update book information");
    // }

    if (book.image) {
        const imagePath = "./uploads/" + book.image;
        fs.unlinkSync(imagePath); //delete image
    }

    book.title = title;
    book.author = author;
    book.publisher = publisher;
    book.description = description;
    book.price = price;
    book.image = image;
    book.isbn = isbn;
    book.category = category;
    book.publishedDate = publishedDate;
    book.numPages = numPages;
    book.updatedAt = Date.now();

    const updatedBook = await book.save();

    res.status(200).json(updatedBook);
});

//@desc Delete book
//@route DELETE /api/books/:id
//@access private
const deleteBook = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let book = await Book.findById(id);
    if (!book) {
        res.status(404);
        throw new Error("Book not found");
    }

    // if (book.user_id.toString() !== req.user.id) {
    //     res.status(403);
    //     throw new Error("User don't have permission to update book information");
    // }

    await Book.findByIdAndDelete({ _id: id }); //delete book

    if (book.image) {
        const imagePath = "./uploads/" + book.image;
        fs.unlinkSync(imagePath); //delete image
    }

    res.status(200).json(book);
});

module.exports = {
    getAllBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
}