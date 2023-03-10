require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const routes = require("./routes/index");
const mongoose = require("mongoose");

app.use(express.json());
app.use((req, res, next) => {
  console.info(req.method, req.url);
  next();
});
app.use(routes);

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
