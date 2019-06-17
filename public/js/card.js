//creates the card svg with image. remainder of content from ./textContent

import { yearArr } from "./fetchData.js";
const years = yearArr();

export const makeCard = () => {
  const selection = d3.select(`#sections`);

  let topDiv = selection
    .selectAll(".card")
    .data(years)
    .enter()
    .append("div")
    .attr("class", "scroll-trigger")
    .attr("id", (d, i) => `${d}`);

  const cardFlexContainer = topDiv
    .append("div")
    .attr("class", (d, i) => `card-flex-container`)
    .style("width", "45%")
    .style("margin-top", "0");

  const cardContainer = cardFlexContainer
    .append("div")
    .attr("class", "card-container")
    .style("width", "338px");

  const svg = cardContainer
    .append("svg")
    .attr("class", d => `card-${d}`)
    .attr("viewBox", "0 0 129.3 155");

  svg.html(
    d =>
      `<defs>
        <style>
            .e7faa01f-a053-49cc-9177-06ae472c27ff{fill:#fff;}
            .bd112d82-b168-4168-9e4c-f83a76ba97d6,.e7faa01f-a053-49cc-9177-06ae472c27ff{stroke:var(--site-black);stroke-miterlimit:10;stroke-width:0.1px;}
            .f0c7fcb0-6bc7-46dc-9c45-519f5ba00ed9{fill:#191d98;}
            .a5b7bcfb-73b6-4376-9898-d1e3c55d92d7{font-size:6.4px;}
            .a5b7bcfb-73b6-4376-9898-d1e3c55d92d7,.af19c8f9-c5f7-4585-af77-c1cf3237f7f9{fill:#1a1a1a;}
            .a5b7bcfb-73b6-4376-9898-d1e3c55d92d7,.af19c8f9-c5f7-4585-af77-c1cf3237f7f9,.b7e74660-b406-4249-856f-d461853daa26,.bc81b1a8-9bb9-4b3c-b0c4-8a2d1bf25b75{font-family:"Merryweather" serif}
           

            .bc81b1a8-9bb9-4b3c-b0c4-8a2d1bf25b75{font-size:6.44px;fill:#edeee0;}
            .bd112d82-b168-4168-9e4c-f83a76ba97d6{fill:none;}
            .b7e74660-b406-4249-856f-d461853daa26{font-size:8.28px; fill:#191d98}
            
            .b7eae982-6b42-48a6-8400-40bc997a4a6b{fill:#991d18;}
            .af19c8f9-c5f7-4585-af77-c1cf3237f7f9{font-size:6.44px;}
            
        </style>
    </defs>
    <title>card</title>
    <g id="e7c8dcc4-3e8c-492a-bcb1-df7a07fdec62" data-name="Layer 2">
    <g id="bb82f180-8d50-4e0b-89be-fce33a0d1602" data-name="song-data">
        <rect class="year-bg e7faa01f-a053-49cc-9177-06ae472c27ff" x="0.2" y="0.2" width="129" height="155"/>
        <polygon class="year-poly" points="0,0 27,0 27,143 0, 155 0,0" fill="#fff"/>
        <circle class="f0c7fcb0-6bc7-46dc-9c45-519f5ba00ed9" cx="13.6" cy="113" r="8.9"/>
        <text class="a5b7bcfb-73b6-4376-9898-d1e3c55d92d7" transform="translate(26.9 115)">
            <tspan class="a2ab463e-74fc-4fab-9e6a-cc76dd59f4f7">Total Shows</tspan></text>
            <text class="bc81b1a8-9bb9-4b3c-b0c4-8a2d1bf25b75" transform="translate(31.5 109.5)"></text>
            <rect class="bd112d82-b168-4168-9e4c-f83a76ba97d6" x="0.2" y="20" width="129" height="73"/>
            <text class="b7e74660-b406-4249-856f-d461853daa26" transform="translate(3.5 13) ">${d}</text>
            <circle class="b7eae982-6b42-48a6-8400-40bc997a4a6b" cx="13.6" cy="135" r="8.9"/>
            <text class="af19c8f9-c5f7-4585-af77-c1cf3237f7f9" transform="translate(26.9, 137)">Unique Songs</text></g></g>`
  );

  svg
    .append("svg:image")
    .attr("x", 0)
    .attr("y", 20)
    .attr("width", 129)
    .attr("height", 73)
    .attr("xlink:href", d => `../images/${d}.jpg`)
    .style("position", "fixed")
    .style("top", "0");

  cardContainer
    .append("div")
    .attr("class", "debut-links")
    .attr("id", d => `debut-div-${d}`);

  cardContainer.append("div").attr("class", "div-padding");

  const container = topDiv
    .append("div")
    .attr("class", "charts-year-container-col")
    .style("width", "50%");

  container.append("div").attr("class", d => `charts-year-bubble-${d}`);
  container.append("div").attr("class", d => `charts-year-bar-${d}`);
};
