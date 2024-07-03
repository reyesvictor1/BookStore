import express from "express";
import { Book } from "../models/bookModel.js"

const router = express.Router();
// ROUTE for: save a new book
// NOTE: working with mongoose is an asyncronous process...
// this happens when the app sends a POST request to the server:
router.post("/", async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({ message: "Please send all the required fields: title, author, publishYear" });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }
        const book = await Book.create(newBook); // Book is a mongoose model
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// ROUTE for: get all books from db
// this happens when the app sends a GET request to the server:
router.get("/", async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// ROUTE for: get one book from db by id
// this happens when the app sends a GET request to the server:
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// ROUTE for: update one book
router.put("/:id", async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(404).send({ message: "Please send all the required fields: title, author, publishYear" });
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result)
            return response.status(404).json({ message: "Book not found" });

        return response.status(200).send({ message: "Book updated successfully" });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// ROUTE for: delete one book
router.delete("/:id", async (request, response) => {
    try {

        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result)
            return response.status(404).json({ message: "Book not found" });

        return response.status(200).send({ message: "Book deleted successfully" });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;