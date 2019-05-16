//exports makeAreaChart and clearAreaChart to be imported by bubbleChart
import {
  totalSongData,
  songDataByYear,
  getAllSongDataByYear,
  filterData
} from "./helpers.js";

export const clearAreaChart = () => {
  const svg = d3.select(".selectedAreaChart");
  svg.selectAll("*").remove();
};

export const makeAreaChart = async song => {
  console.log("makeAreaChart called");
  const data = await songDataByYear();
  const width = 400;
  const height = 250;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  let songData = await filterData(song, data);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(songData, d => d.count))
    .range([height - margin.bottom, margin.top]);
  const xScale = d3
    .scaleLinear()
    .domain([1965, 1995])
    .range([margin.left, width - margin.right]);
  const xAxis = g => {
    return g
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(0));
  };
  const yAxis = g => {
    return g
      .attr("transform", `translate(${margin.left + 20}, 0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickValues(3, [`${d3.max(d => d.count) - margin.bottom} `])
      )
      .style("font-size", "1.2em");
  };
  const valueLine = d3
    .line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.count))
    .curve(d3.curveBundle.beta(0.5));
  //.curve(d3.curveCatmullRom.alpha(0.5));

  const svg = d3.select(".selectedAreaChart");
  console.log(svg);
  svg
    .style("width", width)
    .style("height", height)
    //.style("font-size", "12px")
    .attr("font-family", "sans-serif");

  svg
    .append("path")
    .datum(songData)
    .attr("d", valueLine)
    .attr("fill", "none")
    .attr("stroke", "#032385");

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
};
