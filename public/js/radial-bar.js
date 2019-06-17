//remember to attribute  Anton Orlov's example at bl.ocks.org

import {
  songDataByYear,
  getAllSongDataByYear,
  totalSongData
} from "./fetchData.js";
import { showModal, makeModalContent } from "./modal.js";

const colors = ["#3f51b5", "#b300ff", "#6751f0", "#d83a2f", "#8119ff"];
const colorsA = [
  "var(--p1)",
  "var(--p2)",
  "var(--p3)",
  "var(--p4)",
  "var(--p5)"
];

export const clearRadialBar = year => {
  const el = d3.select("#radial-bar");
  el.selectAll("*").remove();
  const years = d3.selectAll(`.charts-year-bar-${year} svg`).remove();
};

const clearToolTip = () => {
  d3.selectAll(".tool-tip")
    .selectAll("*")
    .remove();
};

const clearCareerRadialBar = () => {
  const el = d3.select("#career-radial-bar");
  el.selectAll("*").remove();
};

const data = songDataByYear();

//tested in console returns {year: <string>, songs: <array>, uniqueSongs: <number>}
const getSongData = async year => {
  let yearData = await getAllSongDataByYear(year, data);
  return yearData;
};

const topTenSongs = async yearData => {
  const songArr = await yearData;
  return songArr
    .sort((a, b) => b.count - a.count)
    .filter(d => {
      return d.song != "Space" && d.song != "Drums";
    })
    .slice(0, 10);
};

const topFiveSongs = async yearData => {
  const songArr = await yearData.songs;
  return songArr
    .sort((a, b) => b.count - a.count)
    .filter(d => {
      return d.name != "Space" && d.name != "Drums";
    })
    .slice(0, 5);
};

