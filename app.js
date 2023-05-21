import express from "express";
import dotenv from "dotenv";
import {getMovies, getMovieById, postMovies} from './movieHandlers.js';
import { getUsers, getUserById } from './userHandlers.js';


dotenv.config();
const app = express();
const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.use(express.json());

app.get("/", welcome);
app.get("/api/movies", getMovies);
app.get("/api/movies/:id", getMovieById);
app.get("/api/users", getUsers);
app.get("/api/users/:id", getUserById);

app.post("/api/movies", postMovies);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
