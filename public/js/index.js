import {
  styleFixedContainer,
  removeFixedStyle,
  hide,
  reveal
} from "./helpers.js";
import {
  totalSongData,
  songDataByYear,
  getAllSongDataByYear,
  yearArr,
  staticDataObj
} from "./fetchData.js";
import { makeStealie } from "./svgMakers.js";
import { makeRadialBar } from "./radial-bar.js";
import { makeText, makeTimeline } from "./textContent.js";
import { makeBubbleChart } from "./bubbleChart.js";
import { makeYearBubbleChart } from "./bubbleMin.js";
import { makeModalCloseBtn, showModal } from "./modal.js";
import { makeCard } from "./card.js";

const staticData = staticDataObj();

//appends svg cards for each year
makeCard();

//appends skull background to the career chart containters and hides them

makeStealie("#career-bubble-chart");
makeStealie("#career-radial-bar");
// hide("stealie-container", ".");
hide("career-radial-bar-container", ".");
hide("career-chart-container", ".");

//function invoked immediately after html is constructed
//checks for small screen size and makes changes for
//svg attributes difficult to target with media queries
let mobileFlag;
const resizeForMobile = () => {
  let availWidth = window.screen.availWidth;
  let modal = d3.select("#modal");
  if (availWidth <= "425") {
    mobileFlag = true;
    d3.select("#timeline-container").style("display", "none");
    d3.selectAll("#sections .card-container")
      .style("width", "90%")
      .style("margin", "auto");
    modal.style("height", "60%");
    d3.selectAll(".flex-charts-text").style("display", "block");
    d3.selectAll(".career-scroll").style("width", "90%");
    d3.select(".career-radial-bar-container").style("width", "94%");
    d3.select("career");
    d3.select(".career-chart-container").style("width", "95%");
    d3.select("#career-bubble-chart div.stealie-absolute")
      .style("top", "654px")
      .style("margin-top", "0")
      //padding not responding here ?? -- quick fix  --> adjusted in bubbleChart.js
      .style("padding-top", "0")
      .style("width", "100%");

    d3.selectAll(".byline").classed("mobile-font width-80", true);

    d3.selectAll(".scroller-div")
      .style("opacity", ".95")
      .style("max-width", "100%")
      .style("margin", "auto")
      .style("background", "var(--site-white)")
      .style("min-height", "100vh")
      .style("padding", "10% 0");

    d3.selectAll(".title").style("max-width", "90%");

    d3.selectAll(".title h3").style("font-size", "150px");

    d3.selectAll(".hero-text")
      .style("max-width", "90%")
      .style("min-width", "90%")
      .style("font-size", "50px");

    d3.selectAll(".explainer-text div.lead")
      .style("max-width", "90%")
      .style("margin", "auto")
      .style("display", "block")
      .classed("mobile-font", true)
      .classed("mobile-line-height", true);

    // d3.selectAll("p.mobile-font").style("line-height", "1.8em");

    d3.selectAll(".debut-links")
      .style("font-size", "2em")
      .attr("classs", "roboto");

    d3.select("#sections").style("width", "100%");
    d3.selectAll(".scroller-text")
      // .style("width", "80%")
      .style("position", "unset")
      .style("margin", "auto");
    d3.selectAll(".scroller-text p").style("padding-right", "0");
    d3.selectAll(".scroller-text div")
      .style("max-width", "100%")
      .style("font-size", "1.8em");
    d3.select(".career-scroll-bubble").style("padding-bottom", "40vh");
    d3.select("#section-title").style("margin-top", "400px");

    d3.selectAll("#sections div.scroll-trigger")
      .style("display", "block")
      .style("height", "2500px")
      .style("margin-top", "240px");
    d3.selectAll(".card-flex-container").style("width", "100%");
    d3.selectAll(".card-container").style("max-width", "95%");
    d3.selectAll(".charts-year-container-col")
      .style("width", "100%")
      .style("margin", "auto")
      .style("min-height", "1200px")
      .style("display", "block");
    d3.selectAll(".charts-year-container-col div")
      .style("max-width", "100%")
      .style("margin-left", "0");
    d3.select(".me p").classed("margin-t-none", true);
  } else {
    mobileFlag = false;
  }
};

resizeForMobile();

//helpful array of strings for each year to be called to make waypoint objects
const years = yearArr();

//vertical timeline visability functions
const hideYearCount = () => {
  hide("count-title");
  hide("year-count");
  hide("song-count");
};
const showYearCount = () => {
  reveal("count-title");
  reveal("year-count");
  reveal("song-count");
};
const clearTicks = () =>
  d3
    .selectAll(".year-tick")
    .style("visibility", "hidden")
    .style("font-size", ".5em");

