import { songDataByYear, getAllSongDataByYear } from "./helpers.js";

//import { builtinModules } from "module";

const timelines = {
  1965: [
    "April - The Warlocks first show",
    "June 18 - Phil Joins Warlocks on Bass. Lineup finalized.",
    "December 1 - Enlisted by Ken Kesey to be house band for his Acid Test happenings.",
    "December 4 - first performance as The Grateful Dead at the San Jose Acid Test"
  ],
  1966: [
    "January 21 - The Trips Festival",
    "Febuary - Robert Hunter writes first lyric for the band",
    "July - First single Don't Ease Me In / Stealin'",
    "September - 710 Asbury Street in San Fransisco becomes the bands residence",
    "October 5th - California criminalizes LSD",
    "December 31 - MGM signs Grateful Dead to record label"
  ],
  1967: [
    "January 14 - The Human Be-In, Golden Gate Park",
    "March 17 - Self-titled first album released",
    "June 1 - First East Coast show in Tompkins Square Park",
    "June 18 - Monterey Pop Festival",
    "September 29 - Mickey Hart joins the band on drums",
    "October 2th - 710 Asbury raided. Pig Pen, Lesh, Weir get busted",
    "December 13 - Dark Star performed for the first time"
  ],
  1968: [
    "Febuary 4 - spiritual mentor Neal Cassady dies in Mexico",
    "March - The band moves out of 710 Asbury",
    "July 18 - Anthem of the Sun is released",
    "December 23 - Tom Constanten joins the band on piano"
  ],
  1969: [
    "June 20 - Aoxomoxoa released",
    "August 15 - The band perfoms poorly at Woodstock beginning their habit of 'blowing all the big ones'",
    "November 10 - Live / Dead released",
    "December 6 - Altamont Music Festival. Hells Angels kill a spectator as Rolling Stones performed after the Dead's set."
  ],
  1970: [
    "January - Arrested in New Orleans",
    "January 30 - Tom Constanten leaves the band",
    "June 14 - Workingman's Dead released",
    "November - American Beauty released"
  ],
  1971: [
    "Febuary - Truckin' hits number 64 on Billboard",
    "Febuary - Mickey leaves the band",
    "October 6 - Skull and Roses released",
    "October 19 - Keith Godcheux joins band on keys"
  ],
  1972: [
    "March 25 - Donna Godcheux joins band",
    "June 17 - Pig Pen's last show at Hollywood Bowl",
    "August 27 - fundraiser in Veneta, Oregon with Ken Kesey's and the pranksters. Later released as Sunshine Daydream",
    "November - Europe '72 released"
  ],
  1973: [
    "March 8 - Pigpen dies of liver failure at age 27",
    "July 13 - History of the Grateful Dead vol. 1 (Bear's Choice) released",
    "November 15 - Wake of the flood released"
  ],
  1974: [
    "Febuary - Skeleton's in the Closet released",
    "March 23 - The Wall of Sound debuts",
    "June 27 - From the Mars Hotel released",
    "October 20 - Farwell show before hiatus from touring"
  ],
  1975: ["September 1 - Blues for Allah released"],
  1976: ["June 3 - Touring Resumes", "June 26 - Steal Your Face released"],
  1977: [
    "May 8 - Barton Hall at Cornell University",
    "July 27 - Terripin Station released",
    "September 3 - Englishtown, NJ"
  ],
  1978: [
    "July 7 - First performance at Red Rocks",
    "July 15 - Shakedown Street released",
    "September - Three day series of performances at the Pyramids in Egypt",
    "November 11 - Saturday Night Live performance"
  ],
  1979: [
    "January 7 - First performance at Madison Sqare Garden",
    "Feburary 17 - First performance at the Oakland Coliseum",
    "Febuary 17 - Last show for Keith and Donna",
    "April 22 - Brent joins the band on keyboards"
  ],
  1980: [
    "April 28 - Go to Heaven released",
    "July 23 - Keith dies in a car accident",
    "September 25 - debut of the one accoustic/two electric sets format",
    "October - 8 night stay at Radio City Music Hall with live simulcast the final night "
  ],
  1981: ["March 25 - Reckoning released", "August 26 - Dead Set released"],
  1982: [],
  1983: [],
  1984: ["October 27 - Taper's Section formally established"],
  1986: [
    "July - The Dead tour with Bob Dylan and Tom Petty",
    "July 10 - Jerry lapses into diabetic coma for five days",
    "December 15 - First performance after Jerry's coma"
  ],
  1987: [
    "June 19 - Touch of Grey music video",
    "July 6 - In the Dark released",
    "July 10 - Bob Dylan tours with Dead",
    "September 15 - In the Dark goes platinum"
  ],
  1988: ["June 25 - Bruce Hornsby opens for and plays with band in Ohio"],
  1989: [
    "January 31 - Dylan and the Dead released",
    "October 8 - Formerly the Warlocks play two nights at Hampton Colliseum in Virginia",
    "October 31 - Built to Last released"
  ],
  1990: [
    "July 26 - Brent dies of an overdose of cocaine and heroin",
    "September 7 - Vince Welnick joins the band on keys",
    "September 15 - Bruce Hornsby joins band as a regular guest on keys",
    "September 25 - Without a Net released"
  ],
  1991: [
    "April 15 - One from the Vault is released - the first of the many ongoing releases of archived material in the band's vault",
    "December 31 - Last New Year's Eve Show",
    "December - Grateful Dead become the top-grossing band in the US"
  ],
  1992: [
    "March - Bruce leaves the band",
    "May 12 - Two from the Vault released",
    "August - Jerry collapses from exhaustion and remainder of tour is canceled"
  ],
  1993: [
    "November 1 - Dick's Picks Volume 1 is released",
    "December 31 - Grateful Dead are highest grossing concert attraction in US"
  ],
  1994: ["January 19 - Inducted into the Rock and Roll Hall of Fame"],
  1995: [
    "March 7 - Dick's Picks volume 2 released",
    "July 9 - Soldier Field last Grateful Dead show",
    "August 9 - Jerry dies at age 53"
  ]
};

