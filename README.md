## Darkstar project / GRATEFUL DATA

## What is this?

Grateful Data is a website that uses data visualizations to describe the career arc of the pioneering jam band and psychedelic phenomenon, The Grateful Dead.

### Inspiration

I've been facinated by Data visualization work as a reader long before I ever started programming. Sites like FiveThiryEight, The Pudding, and The New York Times Upshot and Infographics sections. Although I'm an avid reader, I also am a visual learner and well crafted piece of data journalism can help me understand complex topics quickly and concisely.

Data Visualization combines the worlds of code, mathematics, design and storytelling.

I that started as I was beginning to explore the world of data visualizations with D3 and SVG animations

Experimental work for this project can be seen here at Observable which can offer insight as to most the the methodology in creating the graphs.

### Goals

1. Get to know the D3.js API by building things. The D3 ecosystem is quite large, so to truly get a grasp around it, I wanted to use a project that would explore as many D3 features as possible

2. Build an application without React. As I really only began web developement after the phenomenon of component based frameworks like React, Angular, and Vue-- I wanted to understand what the challenges and /or benefits there would be from working without these tools. I ended up using d3's very jQuery-like methods to select and maninpulate DOM elements.

3. Improve my understanding and skills of building and animating svg graphics.

4. Listen to a lot of Grateful Dead. (Ok,year this one I probably would have done anyways :) )

5. Improve my interactive and informatic design skills--Always fun. Always much, much harder than I think

### Explorations

#### For the bands entire career:

- what songs were played the most?
- How can we think about bredth of the full repetoir visually?

#### For each year:

- what songs were played the most?
- what songs were played for the first time?

#### For each song:

- when was the song first played?
- what year was the song played the most?
- when year was the song last played?

### Basic Data Gathering Methodology

I wrote Javascript functions to query the Setlist.fm API and write a json file that is a detailed list of as statistics setlist.fm has for every concert the Grateful Dead played. You can see this full list in data/grateful-setlist.json

This data was parsed and formatted into several other json two files that the visualizations use. The data can be broken down into three catagories: full career statistics, statistics for each year, and statistics for each song.

### Challenges

### Next Steps
