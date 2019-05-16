export const totalSongData = async () => {
  let data = await d3.json(
    "https://raw.githubusercontent.com/MichaelAdamBerry/darkstar-project/master/data/careerTotals.json"
  );
  data = await data.slice(2);
  return data;
};

export const bolt = () => {
  let bolts = d3.selectAll(".bolt");
  bolts.html(`<svg xmlns="http://www.w3.org/2000/svg" id="b4440849-c984-4bba-bf15-8c53a611ead8" data-name="Layer 1" viewBox="0 0 173 279">
  <path id="b0629ad5-6db5-4c98-a4af-d5674c9e298e" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="6" d="M156 5l-22 43c10-2 20-6 31-7l-20 18-31 25 51 6-36 25c-12 9-24 14-35 23 20 1 40-2 60-2a189 189 0 0 1-18 13l-35 23-21 13h52l-26 14-47 24 25 5c-15 8-32 14-48 22l14 7-24 8-21 9c3-11 8-21 14-30l22-39-34 2c9-10 21-20 32-29 6-5 13-10 18-16-15 0-31 4-47 3l55-41c8-6 16-11 22-17l-24 1-26 2 22-13 19-11 41-22c-15-1-30-4-45-7 21-11 44-20 66-31l-20-4a220 220 0 0 1 36-17z" data-name="Layer 1-2"/>
</svg>`);
};

export const songDataByYear = async () => {
  let data = await d3.json(
    "https://raw.githubusercontent.com/MichaelAdamBerry/darkstar-project/master/data/totalsByYear.json"
  );
  return data;
};

export const getAllSongDataByYear = async (year, data) => {
  let temp = await data;
  let val = temp.find(obj => {
    return obj.year === year;
  });
  return val;
};

export const addImage = name => {
  let str = name + ".jpg";
  return str;
};

export const filterData = (song, data) => {
  let temp = data;
  let val = [];
  temp.forEach(obj => {
    //each year make a new object
    let songObj = {};
    let tempCount = 0;
    //add year  to object
    songObj.year = obj.year;
    //loop throught each object
    obj.songs.forEach(title => {
      //if song is found add count to obj
      if (title.name === song) {
        tempCount = title.count;
      }
    });
    songObj.count = tempCount;
    val.push(songObj);
  });
  return val;
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
  d3.selectAll(".fixed-style")
    .style("border-left", `solid 3px var(--site-black)`)
    .style("background-color", "#39363470")
    .style("visibility", "visible");
};

export const removeFixedStyle = () => {
  d3.selectAll(".fixed-style").style("visibility", "hidden");
};

export const makeStealie = (id) => {
  d3.select(`#${id}`).append('div').attr('id', 'stealie-container').html(
    `<svg xmlns="http://www.w3.org/2000/svg" id="ab967b07-e2c0-4cd8-9000-9c4c3e9710f9" data-name="Layer 1" viewBox="0 0 175 232">
  <defs>
    <style>
      .b4230c15-a1b9-4dbe-9bf7-119a16403102{opacity:.44}.aa063ed7-985a-4278-81aa-ad2d3cc4f05a{fill:none;stroke:#393634;stroke-miterlimit:10}
    </style>
  </defs>
  <g class="b4230c15-a1b9-4dbe-9bf7-119a16403102">
    <path d="M901 564c14 14 30 22 49 25 25 4 47-4 65-21 13-12 20-26 23-43 4-22 0-42-13-59a78 78 0 0 0-58-33c-22-3-41 4-58 18a73 73 0 0 0-25 43c-5 24-1 46 15 66 3 5 2 10 1 15s-1 8 1 12l6 12v8c-1 5 2 9 3 14" class="aa063ed7-985a-4278-81aa-ad2d3cc4f05a" transform="translate(-873 -424)"/>
    <path d="M1008 439a95 95 0 0 0-28-12c-11-3-22-3-33-1-15 2-28 8-40 18-17 13-28 29-32 50s0 41 7 62c3 9 6 18 3 29-3 6 3 15 10 16 4 1 8 4 12 0M1017 446c18 14 28 33 30 56 2 18-2 36-12 52-4 6-4 13-5 20v16c-3 7-8 10-14 8a74 74 0 0 0-36 0l-10 3" class="aa063ed7-985a-4278-81aa-ad2d3cc4f05a" transform="translate(-873 -424)"/>
    <path d="M883 540c1 6 5 12 9 18s5 12 2 19 1 15 9 16" class="aa063ed7-985a-4278-81aa-ad2d3cc4f05a" transform="translate(-873 -424)"/>
    <path d="M903 599c-9-1-16-9-14-19 2-6 1-13-2-18-1-2-1-3-3-3M951 611c3-5 1-10-4-10l-14-2c-4-1-10-1-14 1s-7 0-10 1M1028 560a29 29 0 0 0-6 20c0 6-4 10-8 14M945 652l-4 1a27 27 0 0 1-3-12v-2c5-4 0-8 1-11 0-2-2-2-2-2l-5 1c2 4-1 8-1 12s0 8 6 6M1027 574c0 8-1 16-8 22M903 604c-2 3-4 7-2 11s7 7 12 7 13 1 19 4M915 602c-2 6-2 13 0 19M982 637c-1 5 3 11-3 16-3-3-3-3-4-7 0-2 1-4-1-4s-5 2-5 2v8c1 2 3 3 7 0" class="aa063ed7-985a-4278-81aa-ad2d3cc4f05a" transform="translate(-873 -424)"/>
    <path d="M919 604v9c-1 3 0 5 1 8M955 613c1 5-1 11 1 17M1005 606c1 6-2 11-1 17M988 634c1 8 0 9-5 13M953 643l-1 5c0 3 0 6-4 7-1-1-3-1-3-4s-1-5 1-8 3-3 7-1" class="aa063ed7-985a-4278-81aa-ad2d3cc4f05a" transform="translate(-873 -424)"/>
    <path d="M1012 605c1 4 0 8-1 13s-2 5-6 5l-9 1c-3 0-2 2-4 3s-1 7-5 6M964 614a18 18 0 0 0-1 11l-1 5M927 625c-1 4 0 8 4 11M969 653c-2 1-3 3-5 2s-4 0-4-3-1-7 2-9 4-1 6 1M1016 599l2 8M953 653c2 2 4 3 7 1" class="aa063ed7-985a-4278-81aa-ad2d3cc4f05a" transform="translate(-873 -424)"/>
    <path d="M994 625c-3-2-6-3-9 0 2 2 1 5 1 8M1016 612c0 2 0 4-3 5M1014 602a14 14 0 0 1-12 3M985 626a13 13 0 0 0-5 1M944 640c0 1-1 3 2 3M954 642c2-1 4 1 6 3" class="aa063ed7-985a-4278-81aa-ad2d3cc4f05a" transform="translate(-873 -424)"/>
  </g>
</svg>`
  ).style("width", "500px")
.style("height", "600px")

.style("opacity", ".9")
.attr("stroke", "#991d18")
.style("position", "fixed")
.style("top", "6%")
.style("left", `calc(100vw / 2 - 250px)`)

}
