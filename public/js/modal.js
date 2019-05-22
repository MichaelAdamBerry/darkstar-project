import { makeAreaChart, clearAreaChart } from "./areaChart.js";

const closeModal = () => {
  d3.select("#modal").style("display", "none");
  d3.select("#modal-overlay").style("display", "none");
};

export const showModal = song => {
  d3.select("#modal").style("display", "block");
  d3.select("#modal-overlay").style("display", "block");
};

export const makeModalCloseBtn = () => {
  const closebtn = d3
    .select("#modal-content")
    .append("button")
    .attr("class", "modal-close")
    .text("close");

  closebtn.on("click", () => {
    d3.selectAll("#modal-content > div").remove();
    let svg = d3.select("#modal-line-chart");
    svg.selectAll("*").remove();
    svg.remove();
    closeModal();
  });
};

export const makeModalContent = (song, count) => {
  let modal = d3.select("#modal-content");

  let div = modal
    .append("div")
    .append("div")
    .attr("class", "modal-data");

  div.append("h3").text(`${song}`);
  div.append("p").text(`Played ${count} times`);

  modal
    .append("svg")
    .attr("class", "selectedAreaChart")
    .attr("id", "modal-line-chart");
  makeAreaChart(song);
};
