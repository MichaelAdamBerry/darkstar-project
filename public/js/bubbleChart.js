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

  let currentSkull = d3.select("#career-bubble-chart div.stealie-absolute");

  currentSkull.style("padding-top", "235px");

  const colorScale = d3.scaleOrdinal().range(colorsA);

  const pack = data =>
    d3
      .pack()
      .size([160, 160])
      .padding(3)(d3.hierarchy({ children: data }).sum(d => d.count));

  //const shuffledData = d3.shuffle(data);
  const root = pack(data);
  const shuffleRoot = pack(d3.shuffle(data));
  const shuffleRootData = shuffleRoot.leaves();
  const rootData = root.leaves();
  const extent = d3.extent(data, d => d.count);

  let selector = id === "bubbleChart" ? "active-title" : "active-title-main";
  const title = d3.select(`.${selector}`);
  let songName = id === "bubbleChart" ? "name" : "song";
  let tranlateLeafY = id === "bubbleChart" ? 0 : -56;
  let translateX = id === "bubbleChart" ? 60 : 7;
  let widthVar = id === "bubbleChart" ? 155 : 180;
  let heightVar = id === "bubbleChart" ? 200 : 242;
  let translateSVG = id === "bubbleChart" ? 4 : 4;
  let translateSVGY = 0;
  let viewBoxX = id === "bubbleChart" ? 60 : 0;

  const availWidth = window.screen.availWidth;

  if (availWidth <= 425) {
    //   widthVar = 168;
    //   viewBoxX = 62;
    translateSVGY = "350px";

    d3.select(".career-chart-container div.stealie-absolute").style(
      "padding-top",
      "0"
    );
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
    .style("transform", `translate(${translateSVG}%, ${translateSVGY})`);

  let tooltip = d3
    .select(`body`)
    .append("div")
    .attr("class", "tooltip");

  const defs = svg.append("defs");

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
    .attr("r", 83)
    .attr("cx", 87)
    .attr("cy", 137)
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
      const num = i % 2 === 0 ? -2 : 2;
      return `translate(${d.x + translateX - i * num - i},${d.y -
        tranlateLeafY})`;
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
    .attr("r", d => d.r * Math.random())
    .style("fill", function(d, i) {
      if (id !== "bubbleChart") {
        return "url(#gradOffset-" + i + ")";
      } else {
        return colorScale(i);
      }
    })
    .style("filter", function(d, i) {
      if (id !== "bubbleChart") {
        return "url(#glow)";
      } else {
        return "none";
      }
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

  const legend = svg.append("g").attr("class", "legend");
  const legendPosition = { cx: 25, cy: -103 };
  let padding = 10;
  let delay = 15000;

  legend.attr("transform", "translate(0, 100)");

  legend
    .append("circle")
    .attr("id", "legend-max")
    .attr("r", 6.09)
    .style("fill", "url(#gradOffset-1)")
    //.style("fill-opacity", ".5")
    .attr(
      "transform",
      `translate(${legendPosition.cx + 5},${legendPosition.cy + padding})`
    );

  if (id !== "bubbleChart") {
    legend
      .append("circle")
      .attr("id", "legend-min")
      .attr("r", 2.5)
      .style("fill", "url(#gradOffset-1)")
      .attr(
        "transform",
        `translate(${legendPosition.cx + 40 + padding},${legendPosition.cy +
          padding})`
      );

    legend
      .append("circle")
      .attr("id", "legend-mean")
      .attr("r", 4.45)
      .style("fill", "url(#gradOffset-1")

      .attr(
        "transform",
        `translate(${legendPosition.cx + 20 + padding},${legendPosition.cy +
          padding})`
      );
  }

  legend
    .append("text")
    .attr("x", `${legendPosition.cx}`)
    .attr("y", `${legendPosition.cy + 31}`)
    .style("text-anchor", "start")
    .attr("fill", "var(--site-black)")
    .text(`600`)
    .style("font-size", "7px")
    .style("font-family", `"Merriweather", serif`);

  legend
    .append("text")
    .attr("x", `${legendPosition.cx + 25}`)
    .attr("y", `${legendPosition.cy + 30}`)
    .style("text-anchor", "start")
    .attr("fill", "var(--site-black)")
    .text(`300`)
    .style("font-size", "7px")
    .style("font-family", `"Merriweather", serif`);

  legend
    .append("text")
    .attr("x", `${legendPosition.cx + 48}`)
    .attr("y", `${legendPosition.cy + 30}`)
    .style("text-anchor", "start")
    .attr("fill", "var(--site-black)")
    .text(`100`)
    .style("font-size", "7px")
    .style("font-family", `"Merriweather", serif`);

  legend
    .style("visibility", "hidden")
    .transition()
    .delay(1000)
    .style("visibility", "visible");

  legend
    .append("text")
    .attr("class", "legend-title-text")
    .attr("x", 90)
    .attr("y", 200 + 98)
    .text("Size by amount of plays")
    .style("font-size", ".3em")
    .attr("class", "");

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

export const makeBubbleChart = (songs, id, year, width, height) => {
  clearBubbleChart();

  makeChart(songs, id, year, width, height);
};
