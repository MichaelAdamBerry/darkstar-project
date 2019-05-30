//creates timeline and debut content in yearly scrolling container

const debuts = {
  1966: [
    {
      song: "caution",
      link: "gd66-03-12d1t01.mp3"
    },
    {
      song: "cream puff war",
      link: "gd66-05-19d1t09.mp3"
    },
    {
      song: "golden road",
      link: "gd67-03-18d2t01.mp3"
    }
  ],
  1967: [
    {
      song: "alligator",
      link: "gd67-06-18t04.mp3"
    },
    {
      song: "new potato caboose",
      link: "gd67-08-04t01.mp3"
    },
    {
      song: "the other one",
      link: "gd67-10-22d1t07.mp3"
    }
  ],
  1968: [
    {
      song: "dark star",
      link: "gd68-01-17d1t03.mp3"
    },
    {
      song: "china cat sunflower",
      link: "gd68-01-17d1t04.mp3"
    },
    {
      song: "the eleven",
      link: "gd68-01-17d1t05.mp3"
    },
    {
      song: "born cross eyed",
      link: "gd68-01-17d1t08.mp3"
    },
    {
      song: "spanish jam",
      link: "gd68-01-17d1t09.mp3"
    },
    {
      song: "clementine",
      link: "gd68-01-20d1t01.mp3"
    },
    {
      song: "rosemary",
      link: "gd68-12-07d2t01.mp3"
    },
    {
      song: "mountains of the moon",
      link: "gd68-12-20d1t02.mp3"
    },
    {
      song: "st. stephen",
      link: "gd68-XX-XXd1t03.mp3"
    },
    {
      song: "cosmic charlie",
      link: "gd69-01-17d2t02.mp3"
    }
  ],
  1969: [
    {
      song: "dupree's diamond blues",
      link: "gd69-01-24d1t05.mp3"
    },
    {
      song: "doin' that rag",
      link: "gd69-01-24d1t06.mp3"
    },
    {
      song: "casey jones",
      link: "gd69-06-22pt02.mp3"
    },
    {
      song: "dire wolf",
      link: "gd69-06-07d1t01.mp3"
    },
    {
      song: "high time",
      link: "gd69-06-21d1t03.mp3"
    },
    {
      song: "uncle john's band",
      link: "gd69-11-01d2t07.mp3"
    },
    {
      song: "cumberland blues",
      link: "gd69-11-08d1t10.mp3"
    },
    {
      song: "black peter",
      link: "gd69-12-04d1t03.mp3"
    },
    {
      song: "mason's children",
      link: "gd69-12-19d1t05.mp3"
    },
    {
      song: "new speedway boogie",
      link: "gd69-12-20d1t06.mp3"
    }
  ],
  1970: [
    {
      song: "friend of the devil",
      link: "gd70-03-20d1t04.mp3"
    },
    {
      song: "candyman",
      link: ""
    },
    {
      song: "attics of my life",
      link: ""
    },
    {
      song: "sugar magnolia",
      link: ""
    },
    {
      song: "to lay me down",
      link: ""
    },
    {
      song: "truckin'",
      link: ""
    },
    {
      song: "ripple",
      link: ""
    },
    {
      song: "brokedown palace",
      link: ""
    },
    {
      song: "operator",
      link: ""
    },
    {
      song: "box of rain",
      link: ""
    },
    {
      song: "till the morning comes",
      link: ""
    }
  ],
  1971: [
    { song: "bird song", link: "gd71-02-19d2t02.mp3" },
    { song: "loser", link: "gd71-02-18-d1-t04.mp3" },
    { song: "bertha", link: "gd71-02-18-d1-t01.mp3" },
    { song: "greatest story ever told", link: "gd71-02-18-d1-t05.mp3" },
    { song: "wharf rat", link: "gd71-02-18-d2-t02.mp3" },
    { song: "deal", link: "gd71-02-19d2t04.mp3" },
    { song: "sugaree", link: "gd71-07-31d1t03.mp3" },
    { song: "mr. charlie", link: "gd71-07-31d1t04.mp3" },
    { song: "brown eyed women", link: "gd71-0807d3t30.mp3" },
    { song: "tennesee jed", link: "gd71-10-19d1t07.mp3" },
    { song: "jack straw", link: "gd71-10-19d1t09.mp3" },
    { song: "mexicali blues", link: "gd71-10-19d1t12.mp3" },
    { song: "comes a time", link: "gd71-10-19d1t13.mp3" },
    { song: "ramble on rose", link: "gd71-10-19d2t06.mp3" },
    { song: "playing in the band", link: "gd71-02-18-d2-t07.mp3" },
    { song: "one more saturday night", link: "gd71-10-19d2t02.mp3" }
  ],
  1972: [
    { song: "black-throated-wind", link: "gd72-03-05d1t02.mp3" },
    { song: "looks like rain", link: "gd72-03-21d1t08.mp3" },
    { song: "two souls in communion", link: "gd72-03-21d3t03.mp3" },
    { song: "he's gone", link: "gd72-04-17d1t08.mp3" },
    { song: "stella blue", link: "gd72-06-17s1t12.mp3" },
    {
      song: "mississippi half-step uptown toodooloo",
      link: "gd72-07-16d2t06.mp3"
    }
  ],
  1973: [
    { song: "row jimmy", link: "gd73-02-09d1t02.mp3" },
    { song: "loose lucy", link: "gd73-02-09d1t09.mp3" },
    { song: "here comes sunshine", link: "gd73-02-09d1t14.mp3" },
    { song: "they love each other", link: "gd73-02-09d2t06.mp3" },
    { song: "wave that flag", link: "gd73-02-09d3t04.mp3" },
    { song: "eyes of the world", link: "gd73-02-09d2t08.mp3" },
    { song: "china doll", link: "gd73-02-09d2t09.mp3" },
    { song: "let it grow", link: "gd73-09-07d2t07.mp3" },
    { song: "weather report suite", link: "gd73-09-08d1t10.mp3" },
    { song: "let me sing your blues away", link: "gd73-09-08d2t07.mp3" }
  ],
  1974: [
    { song: "ship of fools", link: "gd74-02-22d2t05.mp3" },
    { song: "it must have been the roses", link: "gd74-02-22d1t05.mp3" },
    { song: "us blues", link: "gd74-02-22d1t01.mp3" },
    { song: "scarlet begonias", link: "gd74-3-23Newd1t07.mp3" },
    { song: "cassidy", link: "gd74-3-23Newd1t12.mp3" }
  ],
  1975: [
    { song: "blues for allah", link: "gd75-03-23d1t01.mp3" },
    { song: "stronger than dirt", link: "gd75-03-23d1t02.mp3" },
    { song: "drums", link: "gd75-03-23d1t03.mp3" },
    { song: "crazy fingers", link: "gd75-06-17d1t03.mp3" },
    { song: "franklin's tower", link: "gd75-06-17matrix-d1t05.mp3" },
    { song: "help on the way", link: "gd75-06-17matrix-d1t03.mp3" },
    { song: "slipknot", link: "gd75-06-17matrix-d1t04.mp3" },
    { song: "sage and spirit", link: "gd75-08-13d2t07.mp3" },
    { song: "the music never stopped", link: "gd75-08-13d1t05.mp3" }
  ],
  1976: [
    { song: "the wheel", link: "gd76-06-03d3t06.mp3" },
    { song: "might as well", link: "gd76-06-03d1t01.mp3" },
    { song: "lazy lightning", link: "gd76-06-03d1t06.mp3" },
    { song: "supplication", link: "gd76-06-03d1t07.mp3" },
    { song: "mission in the rain", link: "gd76-06-04d1t11.mp3" }
  ],
  1977: [
    { song: "terripin station", link: "gd77-02-26d1t01.mp3" },
    { song: "estimated prophet", link: "gd77-02-26d1t04.mp3" },
    { song: "fire on the mountain", link: "gd77-03-18-d2t02.mp3" },
    { song: "sunrise", link: "gd77-05-01AUDd1t11.mp3" },
    { song: "passenger", link: "gd77-05-15d1t09.mp3" }
  ],
  1978: [
    { song: "If I Had The World To Give", link: "gd78-08-30s2d2t03.mp3" },
    { song: "Stagger Lee", link: "gd78-08-30d1t05.mp3" },
    { song: "I Need a Miracle Everyday", link: "gd78-08-30s2d1t02.mp3" },
    { song: "Shakedown Street", link: "gd78-08-31d1t07.mp3" }
  ],
  1979: [
    { song: "Althea", link: "gd79-08-04d1t08.mp3" },
    { song: "Lost Sailor", link: "gd79-08-04d1t09.mp3" },
    { song: "Easy To Love You", link: "gd79-08-14d1t07.mp3" },
    { song: "saint of circumstance", link: "gd79-08-31d1t11.mp3" },
    { song: "alabama getaway", link: "gd79-11-04d2t01.mp3" }
  ],
  1980: [
    { song: "Far From Me", link: "gd80-03-30.mtx.glassberg.miller.d1t07.mp3" },
    { song: "Feel Like A Stranger", link: "gd80-03-31d1t05.mp3" }
  ],
  1981: [{ song: "Never Trust A Woman", link: "gd81-08-28d2t05.mp3" }],
  1982: [
    { song: "Day Job", link: "gd82-08-28d2t201.mp3" },
    { song: "West L.A. Fadeaway", link: "gd82-08-28d2t203.mp3" },
    { song: "Touch of Grey", link: "gd82-09-15d2t12.mp3" },
    { song: "Throwing Stones", link: "gd82-09-17d1t11.mp3" }
  ],
  1983: [
    { song: "Maybe You Know", link: "gd83-04-13d3t03.mp3" },
    { song: "My Brother Esau", link: "gd83-03-25d1t04.mp3" },
    { song: "Hell in a Bucket", link: "gd83-05-13d1t05.mp3" }
  ],
  1984: [
    { song: "Don’t Need Love", link: "gd84-03-28d2t04.mp3" },
    { song: "Only a Fool", link: "gd84-04-23d2t05.mp3" }
  ],
  1986: [
    { song: "Revolutionary Hamstrung Blues", link: "gd86-03-27d1t04.mp3" },
    { song: "When Push Comes To Shove", link: "gd86-12-15d1t04.mp3" },
    { song: "Black Muddy River", link: "gd86-12-15d2t04.mp3" }
  ],
  1988: [
    { song: "Victim Or The Crime", link: "gd88-06-17d01t09.mp3" },
    { song: "Foolish Heart", link: "gd88-06-19d2t01.mp3" },
    { song: "Blow Away", link: "gd88-06-20d1t12.mp3" },
    { song: "I Will Take You Home", link: "gd88-06-22s2t05.mp3" },
    { song: "Believe it Or Not", link: "gd88-06-23d1t10.mp3" },
    { song: "Gentleman Start engines", link: "gd88-06-26d1t07.mp3" },
    { song: "Built To Last", link: "gd88-10-20.GEMS.SetTwo.JayWest.d1t04.mp3" }
  ],
  1989: [
    { song: "Standing On The Moon", link: "gd89-02-05d2t03.mp3" },
    { song: "We Can Run", link: "gd89-02-05d1t06.mp3" },
    { song: "Just A Little Light", link: "gd89-02-07d1t06.mp3" },
    { song: "Picasso Moon", link: "gd89-04-28d1t08.mp3" }
  ],
  1991: [{ song: "Rubin and Cherise", link: "gd91-03-17d1t07.mp3" }],
  1992: [
    { song: "So Many Roads", link: "gd92-02-22d1t05.mp3" },
    { song: "Wave To The Wind", link: "gd92-02-22d1t08.mp3" },
    { song: "Corrina", link: "gd92-02-24d2t02.mp3" },
    { song: "Long Way To Go Home", link: "gd92-02-24d2t04.mp3" }
  ],
  1993: [
    { song: "Lazy River Road", link: "gd93-02-21s1t03.mp3" },
    { song: "Eternity", link: "gd93-02-21s1t04.mp3" },
    { song: "Liberty", link: "gd93-02-21s2t02.mp3" },
    { song: "Days Between", link: "gd93-02-22d3t01.mp3" },
    { song: "Easy Answers", link: "gd93-06-05d1t08.mp3" }
  ],
  1994: [
    { song: "Samba In The Rain", link: "gd94-06-08d3t02.mp3" },
    { song: "If The Shoe Fits", link: "gd94-06-09d1t06.mp3" },
    { song: "Childhood’s End", link: "gd94-07-20d01t06.mp3" }
  ],
  1995: [{ song: "Unbroken Chain", link: "gd95-03-19d1t06.mp3" }]
};

