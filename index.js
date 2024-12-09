require("dotenv").config();
const express = require("express");
const myEngine = require("./21515");

// Routes
const homeRoute = require("./routes/movie.route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "html");

app.engine("html", myEngine);

// Routes
app.use("/", homeRoute);

// Middleware xử lý lỗi không tìm thấy trang
app.use((req, res, next) => {
  const err = new Error("404 Not Found");
  res.status(404);
  next(err);
});

// Middleware xử lý lỗi server (500)
app.use((err, req, res, next) => {
  res.status(500);
  return res.render("error-page", { errorMessage: err.message });
});

const port = process.env.INDIVIDIAL_MARK || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