const activeTicks = year => {
  d3.select(`#year-tick-1995`)
    .html("1995")
    .style("opacity", ".7")
    .style("color", "var(--site-black)")
    .style("font-size", "1em")
    .style("visibility", "visible");
  d3.select(`#year-tick-1965`)
    .html("1965")
    .style("opacity", ".7")
    .style("font-size", "1em")
    .style("color", "var(--site-black)")
    .style("visibility", "visible");
  d3.select(`#year-tick-${year}`)
    .html(`${year}`)
    .style("font-size", "1.5em")
    .style("color", "var(--site-black)")
    .style("visibility", "visible");
};

//Boolean flags toggled when chart first animates to
//lock the career charts from rebuilding on a user scrolling upward
let careerRadialMade = false;
let careerBubbleMade = false;

// //SCROLL FUNCTION called lead in text
// const mainContent = () => {
//   let className = mobileFlag === true ? "mobile-font" : "desktop-font";
//   let blockWidth = mobileFlag === true ? "width-80" : "width-500";
//   let lineheight =
//     mobileFlag === true ? "mobile-line-height" : "desktop-line-height";
//   d3.select(".lead")
//   .classed(lineheight)
//   .html(
//     `
//     <p class="${className} margin-t-lg">
//             Even for die hard deadheads The Grateful Dead can be difficult to categorize.
//             For the uninitiated, the sheer volume of recordings and songs is enough
//             to be scared away. As  <a href="https://observer.com/2015/07/how-i-learned-to-stop-worrying-and-listen-to-the-grateful-dead/">music critic  Tim Sommer sums up nicely--</a></p>
//             <div class="blockquote-container">
//             <blockquote class="margin-t-lg margin-b-lg ${className} ${blockWidth}">Loving the Grateful Dead is like ridin’ that train to Hogwarts—
//             you must believe that the track exists in order to climb aboard.
//             </blockquote>
//             </div>
//     <div class="img-container">
//       <img src="images/group.jpg" alt="group in 1977"/>
//     </div>
//     <p class="${className} margin-t-lg">
//             These visualizations use data from archive.com and setlist.fm
//             to examine what songs were played most,
//                         the size of the repetoir,
//                         and the lifespan of each song.
//     </p>`
//   );
// };

// mainContent();

// SCROLL FUNCTION called on scroll into career radial chart
const careerRadial = async () => {
  clearTicks();
  removeFixedStyle();
  hideYearCount();
  hide("timeline-container");
  if (!careerRadialMade) {
    makeRadialBar("career");
    reveal("career-radial-bar-container", ".");
    careerRadialMade = true;
  }
};

//SCROLL FUNCTION called on scroll into career bubble chart
const careerBubble = async () => {
  clearTicks();
  showYearCount();
  removeFixedStyle();
  hide("timeline-container");
  const data = await totalSongData();
  if (!careerBubbleMade) {
    careerBubbleMade = true;
    makeBubbleChart(data, "career-chart", "", 400, 600);
    reveal("career-chart-container", ".");
  }
};

//TODO Scroll Function called for Spiral
const careerSpiral = async () => {
  clearTicks();
  removeFixedStyle();
  hideYearCount();
  hide("timeline-container");
};

//Scroll Function called on scroll into each div with id=${year} > 1964
const yearTotals = async year => {
  //reset Career flags when entering year content
  //bubble chart will reanimate on upward scroll but radial bar chart will not
  careerBubbleMade = false;
  careerRadialMade = true;
  hideYearCount();
  reveal("timeline-container");
  styleFixedContainer();
  clearTicks();
  activeTicks(year);
  const data = await songDataByYear();
  const yearTotal = await getAllSongDataByYear(year, data);
  const obj = await staticData.find(d => d.year === year);
  const { unique, uniqueChange, count, countChange } = obj;

  makeText(year, unique, count, mobileFlag);
  makeYearBubbleChart(yearTotal.songs, "bubbleChart", year, 400, 600);
  console.log("yearTotals fires with year as ", year);
  makeRadialBar(year);
};

//function per Waypoint docs contructing a new Waypoint scroll function
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
  d3.selectAll(".scroll-trigger")
    .append("div")
    .attr("class", "scroll-padding-div");
};
scrollDiv();
makeTimeline();
hide("timeline-container");
hideYearCount();
makeModalCloseBtn();

//animates / displays the radial bar chart
new scroll("1963", "80%", careerRadial);

//animates / displays the career bubble chart
new scroll("1964", "60%", careerBubble);

//TODO career spiral histogram
// new scroll("1964", "10%", careerSpiral);

years.forEach(year => {
  if (year === "1965") {
    new scroll(year, "10%", yearTotals);
  } else {
    new scroll(year, "99%", yearTotals);
  }
});
