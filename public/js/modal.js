import { makeAreaChart, clearAreaChart } from "./areaChart.js";
import { bolt } from "./svgMakers.js";

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

  modal
    .append("svg")
    .attr("class", "selectedAreaChart")
    .attr("id", "modal-line-chart");

  modal.append("div").attr("class", "bolt");
  bolt();
  makeAreaChart(song);
};
