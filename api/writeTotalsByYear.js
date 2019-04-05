const gratefulSetlist = require("../data/gratefulSetlist");
const helpers = require("./helpers.js");
const fs = require("fs");

const filteredByYear = year => {
  return gratefulSetlist.setlists.filter(el => {
    const { eventDate } = el;
    const eventYear = eventDate.split("-")[2];
    return eventYear === year;
  });
};

const songs = sample => {
  let temp = [];
  sample.forEach(el => {
    let data = helpers.getSetArrFromSetObj(el);
    temp.push(...data);
  });
  return temp;
};

//return unique songs
const uniqueSongs = arr => {
  let temp = [];
  arr.forEach(d => {
    if (!temp.includes(d)) {
      temp.push(d);
    }
  });
  return temp;
};

//return counted object of song {name : string, plays: number}
const counted = (arr, str) => {
  let obj = { name: str };
  let count = arr.filter(el => el == str).length;
  obj.count = count;
  return obj;
};

const getYearSongData = year => {
  let data = filteredByYear(year);
  let songArr = songs(data);
  let uniqueArr = uniqueSongs(songArr);
  console.log(`${uniqueArr.length} unique songs played in ${year}`);
  let yearObj = { year: year, songs: [], unique_songs: uniqueArr.length };
  uniqueArr.forEach(d => {
    let songObj = counted(songArr, d);
    yearObj.songs.push(songObj);
  });
  return yearObj;
};
//make array of yearObjects

const getTotalsByYear = () => {
  let total = [];
  for (let i = 1965; i < 1996; i++) {
    let year = i.toString();
    let yearTotals = getYearSongData(year);
    total.push(yearTotals);
  }
  return total;
};

const writeTotalPlays = () => {
  let yearlyTotals = getTotalsByYear();
  yearlyTotals = JSON.stringify(yearlyTotals, null, 2);
  fs.writeFile("../data/totalsByYear.json", yearlyTotals, err => {
    if (err) throw err;
    console.log("Totals By Year written to file");
  });
};

writeTotalPlays();
