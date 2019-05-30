export const totalSongData = async () => {
  let data = await d3.json(
    "https://raw.githubusercontent.com/MichaelAdamBerry/darkstar-project/master/data/careerTotals.json"
  );
  data = await data.slice(2);
  return data;
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

export const yearArr = () => {
  return [
    "1965",
    "1966",
    "1967",
    "1968",
    "1969",
    "1970",
    "1971",
    "1972",
    "1973",
    "1974",
    "1975",
    "1976",
    "1977",
    "1978",
    "1979",
    "1980",
    "1982",
    "1983",
    "1984",
    "1985",
    "1986",
    "1987",
    "1988",
    "1989",
    "1990",
    "1991",
    "1992",
    "1993",
    "1994",
    "1995"
  ];
};

export const staticDataObj = () => {
  //locally stored static data
  let staticData = [
    {
      year: "1965",
      count: "??",
      countChange: "",
      unique: "18",
      uniqueChange: ""
    },
    {
      year: "1966",
      count: "??",
      countChange: "",
      unique: "69",
      uniqueChange: "+ 51"
    },
    {
      year: "1967",
      hunter: "10%",
      count: "??",
      countChange: "",
      unique: "34",
      uniqueChange: "- 35"
    },
    {
      year: "1968",
      hunter: "25%",
      count: "119",
      countChange: "",
      unique: "42",
      uniqueChange: "+ 6"
    },
    {
      year: "1969",
      hunter: "36%",
      count: "137",
      countChange: "+ 18",
      unique: "91",
      uniqueChange: "+ 49"
    },
    {
      year: "1970",
      hunter: "35%",
      count: "139",
      countChange: "+ 2",
      unique: "120",
      uniqueChange: "+ 29"
    },
    {
      year: "1971",
      hunter: "35%",
      barlow: "2%",
      count: "82",
      countChange: "- 57",
      unique: "86",
      uniqueChange: "- 34"
    },
    {
      year: "1972",
      hunter: "40%",
      barlow: "3%",
      count: "86",
      countChange: "+ 4",
      unique: "82",
      uniqueChange: "- 4"
    },
    {
      year: "1973",
      hunter: "48%",
      barlow: "6%",
      count: "73",
      countChange: "- 13",
      unique: "74",
      uniqueChange: "- 8"
    },
    {
      year: "1974",
      hunter: "49%",
      barlow: "6%",
      count: "40",
      countChange: "- 33",
      unique: "80",
      uniqueChange: "+ 6"
    },
    {
      year: "1975",
      hunter: "42%",
      barlow: "4%",
      count: "4",
      countChange: "- 36",
      unique: "29",
      uniqueChange: "- 51"
    },
    {
      year: "1976",
      hunter: "37%",
      barlow: "15%",
      count: "41",
      countChange: "+ 37",
      unique: "64",
      uniqueChange: "+ 35"
    },
    {
      year: "1977",
      hunter: "39%",
      barlow: "13%",
      count: "60",
      countChange: "+ 19",
      unique: "82",
      uniqueChange: "+ 18"
    },
    {
      year: "1978",
      hunter: "38%",
      barlow: "12%",
      count: "81",
      countChange: "+ 21",
      unique: "84",
      uniqueChange: "+ 2"
    },
    {
      year: "1979",
      hunter: "38%",
      barlow: "15%",
      count: "75",
      countChange: "- 6",
      unique: "92",
      uniqueChange: "+ 8"
    },
    {
      year: "1980",
      hunter: "38%",
      barlow: "17%",
      count: "87",
      countChange: "+ 11 ",
      unique: "102",
      uniqueChange: "+ 10"
    },
    {
      year: "1981",
      hunter: "36%",
      barlow: "14%",
      count: "87",
      countChange: "",
      unique: "122",
      uniqueChange: "+ 20"
    },
    {
      year: "1982",
      hunter: "39%",
      barlow: "12%",
      count: "62",
      countChange: "- 15",
      unique: "110",
      uniqueChange: "- 12"
    },
    {
      year: "1983",
      hunter: "38%",
      barlow: "16%",
      count: "66",
      countChange: "+ 4",
      unique: "110",
      uniqueChange: "+/-"
    },
    {
      year: "1984",
      hunter: "36%",
      barlow: "15%",
      count: "64",
      countChange: "+ 2",
      unique: "124",
      uniqueChange: "+ 14"
    },
    {
      year: "1985",
      hunter: "32%",
      barlow: "14%",
      count: "72",
      countChange: "+ 8",
      unique: "128",
      uniqueChange: "+ 4"
    },
    {
      year: "1986",
      hunter: "35%",
      barlow: "13%",
      count: "47",
      countChange: "- 25",
      unique: "123",
      uniqueChange: "- 5"
    },
    {
      year: "1987",
      hunter: "37%",
      barlow: "13%",
      count: "86",
      countChange: "+ 39",
      unique: "130",
      uniqueChange: "+ 7"
    },
    {
      year: "1988",
      hunter: "37%",
      barlow: "12%",
      count: "81",
      countChange: "- 5",
      unique: "134",
      uniqueChange: "+ 4"
    },
    {
      year: "1989",
      hunter: "37%",
      barlow: "14%",
      count: "73",
      countChange: "- 8",
      unique: "136",
      uniqueChange: "+ 2"
    },
    {
      year: "1990",
      hunter: "36%",
      barlow: "14%",
      count: "74",
      countChange: "+ 1",
      unique: "141",
      uniqueChange: "+ 5"
    },
    {
      year: "1991",
      hunter: "37%",
      barlow: "11%",
      count: "74",
      countChange: "",
      unique: "134",
      uniqueChange: "- 7"
    },
    {
      year: "1992",
      hunter: "39%",
      barlow: "10%",
      count: "55",
      countChange: "- 9",
      unique: "132",
      uniqueChange: "- 2"
    },
    {
      year: "1993",
      hunter: "40%",
      barlow: "9%",
      count: "82",
      countChange: "+ 27",
      unique: "142",
      uniqueChange: "+ 10"
    },
    {
      year: "1994",
      hunter: "38%",
      barlow: "9%",
      count: "85",
      countChange: "+ 3",
      unique: "146",
      uniqueChange: "+ 4"
    },
    {
      year: "1995",
      hunter: "35%",
      barlow: "8%",
      count: "47",
      countChange: "- 38",
      unique: "141",
      uniqueChange: "- 5"
    }
  ];
  return staticData;
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
