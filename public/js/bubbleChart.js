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
  const rootData = root.leaves();
  const extent = d3.extent(data, d => d.count);

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

  //Filter for the outside glow
  var filter = defs.append("filter").attr("id", "glow");
  filter
    .append("feGaussianBlur")
    .attr("stdDeviation", ".3")
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
    .attr("r", 77)
    .attr("cx", 139)
    .attr("cy", 89)
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
  const legendPosition = { cx: 8, cy: 0 };
  let padding = 3;
  let delay = 15000;

  legend.attr("transform", "translate(0, 100)");

  legend
    .append("rect")
    .attr("width", 50)
    .attr("height", 28)
    .attr("x", 0)
    .attr("y", -6)
    .style("fill", "var(--site-white)");
  //.style("box-shadow", "2px 2px 2px var(--site-black)");

  legend
    .append("circle")
    .attr("id", "legend-max")
    .attr("r", 3.4)
    .style("fill", "url(#gradOffset-1)")
    //.style("fill-opacity", ".5")
    .attr(
      "transform",
      `translate(${legendPosition.cx},${legendPosition.cy + padding})`
    );

  if (id !== "bubbleChart") {
    legend
      .append("circle")
      .attr("id", "legend-min")
      .attr("r", 1.4)
      .style("fill", "url(#gradOffset-1)")
      .attr(
        "transform",
        `translate(${legendPosition.cx + 26 + padding},${legendPosition.cy +
          padding})`
      );

    legend
      .append("circle")
      .attr("id", "legend-mean")
      .attr("r", 2.4)
      .style("fill", "url(#gradOffset-1")

      .attr(
        "transform",
        `translate(${legendPosition.cx + 13 + padding},${legendPosition.cy +
          padding})`
      );
  }

  legend
    .append("text")
    .attr("x", `${legendPosition.cx - 6.4 / 2}`)
    .attr("y", `${legendPosition.cy + 16}`)
    .style("text-anchor", "start")
    .attr("fill", "var(--site-black)")
    .text(`600`)
    .style("font-size", ".3em")
    .style("font-family", `"Roboto", sans serif`);

  legend
    .append("text")
    .attr("x", `${legendPosition.cx + 20 - 5 * 0.75 + padding - 5}`)
    .attr("y", `${legendPosition.cy + 16}`)
    .style("text-anchor", "start")
    .attr("fill", "var(--site-black)")
    .text(`300`)
    .style("font-size", ".3em")
    .style("font-family", `"Roboto", sans serif`);

  legend
    .append("text")
    .attr("x", `${legendPosition.cx + 25 + padding}`)
    .attr("y", `${legendPosition.cy + 16}`)
    .style("text-anchor", "start")
    .attr("fill", "var(--site-black)")
    .text(`100`)
    .style("font-size", ".3em")
    .style("font-family", `"Roboto", sans serif`);

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
    .attr("class", "bold");

  //annotations per d3-annotations api docs
  const type = d3.annotationCallout;
  const annotations = [
    {
      note: {
        label: "",
        bgPadding: { top: 5, left: 3, right: 5, bottom: 7 },
        title: "1 Sphere = 1 Song"
      },
      //can use x, y directly instead of data
      x: 65.6,
      y: 71.5,
      className: "show-bg",

      dx: -20.8,
      dy: 5
    },
    {
      note: {
        label: "to see song history",
        bgPadding: { top: 5, left: 5, right: 5, bottom: 7 },
        title: "Select a sphere"
      },
      //can use x, y directly instead of data

      className: "show-bg",
      x: 198,
      y: 61.4,
      dx: 39.6,
      dy: 9
    }
  ];

  const makeAnnotations = d3
    .annotation()
    .editMode(true)
    .notePadding(5)
    .type(type)
    .annotations(annotations);
  if (id !== "bubbleChart" && availWidth > 425) {
    svg
      .append("g")
      .attr("class", "annotation-group")
      .call(makeAnnotations);
  }

  const titleBgCirc = {
    r: 25,
    cx: 255,
    cy: 155
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
    .attr("x", titleBgCirc.cx - 1)
    .attr("y", titleBgCirc.cy - 6)
    .attr("fill", "var(--site-white)")
    .text("Total Setlist of ")
    .style("font-size", ".3em");

  titleBg
    .append("text")
    .attr("class", "bold")
    .attr("x", titleBgCirc.cx - 1)
    .attr("y", titleBgCirc.cy)
    .attr("fill", "var(--site-white)")
    .text("Unique Songs Played")
    .style("font-size", ".3em");

  titleBg
    .append("text")
    .attr("class", "bold")
    .attr("x", titleBgCirc.cx - 3)
    .attr("y", titleBgCirc.cy + 6)
    .attr("fill", "var(--site-white)")
    .text("1965 - 1995")
    .style("font-size", ".3em");

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
