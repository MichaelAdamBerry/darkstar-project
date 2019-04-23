import {
  totalSongData,
  songDataByYear,
  getAllSongDataByYear,
  filterData,
  addImage
} from "./helpers.js";

import { makeBubbleChart } from "./bubbleChart.js";

let years = [
  "1966",
  "1967",
  "1968",
  "1969",
  "1970",
  "1971",
  "1972",
  "1973",
  "1974",
  "1975",
  "1976",
  "1977",
  "1978",
  "1979",
  "1980",
  "1982",
  "1983",
  "1984",
  "1985",
  "1986",
  "1987",
  "1988",
  "1989",
  "1990",
  "1991",
  "1992",
  "1993",
  "1994",
  "1995"
];

const careerTotals = async () => {
  const data = await totalSongData();
  const filteredData = await filterData(data);

  makeBubbleChart(filteredData);
};

const yearTotals = async year => {
  const data = await songDataByYear();
  const yearTotal = await getAllSongDataByYear(year, data);
  makeBubbleChart(yearTotal.songs, year);
};

function scroll(n, offset, func) {
  return new Waypoint({
    element: document.getElementById(n),
    handler: function(direction) {
      let prev = Number(n) - 1;
      prev = prev.toString();
      direction == "down" ? func(n) : func(prev);
      console.log("scrolling handler ", n, direction);
    },
    offset: offset
  });
}

years.forEach(year => {
  new scroll(year, "75%", yearTotals);
});
