const fs = require("fs");
const data = require("./data.js");

const writeJSON = () => {
  var returned = data.getSongWriters();
  var careerData = JSON.stringify(returned, null, 2);
  fs.writeFile("..data/careerTotalsWithWriter.json", careerData, err => {
    if (err) throw err;
    console.log("Career totals with writer written to file");
  });
};

writeJSON();
