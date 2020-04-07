function mostWinsPerYear(matches) {
  const answer = {};
  let year = [];
  let teamName = [];
  for (let match of matches) {
    const season = match.season;
    b = false;
    for (let a of year) {
      if (season === a) {
        b = true;
      }
    }
    if (b === false) {
      year.push(season);
    }
  }
  year.sort(function(a, b) {
    return a - b;
  });

  for (let match of matches) {
    const season = match.winner;
    b = false;
    for (let a of teamName) {
      if (season === a) {
        b = true;
      }
    }
    if (b === false) {
      teamName.push(season);
    }
  }

  for (let a of year) {
    let see = {};

    for (let match of matches) {
      const season = match.season;
      const teamData = match.winner;
      if (a === season) {
        if (see[teamData]) {
          see[teamData] += 1;
        } else {
          see[teamData] = 1;
        }
      }
    }
    answer[a] = see;
  }
  return answer;
}

module.exports = mostWinsPerYear;
