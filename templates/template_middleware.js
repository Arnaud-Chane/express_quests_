// --------   -------- //
const step1 = (req, res, next) => {
  req.message = "I went through step1";
  next();
};

const step2 = (req, res, next) => {
  req.message += " and step2";
  next();
};

const lastStep = (req, res) => {
  res.send(req.message);
};

app.get("/justToTest", step1, step2, lastStep);

// -------- Same thing with array to check all -------- //

const step1 = (req, res, next) => {
  req.message = "I went through step1";
  next();
};

const step2 = (req, res, next) => {
  req.message += " and step2";
  next();
};

const lastStep = (req, res) => {
  res.send(req.message);
};

const steps = [step1, step2, lastStep];

app.get("/justToTest", steps);

// --------   -------- //
// in validators.js

const validateMovie = (req, res, next) => {
  // validate req.body then call next() if everything is ok
};

module.exports = {
  validateMovie,
};

// in app.js

const { validateMovie } = require("./validators.js");

app.post("/api/movies", validateMovie, movieHandlers.postMovie);

// -------- Manual check -------- //


const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;

  if (title == null) {
    res.status(422).send("The field 'title' is required");
  } else if (director == null) {
    res.status(422).send("The field 'director' is required");
  } else if (year == null) {
    res.status(422).send("The field 'year' is required");
  } else if (color == null) {
    res.status(422).send("The field 'color' is required");
  } else if (duration == null) {
    res.status(422).send("The field 'duration' is required");
  } else {
    next();
  }
};

// -------- Same but with error via array  -------- //

const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;
  const errors = [];

  if (title == null) {
    errors.push({ field: "title", message: "This field is required" });
  }
  if (director == null) {
    errors.push({ field: "director", message: "This field is required" });
  }
  if (year == null) {
    errors.push({ field: "year", message: "This field is required" });
  }
  if (color == null) {
    errors.push({ field: "color", message: "This field is required" });
  }
  if (duration == null) {
    errors.push({ field: "duration", message: "This field is required" });
  }
 
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

// --------   -------- //

const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;
  const errors = [];

  if (title == null) {
    errors.push({ field: "title", message: "This field is required" });
  } else if (title.length >= 255) {
    errors.push({ field: "title", message: "Should contain less than 255 characters" });
  }

  // ...

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};


// -------- Checking email via regex -------- //

const validateUser = (req, res, next) => {
  const { email } = req.body;
  const errors = [];

  // ...

  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  if (!emailRegex.test(email)) {
    errors.push({ field: 'email', message: 'Invalid email' });
  }

  // ...

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

// -------- Checking via middleware package  -------- //

const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

// -------- express-validator  -------- //

const { body, validationResult } = require('express-validator');

const validateUser = [
  body("email").isEmail(),
  body("firstname").isLength({ max: 255 }),
  body("lastname").isLength({ max: 255 }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

// --------   -------- //


























