function maximumWinByRuns(matches) {
  const output = {};
  for (let match of matches) {
    const win = match.winner;
    const run = parseInt(match.win_by_runs);
    if (win.length > 0 && output[win]) {
      if (output[win] < run) {
        output[win] = run;
      }
    } else {
      if (win.length > 0) {
        output[win] = run;
      }
    }
  }
  return output;
}

module.exports = maximumWinByRuns;
