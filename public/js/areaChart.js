//exports makeAreaChart and clearAreaChart to be imported by bubbleChart
import { songDataByYear, filterData } from "./fetchData.js";

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
  const data = await songDataByYear();

  const margin = { top: 180, right: 50, bottom: 20, left: 50 };
  let songData = await filterData(song, data);

  // variables to be used in notation
  const firstPlayedObj = songData.find(d => {
    return d.count > 0;
  });
  const firstPlayed = firstPlayedObj.year;
  const lastPlayedObj = songData.reverse().find(d => d.count > 0);
  const lastPlayed = lastPlayedObj.year;
  const peakYear = songData.find(
    d => d.count === d3.max(songData, i => i.count)
  );
  const peakYearPlayed = peakYear.year;

  //make scales
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(songData, d => d.count))
    .range([height, margin.top]);
  const xScale = d3
    .scaleLinear()
    .domain([1965, 1995])
    .range([margin.left, width - margin.right]);

  //make axis
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

  //make area chart
  const area = d3
    .area()
    .x(d => xScale(d.year))
    .y0(height)
    .y1(d => yScale(d.count))
    .curve(d3.curveCatmullRom.alpha(0.5));

  //make area chart top line stroke path
  const valueLine = d3
    .line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.count))
    //.curve(d3.curveBundle.beta(0.5));
    .curve(d3.curveCatmullRom.alpha(0.55));

  //make svg
  const svg = d3.select(".selectedAreaChart");
  svg
    .style("width", width)
    .style("height", height + margin.top + margin.bottom);

  // make defs for gradient definitions
  const defs = svg.append("defs");

  //variable for separation of styles between main career chart
  //and top five chart by year in yearly chart
  const translateChartY = 90;

  let header = svg.append("g");

  //gradient for header polygon fill
  let gradientOffset = defs
    .append("radialGradient")
    .attr("cx", "75%")
    .attr("cy", "50%")
    .attr("r", "80%")
    .attr("id", "headerGradient");

  gradientOffset
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", d3.rgb("#791d38").brighter(1));

  gradientOffset
    .append("stop")
    .attr("offset", "60%")
    .attr("stop-color", (d, i) => d3.rgb("#791d38"));

  header
    .append("polygon")
    .attr("points", `0, 0 ${width}, 0 ${width}, 130 0, 200 0,0`)
    .attr("fill", "url(#headerGradient)");

  header
    .append("text")
    .attr("x", 150)
    .attr("y", 125)
    .style("fill", "var(--site-white)")
    .style("font-family", `"Merriweather", serif`)
    .style("font-size", "2em")
    .text(song);

  const chartcontainer = svg
    .append("g")
    .style("transform", `translate(10px, ${translateChartY}px)`)
    .attr("font-family", "sans-serif");

  //gradient for area fill
  const backgroundGradient = defs
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

  // call d3 line defined above
  chartcontainer
    .append("path")
    .datum(songData)
    .attr("d", valueLine)
    .attr("class", "line")
    .attr("stroke", color)
    .attr("fill", "none");

  // call d3 area defined above
  chartcontainer
    .append("path")
    .datum(songData)
    .attr("d", area)
    .attr("class", "area")
    .attr("fill", "url(#areabackgroundGradient)");

  //call axis defined above
  chartcontainer.append("g").call(xAxis);
  d3.selectAll(".xaxis text")
    .style("text-anchor", "end")
    .style("font-size", "17px")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  chartcontainer.append("g").call(yAxis);
  d3.selectAll(".yaxis .tick line").attr("stroke", "none");
  d3.select(".yaxis path").attr("stroke", "none");

  //make and position annotations per d3-annotations api
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
    .style(`transform`, `translate(10px, ${translateChartY}px)`)
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
    d.x = 450;
    d.y = i * 40 + 170;
    //(d.subject.x = "right"), (d.subject.y = "bottom"), (d.subject.radius = 12);
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
    .attr("class", "roboto")
    .style("font-size", "15px")
    .attr("class", "legend")
    .text(function(d) {
      return d.note.label;
    })
    .attr("x", 480)
    .attr("y", (d, i) => i * 40 + 170);
};
