"use client";

import * as d3 from "d3";
import { useEffect } from "react";
export default function PieChart({ mockData }) {
  const moodCountData = mockData.reduce((acc, curr) => {
    acc[curr.mood] = (acc[curr.mood] || 0) + 1;
    return acc;
  }, {});

  const moodCountArr = [];
  for (const i in moodCountData) {
    moodCountArr.push({
      mood: i,
      count: moodCountData[i],
    });
  }

  let pieGenerator = d3.pie().value((d) => d.count);
  let arcData = pieGenerator(moodCountArr);

  let arcGenerator = d3.arc().innerRadius(20).outerRadius(100);

  const color = d3
    .scaleOrdinal()
    .domain(moodCountArr.map((curr) => curr.mood))
    .range(d3.schemePaired);

  console.log(color("neutral"));
  useEffect(() => {
    d3.select(".pie")
      .selectAll("path")
      .data(arcData)
      .enter()
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => color(d))
      .attr("stroke", "white");
  }, []);

  return (
    <>
      <svg className="w-full h-full">
        <g className="pie" transform="translate(200, 200)"></g>
      </svg>
    </>
  );
}
