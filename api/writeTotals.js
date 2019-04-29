const fs = require("fs");
const gratefulSetlist = require("../data/gratefulSetlist");
const helpers = require("./helpers.js");

//function that writes total plays data
const writeTotalPlays = () => {
  const allSets = gratefulSetlist.setlists.reduce((acc, cur) => {
    let setlist = helpers.getSetArrFromSetObj(cur);
    acc.push(...setlist);
    return acc;
  }, []);

  const getLastPlayedDate = song => {
    let found = gratefulSetlist.setlists.find(d => {
      let arr = helpers.getSetArrFromSetObj(d);
      return arr.includes(song);
    });
    return found === undefined ? "none" : found.eventDate;
  };

  const getFirstPlayedDate = song => {
    let found = undefined;
    gratefulSetlist.setlists.forEach(d => {
      let arr = helpers.getSetArrFromSetObj(d);
      if (arr.includes(song)) {
        found = d.eventDate;
      }
    });
    return found === undefined ? "no song found" : found;
  };

  let careerTotals = helpers.songsByFrequencyPlayed(allSets);
  careerTotals = JSON.stringify(careerTotals, null, 2);
  fs.writeFile("careerTotals.json", careerTotals, err => {
    if (err) throw err;
    console.log("Career Totals written to file");
  });
};

//function that writes json file total plays by year 1965 - 1995;
const writeTotalsByYear = () => {
  let data = [];
  for (let i = 0; i < 30; i++) {
    let songs = [];
    let year = `19${65 + i}`;
    let date = `${year}-01-01`;
    let sets = helpers.getSetsByYear(date);
    sets.forEach(set => {
      let arr = helpers.getSetArrFromSetObj(set);
      songs.push(...arr);
    });
    let yearSongs = helpers.songsByFrequencyPlayed(songs);
    let obj = {};
    obj[year] = yearSongs;
    data.push(obj);
  }
  data = JSON.stringify(data, null, 2);
  fs.writeFile("totalsByYear.json", data, err => {
    if (err) throw err;
    console.log("Totals by year written to file");
  });
};

// function that writes song data for most popular songs
// writeSongData(song) returns object with values for
//{title, first_played, last_played, year}
//year = [yearCount, yearCount, yearCount, ect]

//uncomment function and run in terminal to write json files
//writeTotalsByYear();
////writeTotalPlays();