const hunterSongs = [
  "alabama getaway",
  "alligator",
  "althea",
  "attics of my life",
  "believe it or not",
  "bird song",
  "black muddy river",
  "black peter",
  "blues for allah",
  "box of rain",
  "broke down palace",
  "brown eyed women",
  "built to last",
  "candyman",
  "casey jones",
  "china cat sunflower",
  "china doll",
  "clementine",
  "comes a time",
  "corrina",
  "cosmic charlie",
  "crazy fingers",
  "cumberland blues",
  "dark star",
  "days between",
  "deal",
  "dire wolf",
  "doin' that rag",
  "dupree's diamond blues",
  "duquesne whistle",
  "easy wind",
  "the eleven",
  "eyes of the world",
  "fire on the mountain",
  "foolish heart",
  "france",
  "franklin's tower",
  "friend of the devil",
  "greatest story ever told",
  "he's gone",
  "help on the way",
  "here comes sunshine",
  "high time",
  "hollywood cantata",
  "if i had the world to give",
  "it must have been the roses",
  "jack straw",
  "keep your day job",
  "lazy river road",
  "let me sing your blues away",
  "liberty",
  "loose lucy",
  "loser",
  "mason's children",
  "mississippi half-step uptown toodeloo",
  "mountains of the moon",
  "mr charlie",
  "new speedway boogie",
  "playing in the band",
  "ramble on rose",
  "ripple",
  "rosemary",
  "row jimmy",
  "saint stephen",
  "scarlet begonias",
  "shakedown street",
  "ship of fools",
  "so many roads",
  "stagger lee",
  "standing on the moon",
  "stella blue",
  "sugar magnolia",
  "sugaree",
  "sunshine daydream",
  "terrapin station",
  "they love each other",
  "till the morning comes",
  "to lay me down",
  "touch of grey",
  "truckin",
  "u.s. blues",
  "uncle john's band",
  "unusual occurences in the desert",
  "wave that flag",
  "way to go home",
  "west l.a. fadeaway",
  "wharf rat",
  "what's become of the baby",
  "the wheel",
  "when push comes to shove"
];

