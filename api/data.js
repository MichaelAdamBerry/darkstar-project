const fs = require("fs");
const gratefulSetlist = require("../data/gratefulSetlist.json");
const careerTotals = require("../data/careerTotals");
const totalsByYear = require("../data/totalsByYear");
const helpers = require("./helpers.js");

const hunterSongs = [
  "alabama getaway",
  "alligator",
  "althea",
  "attics of my life",
  "believe it or not",
  "bird song",
  "black muddy river",
  "black peter",
  "blues for allah",
  "box of rain",
  "broke down palace",
  "brown eyed women",
  "built to last",
  "candyman",
  "casey jones",
  "china cat sunflower",
  "china doll",
  "clementine",
  "comes a time",
  "corrina",
  "cosmic charlie",
  "crazy fingers",
  "cumberland blues",
  "dark star",
  "days between",
  "deal",
  "dire wolf",
  "doin' that rag",
  "dupree's diamond blues",
  "duquesne whistle",
  "easy wind",
  "the eleven",
  "eyes of the world",
  "fire on the mountain",
  "foolish heart",
  "france",
  "franklin's tower",
  "friend of the devil",
  "greatest story ever told",
  "he's gone",
  "help on the way",
  "here comes sunshine",
  "high time",
  "hollywood cantata",
  "if i had the world to give",
  "it must have been the roses",
  "jack straw",
  "keep your day job",
  "lazy river road",
  "let me sing your blues away",
  "liberty",
  "loose lucy",
  "loser",
  "mason's children",
  "mississippi half-step uptown toodeloo",
  "mountains of the moon",
  "mr charlie",
  "new speedway boogie",
  "playing in the band",
  "ramble on rose",
  "ripple",
  "rosemary",
  "row jimmy",
  "saint stephen",
  "scarlet begonias",
  "shakedown street",
  "ship of fools",
  "so many roads",
  "stagger lee",
  "standing on the moon",
  "stella blue",
  "sugar magnolia",
  "sugaree",
  "sunshine daydream",
  "terrapin station",
  "they love each other",
  "till the morning comes",
  "to lay me down",
  "touch of grey",
  "truckin",
  "u.s. blues",
  "uncle john's band",
  "unusual occurences in the desert",
  "wave that flag",
  "way to go home",
  "west l.a. fadeaway",
  "wharf rat",
  "what's become of the baby",
  "the wheel",
  "when push comes to shove"
];

const barlowSongs = [
  "black throated wind",
  "blow away",
  "cassidy",
  "easy to love you",
  "estimated prophet",
  "feel like a stranger",
  "gentlemen, start your engines",
  "heaven help the fool",
  "hell in a bucket",
  "i need a miracle",
  "i will take you home",
  "just a little light",
  "lazy lightnin'",
  "let it grow",
  "looks like rain",
  "lost sailor",
  "mexicali blues",
  "the music never stopped",
  "my brother esau",
  "picasso moon",
  "saint of circumstance",
  "supplication",
  "throwing stones",
  "we can run"
];

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

const filterForWriter = () => {
  let temp = totalsByYear;
  let counted = [];
  let val = [];
  temp.forEach(obj => {
    let data = { year: obj.year, hunter: 0, barlow: 0, cover: 0 };
    let songs = obj.songs;
    let yearCount = 0;
    let hunter = 0;
    let barlow = 0;
    let cover = 0;
    songs.forEach(el => {
      let song = el.name.toLowerCase();
      yearCount += el.count;
      if (
        counted.includes(song) === false &&
        song != "space" &&
        song != "drums" &&
        song != "jam" &&
        !song.split(" ").includes("jam")
      ) {
        if (hunterSongs.includes(song)) {
          hunter += el.count;
        } else if (barlowSongs.includes(song)) {
          barlow += el.count;
        } else {
          cover += el.count;
        }
      }
    });
    data.hunter = hunter / yearCount;
    data.barlow = barlow / yearCount;
    data.cover = cover / yearCount;
    val.push(data);
  });
  return val;
};

module.exports = {
  //default is to set singer property to Jerry if Hunter and Weir if Barlow
  getSongWriters: () => {
    let data = careerTotals;
    let songArr = uniqueSongs(data);
    songArr.forEach(songObj => {
      songObj.writer = [];
      songObj.singer = [];
      let songName = songObj.song.toLowerCase();
      if (hunterSongs.includes(songName)) {
        songObj.writer.push("Robert Hunter");
        songObj.singer.push("Jerry Garcia");
      } else if (barlowSongs.includes(songName)) {
        songObj.writer.push("John Perry Barlow");
        songObj.singer.push("Bob Weir");
      }
    });
    return songArr;
  }
};
