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

const url = "http://matuan.online:2422/api/Reviews";

const dataReviews = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function autoStringifyReview(review) {
  if (Array.isArray(review["items"]) || typeof review["items"] === "object") {
    review["items"] = JSON.stringify(review["items"]);
  }
  return review;
}

const main = async () => {
  try {
    const reviews = await dataReviews(url);

    reviews.forEach((review) => {
      const sanitizedReviewData = autoStringifyReview(review);
      db.none(
        "INSERT INTO s21515.reviews(movieId, items) VALUES(${movieId}, ${items}) ON CONFLICT (movieId) DO NOTHING",
        sanitizedReviewData
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