export const radialBar = async year => {
  let { availWidth } = window.screen;
  let textStart = "-5";

  let songData,
    className,
    data,
    width,
    height,
    id,
    songVar,
    top,
    fill,
    left,
    arcPadding,
    labelRectX;

  if (year === "career") {
    songData = await totalSongData();
    data = await topTenSongs(songData);
    width = 120;
    height = 122;
    id = "#career-radial-bar";
    className = "career-bar-svg";
    songVar = "song";
    fill = "#39363470";
    top = 63;
    textStart = -5;
    left = 65;
    arcPadding = 7;
    labelRectX = -57;
  } else {
    songData = await getSongData(year);
    data = await topFiveSongs(songData);
    width = 120;
    height = 122;
    textStart = -1;
    className = `year-bar-svg`;
    id = `.charts-year-bar-${year}`;
    songVar = "name";
    top = 70;
    fill = "var(--trippy-blue-4)";
    left = 60;
    arcPadding = 6;
    labelRectX = -56;
  }
  console.log("screen width", availWidth);
  let viewBoxWidthVar;
  let stealieContainer = d3.select("#career-radial-bar div.stealie-absolute");
  if (availWidth <= 425) {
    viewBoxWidthVar = width;
    stealieContainer.style("width", "100%").style("padding-top", "153px");
  } else {
    viewBoxWidthVar = width;
    stealieContainer.style("padding-top", "153px").style("width", "338px");
  }

  // geometry  and chart variables
  const chartRadius = height / 2;
  const extent = d3.extent(data, d => d.count);

  // sequential color scale option
  const color = d3
    .scaleSequential()
    .domain(extent)
    .interpolator(d3.interpolateRdBu);

  //custom ordinal scale

  const color2 = d3.scaleOrdinal().range(colorsA);

  let tooltip = d3
    .select(`body`)
    .append("div")
    .attr("class", `tooltip`);

  let topPadding = 30;

  const svg = d3
    .select(`${id}`)
    .append("svg")
    .attr("id", "radial-chart-svg")
    .attr("class", className)
    .attr("viewBox", `3 0 ${viewBoxWidthVar} ${height + topPadding}`)
    .style("margin-left", "0px")
    .append("g")
    .style("transform", `translate(${left}px ,${top}px)`);

  const PI = Math.PI,
    arcMinRadius = 10,
    labelPadding = 7,
    numTicks = 5,
    numArcs = data.length;

  //scale
  let scale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.count) * 1.1])
    .range([0, 1.68 * PI]);

  const ticks = scale.ticks(numTicks).slice(0, -1);

  const arcWidth =
    (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;

  const arc = d3
    .arc()
    .innerRadius((d, i) => getInnerRadius(i))
    .outerRadius((d, i) => getOuterRadius(i))
    .startAngle(0)
    .endAngle((d, i) => scale(d));

  let textBgRect = {
    width: 56,
    x: labelRectX,
    y: 0 - height / 2,
    height: height / 2
  };

  const radialAxis = svg
    .append("g")
    .attr("class", "r axis")
    .selectAll("g")
    .data(data)
    .enter()
    .append("g");
  radialAxis
    .append("circle")
    .attr("r", (d, i) => getOuterRadius(i) + arcPadding);

  let axialAxis = svg
    .append("g")
    .attr("class", "a axis")
    .selectAll("g")
    .data(ticks)
    .enter()
    .append("g")
    .attr("transform", d => "rotate(" + (rad2deg(scale(d)) - 90) + ")");

  axialAxis.append("line").attr("x2", chartRadius);

  const textBg = svg.append("g");

  textBg
    .append("rect")
    .attr("width", textBgRect.width)
    .attr("height", textBgRect.height)
    .attr("x", textBgRect.x)
    .attr("y", textBgRect.y)
    .style("stroke", "var(--site-black)")
    .style("stroke-width", ".3px")
    .style("stroke-opacity", ".4")
    .style("fill", "var(--site-white)")
    .style("fill-opacity", ".95")
    .style("box-shadow", "2px 2px 20px var(--site-black)");

  let labelText = svg
    .selectAll(".label-text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", textStart)
    .attr("y", (d, i) => -getOuterRadius(i))
    .style("fill", (d, i) => color2(i))
    .transition()
    .delay((d, i) => i * 400)
    .text((d, i) => {
      let str = d[songVar];
      if (str.length < 22) {
        return str;
      } else if (str.length > 22) {
        return `${str.slice(0, 18)}...`;
      }
    })
    .attr("text-anchor", "end")
    .attr("class", "roboto")

    .style("cursor", "pointer");

  labelText.each(setToolTip);

  if (year !== "career" && availWidth < 425) {
    labelText.style("font-size", ".35em");
  } else {
    labelText.style("font-size", ".35em");
  }

  axialAxis
    .append("text")
    .attr("x", chartRadius + 10)
    .style("text-anchor", d =>
      scale(d) >= PI && scale(d) < 2 * PI ? "end" : null
    )
    .attr(
      "transform",
      d =>
        "rotate(" + (90 - rad2deg(scale(d))) + "," + (chartRadius + 5) + ",0)"
    )
    .text(d => d.name);

  // let position = { x: 77, y: -34 };
  // let rect = { padding: 15, width: 100 };

  // const intstructionsBg = svg.append("g");

  // intstructionsBg
  //   .append("rect")
  //   .attr("width", 25)
  //   .attr("height", 25)
  //   .attr("x", 75)
  //   .attr("y", -40)
  //   .attr("id", "radial-instructions-rect")
  //   .attr("class", "mobile-hide")
  //   .style("stroke", "var(--p1)")
  //   .style("stroke-width", ".5px")
  //   .style("fill", "var(--site-white)")
  //   .style("fill-opacity", ".8")
  //   .style("box-shadow", "2px 2px 5px var(--site-black)");

  // const instructions = svg.append("g").attr("class", "radial-text");

  // instructions
  //   .append("text")
  //   .attr("x", position.x)
  //   .attr("y", position.y)
  //   .attr("id", "radial-instructions-text")
  //   .attr("class", "mobile-hide")
  //   .style("text-anchor", "start")
  //   .style("font-size", ".25em")
  //   .style("font-family", `"Roboto", sans-serif`)
  //   .html(
  //     `Hover over
  //       <tspan x="${position.x}" y="${position.y + 5}">song bar for</tspan>
  //       <tspan x="${position.x}" y="${position.y + 10}">more</tspan>
  //       <tspan x="${position.x}" y="${position.y + 15}">information</tspan>`
  //   );

  let colorBase = "var(--site-white)";
  let stroke = "#2f2f2f25";
  let count = 0;
  const circles = d3
    .selectAll(".axis circle")
    .attr("fill", colorBase)
    .style("stroke", stroke);

  let arcs = svg
    .append("g")
    .attr("class", "data")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("class", "arc")
    .style("fill", (d, i) => color2(i))
    .style("cursor", "pointer");

  arcs
    .transition()
    .delay((d, i) => i * 400)
    // .duration(1000)
    .attrTween("d", arcTween);

  let allArcs = d3.selectAll(`${id} .arc`);

  allArcs.each(setToolTip);

  function arcTween(d, i) {
    let interpolate = d3.interpolate(0, d.count);
    return t => arc(interpolate(t), i);
  }

  function getInnerRadius(index) {
    return arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
  }

  function getOuterRadius(index) {
    return getInnerRadius(index) + arcWidth;
  }

  function rad2deg(angle) {
    return (angle * 180) / PI;
  }

  function setToolTip(d) {
    d3.select(this)
      .on("mouseover", showTooltip)
      .on("mouseout", hideTooltip)
      .on("click", () => {
        let count = d.count;
        let song = d[songVar];
        showModal();
        makeModalContent(song, count);
      });
  }

  function showTooltip(d) {
    let left = d3.event.pageX + 15 + "px";
    let top = d3.event.pageY - 50 + "px";
    console.log(`tool tip at ${left} left and ${top} right`);
    tooltip
      .style("left", left)
      .style("top", top)
      .style("display", "inline-block")
      .append("h3")
      .attr("class", "tooltip-title")
      .text(d[songVar])
      .append("p")
      .text(`Played ${d.count} times in ${year}`)
      .append("p")
      .attr("class", "tooltip-instruction")
      .attr("class", "tooltip-body")
      .text("click to see song history")
      .style("font-size", "smaller")
      .style("font-style", "italic");
  }

  if (year != "career") {
    tooltip.style("font-size", ".7em");
  } else {
    tooltip.style("font-size", "1em");
  }

  function hideTooltip() {
    let title = d3.selectAll(".tooltip-title");
    title.remove();
    let body = d3.selectAll(".tooltip-body");
    body.remove();
    tooltip.style("display", "none");
  }
};

export const makeRadialBar = (year, id) => {
  clearToolTip();
  clearRadialBar(year);
  // clearCareerRadialBar();

  radialBar(year);
};
