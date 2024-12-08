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

function autoStringifyNames(nameData) {
  if (!nameData["deathDate"]) {
    nameData["deathDate"] = null;
  }
  if (!nameData["birthDate"]) {
    nameData["birthDate"] = null;
  }
  if (!nameData["awards"]) {
    nameData["awards"] = null;
  }

  const fieldsToStringify = ["castMovies"];
  fieldsToStringify.forEach((field) => {
    if (Array.isArray(nameData[field]) || typeof nameData[field] === "object") {
      nameData[field] = JSON.stringify(nameData[field]);
    }
  });

  return nameData;
}

const url = "http://matuan.online:2422/api/Names";

const dataNames = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const main = async () => {
  try {
    const names = await dataNames(url);

    names.forEach((name) => {
      const sanitizedNameData = autoStringifyNames(name);

      db.none(
        "INSERT INTO  s21515.names(id, name, role, image, summary, birthDate, deathDate, awards, castMovies) VALUES(${id}, ${name}, ${role}, ${image}, ${summary}, ${birthDate}, ${deathDate}, ${awards}, ${castMovies}) ON CONFLICT (id) DO NOTHING",
        sanitizedNameData
      )
        .then(() => {
          console.log("Data inserted successfully");
        })
        .catch((error) => {
          console.error("Error inserting data:", error);
        });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
main();
