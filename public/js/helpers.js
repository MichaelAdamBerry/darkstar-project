//hide and reveal helper functions
export const hide = (id, selector) => {
  let type = selector === "." ? selector + id : "#" + id;
  let elToHide = d3.select(`${type}`);
  elToHide.style("visibility", "hidden");
};
export const reveal = (id, selector) => {
  let type = selector === "." ? selector + id : "#" + id;
  let elToReveal = d3.select(`${type}`);
  elToReveal.style("visibility", "visible");
};

export const addImage = name => {
  let str = name + ".jpg";
  return str;
};

export const spiral = size => {
  var svg = d3.select("#bubbleChart"),
    width = +svg.attr(size),
    height = +svg.attr(size),
    rainbow = d3.scaleSequential(d3.interpolateSpectral),
    points = d3.range(size).map(phyllotaxis(10));

  var g = svg.append("g");

  g.style("transform", "translate(50%, 50%");

  var point = g.selectAll("circle").data(points);
  point = point
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    })
    .merge(point);

  var t0 = Date.now();
  let opacity = 1;
  function tick() {
    opacity = opacity - 0.02;
    var t = Date.now() - t0;
    var m =
      8 +
      0.1 * Math.cos((2 * Math.PI * (t / 1000)) / /* seconds per cycle: */ 20);
    var o = t / 200;
    svg.style("opacity", opacity);

    point
      .attr(
        "r",
        (d, i) =>
          8 *
          Math.pow(Math.sin((0.75 * Math.PI * (mod(i - o, m) + 1)) / m), 1.5)
      )
      .attr("fill", (d, i) => rainbow(1 * (i / points.length - t / 350 / 6)));
    requestAnimationFrame(tick);
  }
  tick();

  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  // Credit: @mbostock, via https://bl.ocks.org/mbostock/3127661b6f13f9316be745e77fdfb084
  function phyllotaxis(radius) {
    var theta = Math.PI * (3 - Math.sqrt(5));
    return function(i) {
      var r = radius * Math.sqrt(i),
        a = theta * i;
      return {
        x: width / 2 + r * Math.cos(a),
        y: height / 2 + r * Math.sin(a)
      };
    };
  }
};

export const styleFixedContainer = () => {
  d3.selectAll(".fixed-style").style("visibility", "visible");
};

export const removeFixedStyle = () => {
  d3.selectAll(".fixed-style").style("visibility", "hidden");
};
