const topEconomicalBowler = require("./see/topEconomicalBowler");
const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const csv = require("csvtojson");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get("/", (request, response) => {
  response.render("index.html", {
    root: __dirname + "/public",
  });
});

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.get("/matches-played", (req, res) => {
  let year = req.query.season;
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then((matches) => {
      csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then((deleveries) => {
          let economicalBowlersResult = topEconomicalBowler(
            matches,
            deleveries,
            year
          );
          res.json({
            economicalBowlersResult,
          });
        });
    });
});

app.listen(PORT, () => {
  console.log("server started");
});
