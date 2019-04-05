const fs = require("fs");
const fetch = require("node-fetch");

//setlist.fm contains 2327 setlists for the Grateful Dead
//each api request returns 20 results per page for 117 pages

const totalPages = 117;

// object to store returned data

const gratefulDead = {
  setlists: undefined
};

const getData = async count => {
  const url = `https://api.setlist.fm/rest/1.0/artist/6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6/setlists?p=${count}`;
  const results = await fetch(url, {
    headers: {
      "x-api-key": "1f5149c9-d7ef-4eae-8dc5-aa6ef433c888",
      Accept: "../data/application/json"
    }
  });
  const data = await results.json();
  return data.setlist;
};

const makeFile = async () => {
  const total = [];
  for (let i = 1; i <= totalPages; i++) {
    const page = await getData(i);
    total.push(...page);
    console.log("fetching ", i);
  }
  gratefulDead.setlists = total;
  let gratefulSetlist = JSON.stringify(gratefulDead, null, 2);
  fs.writeFile("../data/gratefulSetlist.json", gratefulSetlist, err => {
    if (err) throw err;
    console.log("Data written to file");
  });
};

makeFile();
