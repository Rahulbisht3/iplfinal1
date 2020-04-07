function back(matches, deliveries, setYear) {
  let out = {};
  let see = {};
  let final = {};
  let last = {};
  for (let match of matches) {
    if (setYear === match.season) {
      for (let del of deliveries) {
        if (match.id === del.match_id) {
          let run =
            parseInt(del.total_runs) -
            (parseInt(del.penalty_runs) +
              parseInt(del.bye_runs) +
              parseInt(del.legbye_runs));
          out[del.bowler] = (out[del.bowler] || 0) + run;
          let count = parseInt(del.wide_runs) + parseInt(del.noball_runs);
          if (count === 0) {
            see[del.bowler] = (see[del.bowler] || 0) + 1;
          }
        }
      }
    }
  }

  for (let i in see) {
    final[i] = (out[i] / see[i]) * 6;
  }
  var sortable = [];
  for (var key in final)
    if (final.hasOwnProperty(key)) sortable.push([key, final[key]]);

  sortable.sort(function (a, b) {
    return a[1] - b[1];
  });
  let d = {};
  for (let i = 0; i < 10; i++) {
    d[sortable[i][0]] = parseFloat(sortable[i][1].toFixed(2));
  }
  console.log(d);
  return d;
}

module.exports = back;
