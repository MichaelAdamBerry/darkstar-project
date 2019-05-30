import { showModal, makeModalContent } from "./modal.js";

const colorsA = ["#991d18", "#791d38", "#591d58", "#391d78", "#191d98"];

const clearBubbleChart = () => {
  const svg = d3.select("#bubbleChart");
  svg.selectAll("*").remove();
};

const clearCareerBubble = () => {
  const svg = d3.select("#career-chart");
  svg.selectAll("*").remove();
};

const makeChart = (data, id, year, width, height) => {
  //clear svg before building new

  clearBubbleChart();
  clearCareerBubble();

  const colorScale = d3.scaleOrdinal().range(colorsA);

  const pack = data =>
    d3
      .pack()
      .size([150, 150])
      .padding(10)(d3.hierarchy({ children: data }).sum(d => d.count));

  //const shuffledData = d3.shuffle(data);
  const root = pack(data);
  const shuffleRoot = pack(d3.shuffle(data));
  const shuffleRootData = shuffleRoot.leaves();

  if (year) {
    const activeYear = d3.select(".active-year").text(`All Songs - ${year}`);
  }

  let selector = id === "bubbleChart" ? "active-title" : "active-title-main";
  const title = d3.select(`.${selector}`);
  let songName = id === "bubbleChart" ? "name" : "song";
  let tranlateLeafY = id === "bubbleChart" ? 0 : -11;
  let translateX = id === "bubbleChart" ? 60 : 60;
  let widthVar = id === "bubbleChart" ? 155 : 300;
  let heightVar = id === "bubbleChart" ? 200 : 200;
  let translateSVG = id === "bubbleChart" ? 4 : 4;
  let viewBoxX = id === "bubbleChart" ? 60 : 0;

  const availWidth = window.screen.availWidth;

  if (availWidth <= 425) {
    widthVar = 168;
    viewBoxX = 62;
    translateSVG = translateSVG + 3;
    d3.select(".career-chart-container div.stealie-absolute")
      .style("max-width", "91%")
      .style("width", "91%")
      .style("margin-left", "0");
  }

  const svg = d3.select(`#${id}`);
  svg
    .attr("viewBox", `${viewBoxX} 0 ${widthVar} ${heightVar}`)
    // .style("width", widthVar)
    // .style("max-width", "1000px")
    // .style("height", heightVar)
    //.style("font-size", "12px")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle")
    .style("transform", `translate(${translateSVG}%, 0)`);

  let tooltip = d3
    .select(`body`)
    .append("div")
    .attr("class", "tooltip");

  const defs = svg.append("defs");

  const leaf = svg
    .selectAll("g")
    .enter()
    .data(shuffleRootData)
    .join("g")
    .attr("transform", (d, i) => {
      const num = i % 2 === 0 ? -2 : 2;
      return `translate(${d.x + translateX - i * num - i},${d.y -
        tranlateLeafY})`;
    });

  //

  leaf
    .on("mouseover", async function(d) {
      title.text(data[songName]);
      title.style("visibility", "visible");
    })
    .on("mouseleave", d => {
      title.text("");
    });

  leaf
    .append("circle")
    .attr("id", d => d.id)
    .attr("r", d => d.r * Math.random())
    .style("fill", function(d, i) {
      return colorScale(i);
    })
    .style("cursor", "pointer")
    .attr("class", d => d.id)
    .attr("class", "leafs")
    .transition()
    .attr("transform", (d, i) => {
      const num = i % 2 === 0 ? -2 : 2;
      return `translate(${i * num + i}, 0)`;
    })
    .duration(3000)
    .attr("r", d => d.r)
    .text(d => d.data[songName]);

  leaf
    .append("clipPath")
    .attr("id", d => (d.clipUid = d.id))
    .append("use")
    .attr("href", d => d.href);

  let circles = d3.selectAll(".leafs");

  circles.each(setToolTip);

  function setToolTip(d) {
    d3.select(this)
      .on("mouseover", showTooltip)
      .on("mouseout", hideTooltip)
      .on("click", () => {
        let count = d.data.count;
        let song = d.data[songName];
        showModal();
        makeModalContent(song, count);
      });
  }

  function showTooltip(d) {
    let left = d3.event.pageX + 15 + "px";
    let top = d3.event.pageY - 50 + "px";
    tooltip
      .style("left", left)
      .style("top", top)
      .style("display", "inline-block");

    let selectedSong = tooltip.append("h3").attr("class", "tooltip-title");
    selectedSong.text(d.data[songName]);

    let selectedBody = tooltip.append("p").attr("class", "tooltip-body");
    selectedBody.text(`Played ${d.data.count} times`);

    let selectedInstruction = tooltip
      .append("p")
      .attr("class", "tooltip-instruction")
      .attr("class", "tooltip-body")
      .text("click to see song history")
      .style("font-size", "smaller")
      .style("font-style", "italic");
  }

  function hideTooltip() {
    let title = d3.selectAll(".tooltip-title");
    title.remove();
    let body = d3.selectAll(".tooltip-body");
    body.remove();
    tooltip.style("display", "none");
  }
};

export const makeYearBubbleChart = (songs, id, year, width, height) => {
  clearBubbleChart();

  makeChart(songs, id, year, width, height);
};
