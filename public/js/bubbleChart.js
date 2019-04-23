import {
  totalSongData,
  songDataByYear,
  getAllSongDataByYear
} from "./helpers.js";

const clearBubbleChart = () => {
  const svg = d3.select("#bubbleChart");
  svg.selectAll("*").remove();
};

export const makeBubbleChart = (data, year) => {
  //clear svg before building new
  clearBubbleChart();
  const imgSrc =
    year !== "1972" && year !== "1973" ? year + ".jpg" : year + ".png";

  const width = 400;
  const height = 400;
  const countExtent = d3.extent(data, d => d.count).reverse();
  const pack = data =>
    d3
      .pack()
      .size([width - 2, height - 2])
      .padding(0)(
      d3.hierarchy({ children: d3.shuffle(data) }).sum(d => d.count)
    );

  const root = pack(data);
  const mean = d3.mean(data, d => d.count);
  console.log("mean is ", mean);
  const activeYear = d3.select(".active-year").html(`<h3>${year}</h3>`);
  const title = d3.select(".active-title");

  const svg = d3
    .select("#bubbleChart")
    .style("width", width)
    .style("height", height)
    //.style("font-size", "12px")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle");

  const leaf = svg
    .selectAll("g")
    .data(root.leaves())
    .join("g")
    .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

  leaf
    .on("mouseover", async function(d) {
      title.html(`<h1> ${d.data.name}</h1>`);
      title.style("visibility", "visible");
    })
    .on("mouseleave", d => {
      title.style("visibility", "hidden");
    });

  leaf
    .append("circle")
    .attr("id", d => d.id)
    .attr("r", 0)
    .attr("fill-opacity", 0.5)
    .attr("class", d => d.id)
    .transition()
    .delay((d, i) => i * 5)
    .attr("r", d => d.r - 0.25)
    .styleTween("fill", (d, i) =>
      i % 2 === 0
        ? d3.interpolateRgb("#032385", "#ff2942")
        : d3.interpolateRgb("#ff2942", "#032385")
    )
    .text(d => d.data.name)
    .attr("fill-opacity", 0.8);

  leaf
    .append("clipPath")
    .attr("id", d => (d.clipUid = d.id))
    .append("use")
    .attr("href", d => d.href);

  leaf
    .append("text")
    .text(function(d) {
      if (d.data.count > mean) return d.data.name;
    })

    .style("font-size", function(d) {
      return (
        Math.min(
          2 * d.r,
          ((2 * d.r - 10) / this.getComputedTextLength()) * 10
        ) + "px"
      );
    })
    .style("fill", "white")
    .attr("dy", ".20em");
};
