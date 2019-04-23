export const totalSongData = async () => {
  console.log("fetching setlist data");
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

export const getAllSongDataByYear = (year, data) => {
  let temp = data;
  let val = temp.find(obj => {
    return obj.year === year;
  });
  console.log(val);
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
