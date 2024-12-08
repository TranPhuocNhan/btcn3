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

function autoStringify(movieData) {
  if (!movieData["releaseDate"]) {
    movieData["releaseDate"] = null;
  }
  if (!movieData["runtimeStr"]) {
    movieData["runtimeStr"] = null;
  }
  if (!movieData["boxOffice"]) {
    movieData["boxOffice"] = { cumulativeWorldwideGross: "0" };
  } else if (!movieData["boxOffice"].cumulativeWorldwideGross) {
    movieData["boxOffice"].cumulativeWorldwideGross = "0";
  }

  if (!movieData["plotFull"]) {
    movieData["plotFull"] = null;
  }

  const fieldsToStringify = ["directorList", "actorList", "genreList"];
  fieldsToStringify.forEach((field) => {
    if (
      Array.isArray(movieData[field]) ||
      typeof movieData[field] === "object"
    ) {
      movieData[field] = JSON.stringify(movieData[field]);
    }
  });

  return movieData;
}

const url = "http://matuan.online:2422/api/Movies";

const dataMovies = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const main = async () => {
  try {
    const movies = await dataMovies(url);

    movies.forEach((movie) => {
      const sanitizedMovieData = autoStringify(movie);
      db.none(
        "INSERT INTO s21515.movies(id, title, fullTitle, year, image, releaseDate, runtimeStr, plot, directorList, actorList, genreList, ratings, boxOffice, plotFull) VALUES(${id}, ${title}, ${fullTitle}, ${year}, ${image}, ${releaseDate}, ${runtimeStr}, ${plot}, ${directorList}, ${actorList}, ${genreList}, ${ratings.imDb}, ${boxOffice.cumulativeWorldwideGross}, ${plotFull}) ON CONFLICT (id) DO NOTHING",
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
