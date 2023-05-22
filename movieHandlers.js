import { database } from "./database.js";

// const movies = [
//   {
//     id: 1,
//     title: "Citizen Kane",
//     director: "Orson Wells",
//     year: "1941",
//     colors: false,
//     duration: 120,
//   },
//   {
//     id: 2,
//     title: "The Godfather",
//     director: "Francis Ford Coppola",
//     year: "1972",
//     colors: true,
//     duration: 180,
//   },
//   {
//     id: 3,
//     title: "Pulp Fiction",
//     director: "Quentin Tarantino",
//     year: "1994",
//     color: true,
//     duration: 180,
//   },
// ];

export const getMovies = (req, res) => {
  database
    .query("SELECT * FROM movies")
    .then(([movies]) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("There's an error");
    });
};

export const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id = ?", [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

export const postMovies = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Can't save the movies mate");
    });
};

// export default movieHandlers

export const updateMovies = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;
  
  database
  .query(
    "update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
    [title, director, year, color, duration, id])
  .then(([result]) => {
    if (result.affectedRows === 0) {
      res.status(401).send("Not found");
    } else {
      res.sendStatus(204);
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Pb editing movies.");
  })
};


export const deleteMovie = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query(
    "delete from movies where id = ?", [id])
  .then(([result]) => {
    if(result.affectedRows === 0) {
      res.status(404).send("Not found");
    } else {
      res.sendStatut(204);
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send("Pb deleting movies");
  })
}