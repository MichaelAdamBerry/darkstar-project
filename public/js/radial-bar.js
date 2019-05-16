//heavily inspired by Anton Orlov's example at bl.ocks.org

import {
  songDataByYear,
  getAllSongDataByYear,
  totalSongData
} from "./helpers.js";

const colors = ["#3f51b5", "#b300ff", "#6751f0", "#d83a2f", "#8119ff"];
const colorsA = ["var(--p1)", "var(--p2)", "var(--p3)", "var(--p4)", "var(--p5)" ]

export const clearRadialBar = () => {
  const el = d3.select("#radial-bar");
  el.selectAll("*").remove();
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
  //data

  let songData, data, width, height, id, songVar, fill;

  if (year === "career") {
    songData = await totalSongData();
    data = await topTenSongs(songData);
    width = 500;
    height = 400;
    id = "#career-radial-bar";
    songVar = "song";
    fill = "var(--site-black)";
  } else {
    songData = await getSongData(year);
    data = await topFiveSongs(songData);
    width = 330;
    height = 270;
    id = "#radial-bar";
    songVar = "name";
    fill = "var(--trippy-blue-4)";
  }

  // geometry  and chart variables
  const chartRadius = height / 2 - 15;
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

  const svg = d3
    .select(`${id}`)
    .append("svg")
    .attr("id", "radial-chart-svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + height / 2 + "," + height / 2 + ")");

  const PI = Math.PI,
    arcMinRadius = 10,
    arcPadding = 5,
    labelPadding = -5,
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

  radialAxis
    .append("text")
    .attr("x", labelPadding)
    .attr("y", (d, i) => -getOuterRadius(i) + arcPadding + 5)
    .transition()
    .delay((d, i) => i * 250)
    .text((d, i) => `${d[songVar]} - ${d.count}`)
    .style("fill", colors[0])
    .style("font-size", "1.2em")
    .style("margin-top", ".3em");

  let axialAxis = svg
    .append("g")
    .attr("class", "a axis")
    .selectAll("g")
    .data(ticks)
    .enter()
    .append("g")
    .attr("transform", d => "rotate(" + (rad2deg(scale(d)) - 90) + ")");

  axialAxis.append("line").attr("x2", chartRadius);

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

  const instructions = svg.append("g").attr("class", "radial-text");

  let position = { x: 155, y: -155 };

  instructions
    .append("text")
    .attr("x", position.x)
    .attr("y", position.y)
    .style("text-anchor", "start")
    .html(
      `Hover over 
        <tspan x="${position.x}" y="${position.y + 15}">song bar for</tspan>
        <tspan x="${position.x}" y="${position.y + 30}">more</tspan>
        <tspan x="${position.x}" y="${position.y + 45}">information</tspan>`
    );

  let arcs = svg
    .append("g")
    .attr("class", "data")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("class", "arc")
    .style("fill", (d, i) => color2(i));

  arcs
    .transition()
    .delay((d, i) => i * 200)
    .duration(1000)
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
      .html(`<h3>${d[songVar]}</h3><p>Played ${d.count} times in ${year}</p>`);
  }

  function hideTooltip() {
    tooltip.style("display", "none");
  }
};

export const makeRadialBar = (year, id) => {
  clearToolTip();
  clearRadialBar();
  clearCareerRadialBar();
  radialBar(year);
};
