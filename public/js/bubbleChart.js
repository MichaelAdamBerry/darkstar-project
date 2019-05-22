import {
  totalSongData,
  songDataByYear,
  getAllSongDataByYear,
  spiral
} from "./helpers.js";

import { showModal, makeModalContent } from "./modal.js";

const colors = ["#2c0ef0", "#b300ff", "#6751f0", "#ff006f", "#8119ff"];
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

  const countExtent = d3.extent(data, d => d.count);

  const colorScale = d3.scaleOrdinal().range(colorsA);

  const pack = data =>
    d3
      .pack()
      .size([width + 1, height + 1])
      .padding(10)(d3.hierarchy({ children: data }).sum(d => d.count));

  //const shuffledData = d3.shuffle(data);
  const root = pack(data);
  const shuffleRoot = pack(d3.shuffle(data));
  const shuffleRootData = shuffleRoot.leaves();
  console.log("root is ", root);
  const rootData = root.leaves();
  console.log("rootData is", rootData);
  const rExtent = d3.extent(rootData, d => d.r);

  const mean = d3.mean(data, d => d.count);
  const extent = d3.extent(data, d => d.count);
  let countStr = extent[1].toString();

  if (year) {
    const activeYear = d3.select(".active-year").text(`All Songs - ${year}`);
  }

  let selector = id === "bubbleChart" ? "active-title" : "active-title-main";
  const title = d3.select(`.${selector}`);
  let songName = id === "bubbleChart" ? "name" : "song";
  let tranlateLeafY = id === "bubbleChart" ? 0 : 100;
  let translateX = id === "bubbleChart" ? 0 : 250;
  let widthVar = id === "bubbleChart" ? width : width + 500;
  let heightVar = id === "bubbleChart" ? height : height + 350;

  const svg = d3.select(`#${id}`);
  svg
    .style("width", widthVar)
    .style("height", heightVar)
    //.style("font-size", "12px")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle")
    .style("transform", `translate(-${translateX}px, 0px)`);

  let tooltip = d3
    .select(`body`)
    .append("div")
    .attr("class", "tooltip");

  const defs = svg.append("defs");

  //Filter for the outside glow
  var filter = defs.append("filter").attr("id", "glow");
  filter
    .append("feGaussianBlur")
    .attr("stdDeviation", "1.5")
    .attr("result", "coloredBlur");
  var feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode").attr("in", "coloredBlur");
  feMerge.append("feMergeNode").attr("in", "SourceGraphic");

  let backgroundGradient = defs
    .append("radialGradient")
    .attr("class", "backgroundGradientOffset")
    .attr("cx", "50%")
    .attr("cy", "50%")
    .attr("r", "95%")
    .attr("id", `backgroundGradient`);

  let backgroundBase = "#2f2f2f";
  backgroundGradient
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", d3.rgb(backgroundBase).brighter(6));
  backgroundGradient
    .append("stop")
    .attr("offset", "30%")
    .attr("stop-color", d3.rgb(backgroundBase).brighter(3));

  backgroundGradient
    .append("stop")
    .attr("offset", "50%")
    .attr("stop-color", d3.rgb(backgroundBase));

  backgroundGradient
    .append("stop")
    .attr("offset", "70%")
    .attr("stop-color", d3.rgb(backgroundBase).darker(3));

  backgroundGradient
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", d3.rgb(backgroundBase).darker(6));

  let background = svg
    .append("circle")
    .attr("id", "background-circle")
    .attr("r", 220)
    .attr("cx", 450)
    .attr("cy", 220)
    .style("fill", "url(#backgroundGradient)");

  //.attr("transform", `translate(${translateX},${tranlateLeafY})`);

  let gradientOffset = defs
    .selectAll(".gradientOffset")
    .data(rootData)
    .enter()
    .append("radialGradient")
    .attr("class", "gradientOffset")
    .attr("cx", "25%")
    .attr("cy", "25%")
    .attr("r", "65%")
    .attr("id", (d, i) => `gradOffset-${i}`);

  gradientOffset
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", function(d, i) {
      let temp = colorScale(i);
      console.log(temp);
      return d3.rgb(temp).brighter(1);
    });

  gradientOffset
    .append("stop")
    .attr("offset", "40%")
    .attr("stop-color", (d, i) => d3.rgb(colorScale(i)));

  gradientOffset
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", (d, i) => d3.rgb(colorScale(i)).darker(1.5));

  const leaf = svg
    .selectAll("g")
    .enter()
    .data(shuffleRootData)
    .join("g")
    .attr("transform", (d, i) => {
      const num = i % 2 === 0 ? -10 : 10;

      return `translate(${d.x + translateX - i * num - i},${d.y -
        tranlateLeafY +
        20})`;
    });

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
    // .attr("r", d => rExtent[0])
    .attr("r", d => d.r * Math.random())
    // .attr("x", d => d.x * Math.PI)
    // .attr("y", d => d.y * Math.PI)
    .style("fill", function(d, i) {
      return "url(#gradOffset-" + i + ")";
    })
    .style("filter", "url(#glow)")
    .style("cursor", "pointer")
    //.style("fill", (d, i) => colorScale(i))
    // .attr("fill-opacity", 0.5)
    .attr("class", d => d.id)
    .attr("class", "leafs")
    .transition()
    .attr("transform", (d, i) => {
      const num = i % 2 === 0 ? -10 : 10;
      return `translate(${i * num + i}, 0)`;
    })
    // .delay((d, i) => Math.random(i) * i * 4)
    .duration(3000)
    .attr("r", d => d.r - 0.25)

    // .attr("x", d => d.x)
    // .attr("y", d => d.y)

    .text(d => d.data[songName]);
  // .attr("fill-opacity", 1);

  leaf
    .append("clipPath")
    .attr("id", d => (d.clipUid = d.id))
    .append("use")
    .attr("href", d => d.href);

  // leaf
  //   .append("text")
  //   .text(function(d) {
  //     if (d.data.count > mean) return d.data[songName];
  //   })

  //   .style("font-size", function(d) {
  //     return (
  //       Math.min(
  //         2 * d.r,
  //         ((2 * d.r - 10) / this.getComputedTextLength()) * 10
  //       ) + "px"
  //     );
  //   })
  //   .style("fill", "#edeee0")
  //   //.style("fill", "#393634")
  //   .attr("dy", ".20em");

  let circles = d3.selectAll(".leafs");

  circles.each(setToolTip);

  const legend = svg.append("g").attr("class", "legend");
  const legendPosition = { cx: 30, cy: 350 };
  let padding = 20;
  let delay = 15000;

  legend
    .append("rect")
    .attr("width", 185)
    .attr("height", 100)
    .attr("x", 0)
    .attr("y", 317)
    .style("stroke", "var(--site-black)")
    .style("stroke-opacity", ".4")
    .style("fill", "var(--site-white)")
    .style("fill-opacity", ".8")
    .style("box-shadow", "2px 2px 2px var(--site-black)");

  legend
    .append("circle")
    .attr("id", "legend-max")
    .attr("r", rootData[2].r - 0.25)
    .style("fill", "url(#gradOffset-1)")
    //.style("fill-opacity", ".5")
    .attr("transform", `translate(${legendPosition.cx},${legendPosition.cy})`)
    .attr("stroke", "var(--p1)");

  legend
    .append("circle")
    .attr("id", "legend-min")
    .attr("r", rootData[100].r - 0.25)
    .style("fill", "url(#gradOffset-1)")
    //.style("fill-opacity", ".5")
    .attr(
      "transform",
      `translate(${legendPosition.cx + 105 + padding},${legendPosition.cy})`
    )
    .attr("stroke", "var(--p1)");

  legend
    .append("circle")
    .attr("id", "legend-mean")
    .attr("r", rootData[50].r - 0.25)
    .style("fill", "url(#gradOffset-1")

    .attr(
      "transform",
      `translate(${legendPosition.cx + 55 + padding},${legendPosition.cy})`
    )
    .attr("stroke", "var(--p1)");

  legend
    .append("text")
    .attr("x", `${legendPosition.cx - rootData[0].r / 2}`)
    .attr("y", `${legendPosition.cy + 38}`)
    .style("text-anchor", "start")
    .attr("fill", "var(--site-black)")
    .text(`${rootData[0].data.count}`);

  legend
    .append("text")
    .attr("x", `${legendPosition.cx + 55 - rExtent[1] * 0.75 + padding}`)
    .attr("y", `${legendPosition.cy + 38}`)
    .style("text-anchor", "start")
    .attr("fill", "var(--site-black)")
    .text(`${rootData[50].data.count}`);

  legend
    .append("text")
    .attr("x", `${legendPosition.cx + 95 + padding}`)
    .attr("y", `${legendPosition.cy + 38}`)
    .style("text-anchor", "start")
    .attr("fill", "var(--site-black)")
    .text(`${rootData[100].data.count}`);

  legend
    .style("visibility", "hidden")
    .transition()
    .delay(1000)
    .style("visibility", "visible");

  legend
    .append("text")
    .attr("class", "legend-title-text")
    .attr("x", 90)
    .attr("y", 310 + 98)
    .text("Sized by number of times played")
    .style("font-size", "12px")
    .style("font-style", "italic");

  const type = d3.annotationCallout;

  const annotations = [
    {
      note: {
        label: "to see song history",
        bgPadding: { top: 15, left: 10, right: 10, bottom: 10 },
        title: "Select a circle"
      },
      //can use x, y directly instead of data
      x: 410,
      y: 211,
      className: "show-bg",

      dx: -277,
      dy: -59
    },
    {
      note: {
        label: "Each circle represents a unique song.",
        bgPadding: { top: 15, left: 10, right: 10, bottom: 10 },
        title: "All Songs - 1964-1995"
      },
      //can use x, y directly instead of data

      className: "show-bg",
      y: 17,
      x: 456,
      dy: 84,
      dx: 293
    }
  ];

  const makeAnnotations = d3
    .annotation()
    .editMode(false)
    //also can set and override in the note.padding property
    //of the annotation object
    .notePadding(15)
    .type(type)
    //accessors & accessorsInverse not needed
    //if using x, y in annotations JSON
    .annotations(annotations);

  svg
    .append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations);

  // circle title

  const titleBgCirc = {
    r: 100,
    cx: 800,
    cy: 450
  };

  const titleBg = svg.append("g");
  titleBg
    .append("circle")
    .attr("r", titleBgCirc.r)
    .attr("cx", titleBgCirc.cx)
    .attr("cy", titleBgCirc.cy)
    .style("stroke", "var(--site-black)")
    .style("stroke-opacity", ".4")
    .style("fill", "var(--p2)")
    .style("fill-opacity", ".95")
    .style("box-shadow", "2px 2px 20px var(--site-black)");

  titleBg
    .append("text")
    .attr("class", "bold")
    .attr("x", titleBgCirc.cx - 9)
    .attr("y", titleBgCirc.cy - 35)
    .attr("fill", "var(--site-white)")
    .text("Total Setlist of ")
    .style("font-size", "1.2em");

  titleBg
    .append("text")
    .attr("class", "bold")
    .attr("x", titleBgCirc.cx - 2)
    .attr("y", titleBgCirc.cy)
    .attr("fill", "var(--site-white)")
    .text("Unique Songs Played")
    .style("font-size", "1.2em");

  titleBg
    .append("text")
    .attr("class", "bold")
    .attr("x", titleBgCirc.cx - 10)
    .attr("y", titleBgCirc.cy + 35)
    .attr("fill", "var(--site-white)")
    .text("1965 - 1995")
    .style("font-size", "1em");

  // const yearCount = d3
  //   .select("#year-count")
  //   .text("")
  //   .attr("class", "bold")
  //   .style("font-size", "5em")
  //   .style("color", "var(--site-black)")
  //   //.style("opacity", ".7")
  //   .transition()
  //   .duration(15000)
  //   .tween("text", function() {
  //     var i = d3.interpolateRound(1965, 1995);
  //     return function(t) {
  //       this.textContent = i(t);
  //     };
  //   })
  //   .transition()
  //   .duration(200)
  //   .style("font-size", "3em")
  //   .text("1964-1995");

  // const songCounter = d3
  //   .select("#song-count")
  //   .text("")
  //   .attr("class", "bold")
  //   .style("font-size", "4em")
  //   .style("color", "var(--site-black)")
  //   .style("opacity", ".7")
  //   .transition()
  //   .duration(15000)
  //   .tween("text", function() {
  //     let i = d3.interpolateRound(1, extent[1]);
  //     return function(t) {
  //       this.textContent = i(t);
  //     };
  //   });
  //.transition()
  //.style("visibility", "hidden")

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
    let left = d3.event.pageX + 70 + "px";
    let top = d3.event.pageY - 70 + "px";
    console.log(`tool tip at ${left} left and ${top} right`);
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

export const makeBubbleChart = (songs, id, year, width, height) => {
  clearBubbleChart();

  makeChart(songs, id, year, width, height);
};
