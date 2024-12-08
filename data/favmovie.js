require("dotenv").config();

const initOptions = {
  capSQL: true,
};
const pgp = require("pg-promise")(initOptions);

const cn = {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  database: process.env.DBNAME,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  max: 30,
};
const db = pgp(cn);

function autoStringify(favmovieData) {
  if (!favmovieData["imDbRating"]) {
    favmovieData["imDbRating"] = null;
  }
  return favmovieData;
}

const url = "http://matuan.online:2422/api/MostPopularMovies";

const dataFavMovies = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const main = async () => {
  try {
    const favMovies = await dataFavMovies(url);

    favMovies.forEach((movie) => {
      const sanitizedMovieData = autoStringify(movie);
      db.none(
        "INSERT INTO s21515.favmovies(id, rank, rankUpDown, title, fullTitle, year, image, crew, imDbRating, imDbRatingCount) VALUES(${id}, ${rank}, ${rankUpDown}, ${title}, ${fullTitle}, ${year}, ${image}, ${crew}, ${imDbRating}, ${imDbRatingCount}) ON CONFLICT (id) DO NOTHING",
        sanitizedMovieData
      )
        .then(() => {
          console.log("Data inserted successfully");
        })
        .catch((error) => {
          console.log("Error inserting data:", error);
        });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
main();