const barlowSongs = [
  "black throated wind",
  "blow away",
  "cassidy",
  "easy to love you",
  "estimated prophet",
  "feel like a stranger",
  "gentlemen, start your engines",
  "heaven help the fool",
  "hell in a bucket",
  "i need a miracle",
  "i will take you home",
  "just a little light",
  "lazy lightnin'",
  "let it grow",
  "looks like rain",
  "lost sailor",
  "mexicali blues",
  "the music never stopped",
  "my brother esau",
  "picasso moon",
  "saint of circumstance",
  "supplication",
  "throwing stones",
  "we can run"
];

//urlRoot = `https://archive.org/details/AllGratefulDeadOriginalSongDebuts66-95/`
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

const data = songDataByYear();

//tested in console returns {year: <string>, songs: <array>, uniqueSongs: <number>}
const getSongData = async year => {
  let yearData = await getAllSongDataByYear(year, data);
  return yearData;
};

//returns array of top five song objects {name: <string>, count: <number>}
const topTenSongs = yearData => {
  const songArr = yearData.songs;
  return songArr
    .sort((a, b) => b.count - a.count)
    .filter(d => {
      return d.name != "Space" && d.name != "Drums";
    })
    .slice(0, 10);
};
//returns an of html string of <a>
const songDebuts = async year => {
  const urlRoot = `https://archive.org/details/AllGratefulDeadOriginalSongDebuts66-95/`;
  const arr = await debuts[year];
  if (!arr) {
    return " ";
  }
  return arr
    .map(el => `<a target="none" href="${urlRoot}${el.link}">${el.song}, </a>`)
    .join("");
};

const clearBarChart = year => {
  const el = d3.select(`#bar-chart`);
  el.selectAll("*").remove();
};

const clearTotalSongs = year => {
  const el = d3.select(`#total-songs-${year}`);
  el.selectAll("*").remove();
};

// margin-left: 20px;
// border-right: solid 1px var(--site-black);
// width: 100px;
// height: 100%;
// position: fixed;
// top: 0;
// left: 0;

export const makeTimeline = () => {
  const margin = { top: 5, right: 5, bottom: 5, left: 20 };
  const width = 100;

  const left = 0;
  const top = 0;

  const timeline = d3.select("#timeline-container");
  const height = timeline.node().getBoundingClientRect().height;
  console.log(height);
  const yScale = d3
    .scaleLinear()
    .domain([65, 95])
    .range([margin.top, height - margin.bottom]);

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

export const makeText = async (
  year,
  uniqueSongs,
  totalShows,
  diff,
  uniqueDiff,
  hunter,
  barlow
) => {
  clearBarChart(year);
  clearTotalSongs(year);
  clearTotalShows(year);

  const debutData = await songDebuts(year);
  const songData = await getSongData(year);
  let data = await topTenSongs(songData);
  const margin = { top: 5, right: 20, bottom: 15, left: 100 };

  const height = 375 - margin.left - margin.right;
  const width = 330 - margin.left;
  const color = Number(year) % 2 === 0 ? "#3b8eb0" : "#d83a2f";
  const fontColor = Number(year) % 2 === 0 ? "blue" : "red";

  const barYear = d3.select("#bar-year");

  const totalShow = d3.select(`#total-shows-${year}`);

  const totalSong = d3.select(`#total-songs-${year}`);

  const debut = d3.select(`#song-debuts-${year}`);

  totalSong.attr("class", `data`).html(`
      <div class="totals">
        <span class="main">
          ${uniqueSongs}
        </span>
        <span  class="diff"> ${uniqueDiff}
        </span>
      </div>`);

  totalShow.attr("class", `data`).html(
    `<div class="totals">
        <span class="main">
          ${totalShows}
        </span>
        <span class="diff">
           ${diff}
        </span>
      </div>`
  );

  debut.attr("class", `bold debut-box`).html(`<p>${debutData}</p>`);

  barYear.text(`Most played - ${year}`);
};
