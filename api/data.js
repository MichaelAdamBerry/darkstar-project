const fs = require("fs");
const gratefulSetlist = require("../data/gratefulSetlist.json");
const careerTotals = require("../data/careerTotals");
const totalsByYear = require("../data/totalsByYear");
const helpers = require("./helpers.js");

//year should be type string, data totalsByYear
const getAllSongDataByYear = (year, data) => {
  let temp = data;
  let val = temp.find(obj => {
    return obj.year === year;
  });
  console.log(val);
  console.log(`song data for ${year}`);
  return val;
};

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

const getTotalShows = () => {
  return gratefulSetlist.setlists.reduce((acc, curr, ind) => {
    acc++;
    return acc;
  }, 0);
};

const filteredByYear = year => {
  return gratefulSetlist.setlists.filter(el => {
    const { eventDate } = el;
    const eventYear = eventDate.split("-")[2];
    return eventYear === year;
  });
};

//console.log(filteredByYear("1973"));

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
  // console.log(uniqueArr);
  // console.log(`${uniqueArr.length} unique songs played in ${year}`);
  let yearObj = { year: year, songs: [], unique_songs: uniqueArr.length };
  uniqueArr.forEach(d => {
    let songObj = counted(songArr, d);
    yearObj.songs.push(songObj);
  });
  return yearObj;
};

const getTotalsByYear = () => {
  let total = [];
  for (let i = 1965; i < 1996; i++) {
    let year = i.toString();
    let yearTotals = getYearSongData(year);
    total.push(yearTotals);
  }
  return total;
};

const filterData = song => {
  let temp = totalsByYear;
  let val = [];
  temp.forEach(obj => {
    //each year make a new object
    let songObj = {};
    let tempCount = 0;
    //add year  to object
    songObj.year = obj.year;
    //loop throught each object
    obj.songs.forEach(title => {
      //if song is found add count to obj
      if (title.name === song) {
        tempCount = title.count;
      }
    });
    songObj.count = tempCount;
    val.push(songObj);
  });
  return val;
};

console.log(filterData("1973"));
