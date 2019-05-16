import {
  totalSongData,
  songDataByYear,
  getAllSongDataByYear,
  spiral
} from "./helpers.js";

import {makeAreaChart, clearAreaChart} from "./areaChart.js"

const colors = ["#2c0ef0", "#b300ff", "#6751f0", "#ff006f", "#8119ff"];
const colorsA = ["var(--p1)", "var(--p2)", "var(--p3)", "var(--p4)", "var(--p5)" ]

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

  const countExtent = d3.extent(data, d => d.count);

  const colorScale = d3.scaleOrdinal().range(colorsA);

  const pack = data =>
    d3
      .pack()
      .size([width - 2, height - 2])
      .padding(0)(
      d3.hierarchy({ children: d3.shuffle(data) }).sum(d => d.count)
    );

  const root = pack(data);
  const rootData = root.leaves();
  const rExtent = d3.extent(rootData, d => d.r);

  const mean = d3.mean(data, d => d.count);
  const extent = d3.extent(data, d => d.count);
  let countStr = extent[1].toString()

  if (year) {
    const activeYear = d3.select(".active-year").text(`All Songs - ${year}`);
  }

  let selector = id === "bubbleChart" ? "active-title" : "active-title-main";
  const title = d3.select(`.${selector}`);
  let songName = id === "bubbleChart" ? "name" : "song";


  const svg = d3.select(`#${id}`);
  svg
    .style("width", width)
    .style("height", height)
    //.style("font-size", "12px")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle");

  let tooltip = d3
    .select(`body`)
    .append("div")
    .attr("class", "tooltip");

  const leaf = svg
    .selectAll("g")
    .data(rootData)
    .join("g")
    .attr("transform", d => `translate(${d.x + 0},${d.y + 0})`);

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
    .attr("r", 0)
    .style("fill", (d, i) => colorScale(i))
    .attr("fill-opacity", .5)
    .attr("class", d => d.id)
    .attr("class", "leafs")
    .transition()
    .delay((d, i) => Math.random(i) * i * 4)
    .duration((d, i) => i * 80)
    .attr("r", d => d.r - 0.25)

    .text(d => d.data[songName])
    .attr("fill-opacity", 1);

  leaf
    .append("clipPath")
    .attr("id", d => (d.clipUid = d.id))
    .append("use")
    .attr("href", d => d.href);

  leaf
    .append("text")
    .text(function(d) {
      if (d.data.count > mean) return d.data[songName];
    })

    .style("font-size", function(d) {
      return (
        Math.min(
          2 * d.r,
          ((2 * d.r - 10) / this.getComputedTextLength()) * 10
        ) + "px"
      );
    })
    .style("fill", "#edeee0")
    //.style("fill", "#393634")
    .attr("dy", ".20em");

  let circles = d3.selectAll(".leafs");

  circles.each(setToolTip);

  const legend = svg.append("g").attr("class", "legend");
  const legendPosition = { cx: 250, cy: 545 };
  let padding = 20;
  let delay = 15000;

  legend
    .append("rect")
    .attr("width", 170)
    .attr("height", 90)
    .attr("x", 222)
    .attr("y", 510)
    .style("stroke", "var(--site-black)")
    .style("stroke-opacity", ".4")
    .style("fill", "var(--site-black)")
    .style("fill-opacity", ".2")
    .style("box-shadow", "2px 2px 2px var(--site-black)");

  legend
    .append("circle")
    .attr("id", "legend-max")
    .attr("r", rExtent[1] - 0.25)
    .style("fill", "var(--site-white)")
    //.style("fill-opacity", ".5")
    .attr("transform", `translate(${legendPosition.cx},${legendPosition.cy})`)
    .attr("stroke", "var(--trippy-blues-3)");

  legend
    .append("circle")
    .attr("id", "legend-min")
    .attr("r", rExtent[0] - 0.25)
    .style("fill", "var(--site-white)")
    //.style("fill-opacity", ".5")
    .attr(
      "transform",
      `translate(${legendPosition.cx + 95 + padding},${legendPosition.cy})`
    )
    .attr("stroke", "var(--trippy-blues-3)");

  legend
    .append("circle")
    .attr("id", "legend-mean")
    .attr("r", rExtent[1] / 2 - 0.25)
    .style("fill", "var(--site-white)")
    .style("fill-opacity", ".9")
    .attr(
      "transform",
      `translate(${legendPosition.cx + 55 + padding},${legendPosition.cy})`
    )
    .attr("stroke", "var(--trippy-blues-3)");

  legend
    .append("text")
    .attr("x", `${legendPosition.cx - rExtent[1] / 2}`)
    .attr("y", `${legendPosition.cy + 50}`)
    .style("text-anchor", "start")
    .attr("fill", "var(--trippy-blues-1)")
    .text(`${extent[1]}`);

  legend
    .append("text")
    .attr("x", `${legendPosition.cx + 55 - rExtent[1] * 0.75 + padding}`)
    .attr("y", `${legendPosition.cy + 50}`)
    .style("text-anchor", "start")
    .attr("fill", "var(--trippy-blues-1)")
    .text(`334`);

  legend
    .append("text")
    .attr("x", `${legendPosition.cx + 95 + padding}`)
    .attr("y", `${legendPosition.cy + 50}`)
    .style("text-anchor", "start")
    .attr("fill", "var(--p-4)")
    .text(`1`);

  legend
    .style("visibility", "hidden")
    .transition()
    .delay(delay)
    .style("visibility", "visible");

  const yearCount = d3
    .select("#year-count")
    .text("")
    .attr("class", "bold")
    .style("font-size", "5em")
    .style("color", "var(--site-black)")
    //.style("opacity", ".7")
    .transition()
    .duration(15000)
    .tween("text", function() {
      var i = d3.interpolateRound(1965, 1995);
      return function(t) {
        this.textContent = i(t);
      };
    })
    .transition()
    .duration(200)
    .style("font-size", "3em")
    .text("1964-1995");

    const songCounter = d3
      .select("#song-count")
      .text("")
      .attr("class", "bold")
      .style("font-size", "4em")
      .style("color", "var(--site-black)")
      .style("opacity", ".7")
      .transition()
      .duration(15000)
      .tween("text", function() {
        let i = d3.interpolateRound(1, extent[1])
        return function (t) {
          this.textContent = i(t)
        }
      })
      //.transition()
      //.style("visibility", "hidden")

  function setToolTip(d) {
    d3.select(this)
      .on("mouseover", showTooltip)
      .on("mouseout", hideTooltip);
  }

  function showTooltip(d) {
 
    let left = d3.event.pageX + 70 + "px";
    let top = d3.event.pageY - 70 + "px";
    console.log(`tool tip at ${left} left and ${top} right`);
    tooltip
      .style("left", left)
      .style("top", top)
      .style("display", "inline-block")

      let selectedSong = tooltip.append('h3').attr('class', "tooltip-title")
      selectedSong.text(d.data[songName])
      
      let selectedBody = tooltip.append("p").attr("class", "tooltip-body")
      selectedBody.text(`Played ${d.data.count} times`)
      
      let selectedGraph = tooltip.append("svg").attr("class", "selectedAreaChart")
      makeAreaChart(d.data[songName])

  }

  function hideTooltip() {
   let title = d3.selectAll(".tooltip-title")
   title.remove();
   let body = d3.selectAll(".tooltip-body")
   body.remove();
   let graph = d3.selectAll(".selectedAreaChart")
   graph.remove();
  }

};

export const makeBubbleChart = (songs, id, year, width, height) => {
  clearBubbleChart();

  makeChart(songs, id, year, width, height);
};
