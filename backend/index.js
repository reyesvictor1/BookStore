import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// middleware for parsing the request body
app.use(express.json());

// middleware for handling CORS policy
// option 1: allow all origins with default of cors(*)
app.use(cors());
// option 2: alow custom origin (have more control)
// app.use(cors({
//     origin: "http://localhost:5555",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"]
// }));

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Wilkommen");
});

app.use("/books", booksRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        // only run the express.js server if the mongoDB connection is successful
        app.listen(PORT, () => {
            console.log(`App is listening to port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });