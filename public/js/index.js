import {
  totalSongData,
  songDataByYear,
  getAllSongDataByYear,
  styleFixedContainer,
  removeFixedStyle,
  makeStealie
} from "./helpers.js";
import { makeRadialBar } from "./radial-bar.js";
import { makeText, makeTimeline } from "./textContent.js";
import { makeBubbleChart } from "./bubbleChart.js";

const years = [
  "1965",
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

const staticData = [
  {
    year: "1965",
    count: "unknown",
    countChange: "",
    unique: "18",
    uniqueChange: ""
  },
  {
    year: "1966",
    count: "unknown",
    countChange: "",
    unique: "69",
    uniqueChange: "+ 51"
  },
  {
    year: "1967",
    hunter: "10%",
    count: "unknown",
    countChange: "",
    unique: "34",
    uniqueChange: "- 35"
  },
  {
    year: "1968",
    hunter: "25%",
    count: "119",
    countChange: "",
    unique: "42",
    uniqueChange: "+ 6"
  },
  {
    year: "1969",
    hunter: "36%",
    count: "137",
    countChange: "+ 18",
    unique: "91",
    uniqueChange: "+ 49"
  },
  {
    year: "1970",
    hunter: "35%",
    count: "139",
    countChange: "+ 2",
    unique: "120",
    uniqueChange: "+ 29"
  },
  {
    year: "1971",
    hunter: "35%",
    barlow: "2%",
    count: "82",
    countChange: "- 57",
    unique: "86",
    uniqueChange: "- 34"
  },
  {
    year: "1972",
    hunter: "40%",
    barlow: "3%",
    count: "86",
    countChange: "+ 4",
    unique: "82",
    uniqueChange: "- 4"
  },
  {
    year: "1973",
    hunter: "48%",
    barlow: "6%",
    count: "73",
    countChange: "- 13",
    unique: "74",
    uniqueChange: "- 8"
  },
  {
    year: "1974",
    hunter: "49%",
    barlow: "6%",
    count: "40",
    countChange: "- 33",
    unique: "80",
    uniqueChange: "+ 6"
  },
  {
    year: "1975",
    hunter: "42%",
    barlow: "4%",
    count: "4",
    countChange: "- 36",
    unique: "29",
    uniqueChange: "- 51"
  },
  {
    year: "1976",
    hunter: "37%",
    barlow: "15%",
    count: "41",
    countChange: "+ 37",
    unique: "64",
    uniqueChange: "+ 35"
  },
  {
    year: "1977",
    hunter: "39%",
    barlow: "13%",
    count: "60",
    countChange: "+ 19",
    unique: "82",
    uniqueChange: "+ 18"
  },
  {
    year: "1978",
    hunter: "38%",
    barlow: "12%",
    count: "81",
    countChange: "+ 21",
    unique: "84",
    uniqueChange: "+ 2"
  },
  {
    year: "1979",
    hunter: "38%",
    barlow: "15%",
    count: "75",
    countChange: "- 6",
    unique: "92",
    uniqueChange: "+ 8"
  },
  {
    year: "1980",
    hunter: "38%",
    barlow: "17%",
    count: "87",
    countChange: "+ 11 ",
    unique: "102",
    uniqueChange: "+ 10"
  },
  {
    year: "1981",
    hunter: "36%",
    barlow: "14%",
    count: "87",
    countChange: "",
    unique: "122",
    uniqueChange: "+ 20"
  },
  {
    year: "1982",
    hunter: "39%",
    barlow: "12%",
    count: "62",
    countChange: "- 15",
    unique: "110",
    uniqueChange: "- 12"
  },
  {
    year: "1983",
    hunter: "38%",
    barlow: "16%",
    count: "66",
    countChange: "+ 4",
    unique: "110",
    uniqueChange: "+/-"
  },
  {
    year: "1984",
    hunter: "36%",
    barlow: "15%",
    count: "64",
    countChange: "+ 2",
    unique: "124",
    uniqueChange: "+ 14"
  },
  {
    year: "1985",
    hunter: "32%",
    barlow: "14%",
    count: "72",
    countChange: "+ 8",
    unique: "128",
    uniqueChange: "+ 4"
  },
  {
    year: "1986",
    hunter: "35%",
    barlow: "13%",
    count: "47",
    countChange: "- 25",
    unique: "123",
    uniqueChange: "- 5"
  },
  {
    year: "1987",
    hunter: "37%",
    barlow: "13%",
    count: "86",
    countChange: "+ 39",
    unique: "130",
    uniqueChange: "+ 7"
  },
  {
    year: "1988",
    hunter: "37%",
    barlow: "12%",
    count: "81",
    countChange: "- 5",
    unique: "134",
    uniqueChange: "+ 4"
  },
  {
    year: "1989",
    hunter: "37%",
    barlow: "14%",
    count: "73",
    countChange: "- 8",
    unique: "136",
    uniqueChange: "+ 2"
  },
  {
    year: "1990",
    hunter: "36%",
    barlow: "14%",
    count: "74",
    countChange: "+ 1",
    unique: "141",
    uniqueChange: "+ 5"
  },
  {
    year: "1991",
    hunter: "37%",
    barlow: "11%",
    count: "74",
    countChange: "",
    unique: "134",
    uniqueChange: "- 7"
  },
  {
    year: "1992",
    hunter: "39%",
    barlow: "10%",
    count: "55",
    countChange: "- 9",
    unique: "132",
    uniqueChange: "- 2"
  },
  {
    year: "1993",
    hunter: "40%",
    barlow: "9%",
    count: "82",
    countChange: "+ 27",
    unique: "142",
    uniqueChange: "+ 10"
  },
  {
    year: "1994",
    hunter: "38%",
    barlow: "9%",
    count: "85",
    countChange: "+ 3",
    unique: "146",
    uniqueChange: "+ 4"
  },
  {
    year: "1995",
    hunter: "35%",
    barlow: "8%",
    count: "47",
    countChange: "- 38",
    unique: "141",
    uniqueChange: "- 5"
  }
];

const fade = (id, start, end, seconds) => {
  let svgToFade = d3.select(`#${id}`)
  svgToFade
    .style("opacity", start)
    .transition()
    .duration(seconds * 1000)
    .style("opacity", end)
}

const hide = (id) => {
  let elToHide =d3.select(`#${id}`)
  elToHide 
    .style("visibility", "hidden")
}

const reveal = (id) => {
  let elToReveal = d3.select(`#${id}`)
  elToReveal
    .style("visibility", "visible")
}

const hideYearCount = () => {
  hide("count-title")
  hide("year-count")
  hide("song-count")

};
const showYearCount = () => {
  reveal("count-title")
  reveal("year-count")
  reveal("song-count")
};



//vertical fixed timeline showing current year

const clearTicks = () =>
  d3
    .selectAll(".year-tick")
    .style("visibility", "hidden")
    .style("font-size", ".5em");

const activeTicks = year => {
  d3.select(`#year-tick-1995`)
    .html("1995")
    .style("opacity", ".7")
    .style("color", "var(--site-white)")
    .style("font-size", "1em")
    .style("visibility", "visible");
  d3.select(`#year-tick-1965`)
    .html("1965")
    .style("opacity", ".7")
    .style("font-size", "1em")
    .style("color", "var(--site-white)")
    .style("visibility", "visible");
  d3.select(`#year-tick-${year}`)
    .html(`${year}`)
    .style("font-size", "1.5em")
    .style("color", "var(--site-white)")
    .style("visibility", "visible");
};

//Boolean flags toggled when chart first animates to lock the career charts from rebuilding
let careerRadialMade = false;
let careerBubbleMade = false;

// SCROLL FUNCTION called on scroll into career radial chart
const careerRadial = async () => {
  reveal("stealie-container")
  reveal("career-radial-title")
  fade("stealie-container", ".1", ".9", 5)
  clearTicks();
  removeFixedStyle();
  hideYearCount();
  hide("timeline-container")
  if (!careerRadialMade) {
    makeRadialBar("career");
    careerRadialMade = true;
  }
};

//SCROLL FUNCTION called on scroll into career bubble chart
const careerBubble = async () => {
  reveal("stealie-container")
  fade("stealie-container", ".1", ".9", 5)
  hide("career-radial-title")
  clearTicks();
  showYearCount();
  removeFixedStyle();
  hide("timeline-container")
  const data = await totalSongData();
  if (!careerBubbleMade) {
    careerBubbleMade = true;
    makeBubbleChart(data, "career-chart", "", 400, 400);
  }
};

//TODO Scroll Function called for Spiral 

const careerSpiral = async () => {
  clearTicks();
  removeFixedStyle();
  hideYearCount();
  hideTimeline();
}

//Scroll Function called on scroll into each div with id=${year}
const yearTotals = async year => {
  //reset Career flags when entering year content
  careerBubbleMade = false;
  careerRadialMade = false;
  hide("stealie-container")
  hideYearCount();
  reveal("timeline-container")
  styleFixedContainer();
  clearTicks();
  activeTicks(year);
  const data = await songDataByYear();
  const yearTotal = await getAllSongDataByYear(year, data);
  const uniqueSongs = yearTotal.unique_songs;
  const obj = await staticData.find(d => d.year === year);
  const { unique, uniqueChange, count, countChange } = obj;
  const hunter = obj.hunter ? obj.hunter : undefined;
  const barlow = obj.barlow ? obj.barlow : undefined;

  makeText(year, unique, count, countChange, uniqueChange, hunter, barlow);
  makeBubbleChart(yearTotal.songs, "bubbleChart", year, 200, 200);
  makeRadialBar(year);
};

//make a new Waypoint
function scroll(n, offset, func) {
  return new Waypoint({
    element: document.getElementById(n),
    handler: function(direction) {
      let prev = Number(n) - 1;
      prev = prev.toString();
      direction == "down" ? func(n) : func(prev);
    },
    offset: offset
  });
}
//append blank div to scroll container

const scrollDiv = () => {
  d3.selectAll(".scroll-trigger").append("div").style("min-height", "400px")
}
hide("stealie-container")
scrollDiv();
makeTimeline();
hide("timeline-container")
hideYearCount();
makeStealie('hero-container')
hide("stealie-container")

new scroll("1962", "10%", careerRadial);

new scroll("1963", "10%", careerBubble);

new scroll("1964", "10%", careerSpiral);

years.forEach(year => {
  new scroll(year, "35%", yearTotals);
});
