const gratefulSetlist = require("../data/gratefulSetlist");
const d3 = require("d3");
const moment = require("moment");

module.exports = {
  getSetArrFromSetObj: setObj => {
    //sets.set = array
    //sets.set[i].song = array
    //forEach sets.set // forEach song name = song[j].name
    const arr = [];
    const { sets } = setObj;
    sets.set.forEach(set => {
      set.song.forEach(d => arr.push(d.name));
    });
    return arr;
  },

  getSetsByYear: year => {
    return gratefulSetlist.setlists.filter(d => {
      //expects year to be formatted '2010-01-01'
      let { eventDate } = d;
      eventDate = eventDate
        .split("-")
        .reverse()
        .join("-");
      return moment(eventDate).isSame(year, "year");
    });
  },

  //returns a array sorted by count of {song: <song>, count: <count>}
  songsByFrequencyPlayed: arr => {
    const counted = [];
    arr.forEach(title => {
      let pos = counted.find(i => i.song === title);
      if (pos == undefined) {
        let obj = {};
        obj[title] = counted.push(obj);
      } else {
        pos[title]["count"]++;
      }
    });
    return counted.sort((a, b) => b.count - a.count);
  },

  getPlaysBySongandYear: (year, song) => {
    const { setlists } = gratefulSetlist;
    //filters all sets by year

    //reduces sets to value of times played
    const plays = filteredByYear.reduce((acc, cur, indx) => {
      let songTitlesArr = getSetArrFromSetObj(cur);
      if (songTitlesArr.includes(song)) {
        acc++;
      }
      return acc;
    });
    return plays;
  }
};
