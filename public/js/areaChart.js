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

export const makeAreaChart = async (
  song,
  width = 600,
  height = 400,
  color = `#010101`
) => {
  console.log("makeAreaChart called");
  const data = await songDataByYear();

  const margin = { top: 150, right: 50, bottom: 20, left: 50 };
  let songData = await filterData(song, data);

  let firstPlayedObj = songData.find(d => {
    return d.count > 0;
  });

  const firstPlayed = firstPlayedObj.year;
  console.log(firstPlayed);

  const lastPlayedObj = songData.reverse().find(d => d.count > 0);
  const lastPlayed = lastPlayedObj.year;

  console.log(lastPlayed);

  const peakYear = songData.find(
    d => d.count === d3.max(songData, i => i.count)
  );
  const peakYearPlayed = peakYear.year;

  console.log("peak year", peakYear);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(songData, d => d.count))
    .range([height - margin.bottom, margin.top]);
  const xScale = d3
    .scaleLinear()
    .domain([1965, 1995])
    .range([margin.left, width - margin.right]);
  const xAxis = g => {
    g.attr("transform", `translate(0, ${height})`).call(
      d3
        .axisBottom(xScale)
        .ticks(6)
        .tickFormat(d3.format("d"))
    );
    g.attr("class", "xaxis");
    return g;
  };
  const yAxis = g => {
    g.attr("transform", `translate(${margin.right}, 0)`);
    g.attr("class", "yaxis");
    return g.call(d3.axisLeft(yScale).ticks(4));
  };
  const area = d3
    .area()
    .x(d => xScale(d.year))
    .y0(height)
    .y1(d => yScale(d.count))
    .curve(d3.curveCatmullRom.alpha(0.5));

  const valueLine = d3
    .line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.count))
    //.curve(d3.curveBundle.beta(0.5));
    .curve(d3.curveCatmullRom.alpha(0.55));

  const svg = d3.select(".selectedAreaChart");
  svg
    .style("width", width)
    .style("height", height + margin.top + margin.bottom)
    .append("g")
    .attr(
      "transform",
      `translate(${margin.left}, ${margin.top + margin.bottom})`
    )
    .attr("font-family", "sans-serif");

  const defs = svg.append("defs");

  let backgroundGradient = defs
    .append("linearGradient")
    .attr("class", "backgroundGradientOffset")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%")
    .attr("id", `areabackgroundGradient`);

  backgroundGradient
    .append("stop")
    .attr("offset", "25%")
    .attr("stop-color", "#991d18");
  backgroundGradient
    .append("stop")
    .attr("offset", "45%")
    .attr("stop-color", "#791d38");

  backgroundGradient
    .append("stop")
    .attr("offset", "65%")
    .attr("stop-color", "#591d58");

  backgroundGradient
    .append("stop")
    .attr("offset", "850%")
    .attr("stop-color", "#391d78");

  backgroundGradient
    .append("stop")
    .attr("offset", "95%")
    .attr("stop-color", "#191d98");

  svg
    .append("path")
    .datum(songData)
    .attr("d", valueLine)
    .attr("class", "line")
    .attr("stroke", color)
    .attr("fill", "none");

  svg
    .append("path")
    .datum(songData)
    .attr("d", area)
    .attr("class", "area")
    .attr("fill", "url(#areabackgroundGradient)");

  svg.append("g").call(xAxis);
  d3.selectAll(".xaxis text")
    .style("text-anchor", "end")
    .style("font-size", "17px")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  svg.append("g").call(yAxis);
  d3.selectAll(".yaxis .tick line").attr("stroke", "none");
  d3.select(".yaxis path").attr("stroke", "none");

  const type = d3.annotationBadge;

  const annotations = [
    {
      className: "firstPlayed",
      data: { year: firstPlayedObj.year, count: firstPlayedObj.count },
      subject: {
        text: `'${firstPlayed.slice(2)}`,
        x: "left",
        radius: 12
      }
    },
    {
      data: { year: peakYear.year, count: peakYear.count },
      subject: {
        text: `'${peakYear.year.slice(2)}`,
        y: "top",
        radius: 12
      }
    },
    {
      data: { year: lastPlayedObj.year, count: lastPlayedObj.count },
      subject: {
        text: `'${lastPlayed.slice(2)}`,
        x: "right",
        y: "bottom",
        radius: 12
      }
    }
  ];
  const makeAnnotations = d3
    .annotation()
    .editMode(false)
    //also can set and override in the note.padding property
    //of the annotation object
    .notePadding(2)
    .type(type)
    //accessors & accessorsInverse not needed
    //if using x, y in annotations JSON
    .accessors({
      x: d => xScale(d.year),
      y: d => yScale(d.count)
    })
    .accessorsInverse({
      date: d => x.invert(d.x),
      close: d => y.invert(d.y)
    })
    .annotations(annotations);
  d3.select("svg")
    .append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations);

  const annotationsLegend = [
    {
      note: { label: `First Played` },
      subject: { text: `'${firstPlayed.slice(2)}` }
    },
    {
      note: { label: `Peak Year ` },
      subject: { text: `'${peakYear.year.slice(2)}` }
    },
    {
      note: { label: `Last Played` },
      subject: { text: `'${lastPlayed.slice(2)}` }
    }
  ].map(function(d, i) {
    d.x = margin.left + i * 145;
    d.y = 40;
    (d.subject.x = "right"), (d.subject.y = "bottom"), (d.subject.radius = 12);
    return d;
  });
  const makeLegendAnnotations = d3
    .annotation()
    .type(d3.annotationBadge)
    .annotations(annotationsLegend);
  d3.select("svg")
    .append("g")
    .attr("class", "annotation-legend")
    .call(makeLegendAnnotations);

  d3.select("svg g.annotation-legend")
    .selectAll("text.legend")
    .data(annotationsLegend)
    .enter()
    .append("text")
    .style("font-size", "15px")
    .attr("class", "legend")
    .text(function(d) {
      return d.note.label;
    })
    .attr("x", function(d, i) {
      return margin.right + 25 + i * 150;
    })
    .attr("y", 50);
};
