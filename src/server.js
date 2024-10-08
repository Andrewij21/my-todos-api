require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const helmet = require("helmet");
const compression = require("compression");
const routes = require("./routes/index");
const mongoose = require("mongoose");
const cors = require("cors");

// ORIGIN
const corsOptions = {
  // origin: "https://master--poetic-halva-a0d5af.netlify.app",
  origin: "https://my-todo-v1-1-1.netlify.app",
};
app.use(cors(corsOptions));

// POST json data
app.use(express.json());

// Use LOG request
app.use((req, res, next) => {
  console.info(req.method, req.url);
  next();
});

app.use(routes); // Manage server route
app.use(helmet()); // Secure HTTP headers
app.use(
  compression({
    level: 9,
  })
); // Compress data

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () =>
      console.info(`Connect to DB and Listening on http://localhost:${PORT}`)
    );
  })
  .catch((e) => {
    console.error(e.message);
  });
