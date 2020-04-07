function extraRunsByEachTeam(matches, deliveries) {
  const setYear = "2016";
  let result = {};
  for (let match of matches) {
    for (let del of deliveries) {
      if (match.id === del.match_id && match.season === setYear) {
        if (result[del.bowling_team]) {
          result[del.bowling_team] += parseInt(del.extra_runs);
        } else {
          result[del.bowling_team] = parseInt(del.extra_runs);
        }
      }
    }
  }
  return result;
}

module.exports = extraRunsByEachTeam;
