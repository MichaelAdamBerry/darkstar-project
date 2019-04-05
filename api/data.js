const fs = require("fs");
const gratefulSetlist = require("../data/gratefulSetlist");
const careerTotals = require("../data/careerTotals");
const helpers = require("./helpers.js");

// ***    example of method to return an array of {song: <song>, count: <count>}
// ***    of all songs played in 1972 sorted by count  *****

//      const seventyTwoTotal = seventytwo.reduce((acc, cur) => {
//     let setlist = helpers.getSetArrFromSetObj(cur);
//     acc.push(...setlist);
//     return acc;
//   }, []);

//const seventytwo = helpers.getSetsByYear("1972-01-01");
//const seventyTwoSongCount = helpers.songsByFrequencyPlayed(seventyTwoTotal);
//console.log(seventyTwoSongCount);

//console.log("top 200 hundred songs ", careerTotals.splice(2, 202));
let topOneFifty = careerTotals.slice(2, 152);

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

// const berthaPlays = helpers.getPlaysBySongandYear("1972-01-01", "Bertha");

// console.log("Bertha Plays", berthaPlays);

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

// const sample = filteredByYear("1970");
// const songArr = songs(sample);
// const uniqueArr = uniqueSongs(songArr);
// const darkstar = counted(songArr, "Dark Star");

// console.log(uniqueArr);
// console.log("unique songs in year", uniqueArr.length);
// console.log(darkstar);

const getYearSongData = year => {
  let data = filteredByYear(year);
  let songArr = songs(data);
  let uniqueArr = uniqueSongs(songArr);
  console.log(uniqueArr);
  console.log(`${uniqueArr.length} unique songs played in ${year}`);
  let yearObj = { year: year, songs: [], unique_songs: uniqueArr.length };
  uniqueArr.forEach(d => {
    let songObj = counted(songArr, d);
    yearObj.songs.push(songObj);
  });
  return yearObj;
};

//console.log(getYearSongData("1977"));

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

getTotalsByYear();