const clearBarChart = year => {
  const el = d3.select(`#bar-chart`);
  el.selectAll("*").remove();
};

const clearTotalSongs = year => {
  const el = d3.select(`#total-songs-${year}`);
  el.selectAll("*").remove();
};

//side bar timeline scroll through years
export const makeTimeline = () => {
  const width = 100;

  const timeline = d3.select("#timeline-container");
  const height = timeline.node().getBoundingClientRect().height;
  let child = timeline
    .append("div")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "timeline-flex");

  for (let i = 1965; i <= 1995; i++) {
    child
      .append("span")
      .attr("class", "year-tick")
      .attr("id", `year-tick-${i}`)
      .html(i.toString());
  }
};

const clearTotalShows = year => {
  const el = d3.select(`#total-shows-${year}`);
  el.selectAll("*").remove();
};

const clearDebuts = year => {
  const d = d3.select(`#debut-div-${year}`);
  d.selectAll("*").remove();
};

export const makeText = async (year, uniqueSongs, totalShows) => {
  clearBarChart(year);
  clearTotalSongs(year);
  clearTotalShows(year);
  clearDebuts(year);

  //centers numbers for 2 or 3 digits within circle
  let showsXPos = totalShows > 99 ? 8.3 : 10;
  let songsXPos = uniqueSongs > 99 ? 8.3 : 10;

  d3.select(`svg.card-${year}`)
    .append("text")
    .attr("class", "card-text")
    .attr("class", "bold")
    .attr("x", songsXPos)
    .attr("y", 104.5)
    .text(uniqueSongs)
    .style("font-size", ".4em")
    .style("fill", "var(--site-white)");

  d3.select(`svg.card-${year}`)
    .append("text")
    .attr("class", "card-text")
    .attr("class", "bold")
    .attr("x", showsXPos)
    .attr("y", 128)
    .text(totalShows)
    .style("font-size", ".4em")
    .style("fill", "var(--site-white)");

  const makeDebutDiv = () => {
    if (debuts[`${year}`] != false) {
      let debutContainer = d3.select(`#debut-div-${year}`);
      const urlRoot = `https://archive.org/details/AllGratefulDeadOriginalSongDebuts66-95/`;
      const arr = debuts[year];
      debutContainer
        .append("h4")
        .html(
          `<span class="larger">${
            arr.length
          }</span> Original Songs First Played in '${year.slice(2)}`
        );
      arr.forEach((el, i) =>
        debutContainer
          .append("a")
          .attr("class", "debut-box")
          .attr("target", "none")
          .attr("href", `${urlRoot}${el.link}`)
          .text(`${el.song}, `)
      );
    }
  };
  makeDebutDiv();
};
