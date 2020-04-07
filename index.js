const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./see/matchesPlayedPerYear");
const mostWinsPerYear = require("./see/mostWinsPerYear");
const extraRunsByEachTeam = require("./see/extraRunsByEachTeam");
const topEconomicalBowler = require("./see/topEconomicalBowler");
const maximumWinByRuns = require("./see/maximumWinByRuns");
const back = require("./see/back");
const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";
function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then((matches) => {
      csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then((deliveries) => {
          let res = extraRunsByEachTeam(matches, deliveries);
          let result = matchesPlayedPerYear(matches);
          let output = mostWinsPerYear(matches);
          let out = topEconomicalBowler(matches, deliveries, "2014");
          let maxRuns = maximumWinByRuns(matches);
          saveMatchesdata(result, output, res, out, maxRuns);
          // console.log(output);
        });
    });
}

function saveMatchesdata(result, output, res, out, maxRuns) {
  const jsonData = {
    matchesPlayedPerYear: result,
    mostWinsPerYear: output,
    extraRunsByEachTeam: res,
    topEconomicalBowler: out,
    maximumWinByRuns: maxRuns,
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}

main();
