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

makeStealie(".career-chart-container");
makeStealie("#career-radial-bar");
// hide("stealie-container", ".");
hide("career-radial-bar-container", ".");
hide("career-chart-container", ".");

//function invoked immediately after html is constructed
//detects screen size and makes necessary changes for
//svg attributes difficult to target with media queries
let mobileFlag;
const resizeForMobile = () => {
  let availWidth = window.screen.availWidth;
  let radial = d3.select(".bar-fixed");
  let bubble = d3.select(".bubble-fixed");
  let scroller = d3.select(".scroller-text");
  if (availWidth <= "425") {
    mobileFlag = true;
    d3.selectAll("#sections .card-container").style("max-width", "95%");
    radial.style("top", "5%");
    bubble.style("top", "5%");
    bubble.style("left", "120px");
    d3.selectAll(".debut-links")
      .style("font-size", "2em")
      .attr("classs", "bold");
    d3.select("#sections").style("width", "90%");
    scroller.style("width", "80%");
    scroller.style("position", "unset");
    scroller.style("margin", "auto");
    d3.selectAll(".scroller-text div")
      .style("max-width", "100%")
      .style("font-size", "2em");
  } else {
    mobileFlag = false;
    d3.selectAll("#sections .card-container").style("max-width", "75%");
    radial.style("top", "50%");
    radial.style("right", "0");
    radial.style("height", "50vh");
    bubble.style("top", "30px");
    bubble.style("height", "50vh");
    bubble.style("right", "0");
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

//SCROLL FUNCTION called lead in text
const mainContent = () => {
  d3.select(".lead").html(
    `
    <p class="drop-letter">
            Even for die hard deadheads The Grateful Dead can be difficult to categorize. 
            For the uninitiated, the shear volume of recordings and songs is enough 
            to be scared away. As music critic  Tim Sommer sums up nicely--
            <blockquote> 
            “Loving the Grateful Dead is like ridin’ that train to Hogwarts—
            you must believe that the track exists in order to climb aboard.”
            </blockquote>
    </p>
    <div class="img-container">
      <img src="images/group.jpg" alt="group in 1977"/>
    </div>
    <p>
            These visualizations use data from archive.com and setlist.fm 
            to examine what songs were played most, 
                        the size of the repetoir,
                        and the lifespan of each song.`
  );
};

mainContent();

// SCROLL FUNCTION called on scroll into career radial chart
const careerRadial = async () => {
  reveal("career-radial-bar-container", ".");

  clearTicks();
  removeFixedStyle();
  hideYearCount();
  hide("timeline-container");
  if (!careerRadialMade) {
    makeRadialBar("career");
    careerRadialMade = true;
  }
};

//SCROLL FUNCTION called on scroll into career bubble chart
const careerBubble = async () => {
  reveal("career-chart-container", ".");
  clearTicks();
  showYearCount();
  removeFixedStyle();
  hide("timeline-container");
  const data = await totalSongData();
  if (!careerBubbleMade) {
    careerBubbleMade = true;
    makeBubbleChart(data, "career-chart", "", 400, 600);
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
  careerBubbleMade = false;
  careerRadialMade = false;
  hideYearCount();
  reveal("timeline-container");
  styleFixedContainer();
  clearTicks();
  activeTicks(year);
  const data = await songDataByYear();
  const yearTotal = await getAllSongDataByYear(year, data);
  const obj = await staticData.find(d => d.year === year);
  const { unique, uniqueChange, count, countChange } = obj;

  makeText(year, unique, count);
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
    .style("min-height", "400px");
};
scrollDiv();
makeTimeline();
hide("timeline-container");
hideYearCount();
makeModalCloseBtn();

//animates / displays the radial bar chart
new scroll("1963", "1%", careerRadial);

//animates / displays the career bubble chart
new scroll("1964", "10%", careerBubble);

//TODO career spiral histogram
// new scroll("1964", "10%", careerSpiral);

years.forEach(year => {
  if (year === "1965") {
    new scroll(year, "10%", yearTotals);
  } else {
    new scroll(year, "35%", yearTotals);
  }
});
