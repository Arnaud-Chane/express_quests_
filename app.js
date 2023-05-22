import express from "express";
import dotenv from "dotenv";
import {getMovies, getMovieById, postMovies, updateMovies, deleteMovie} from './movieHandlers.js';
import { getUsers, getUserById, postUsers, updateUser, deleteUser } from './userHandlers.js';


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
app.post("/api/users", postUsers);

app.put("/api/movies/:id", updateMovies);
app.put("/api/users/:id", updateUser);

app.delete("/api/movies/:id", deleteMovie);
app.delete("/api/users/:id", deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
