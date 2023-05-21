import { database } from './database.js';

export const getUsers = (req, res) => {
  database
    .query("Select * from users")
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("We've got a problem here");
    })
}

export const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("Select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("got pb");
    })
}