"use client";

import React, { useEffect, useRef, useState, useMemo } from "react"; // Import React and hooks
import * as d3 from "d3";

export default function PieChart({ mockData }) {
  const moodCountData = useMemo(() => {
    if (!mockData) return {};
    return mockData.reduce((acc, curr) => {
      acc[curr.mood] = (acc[curr.mood] || 0) + 1;
      return acc;
    }, {});
  }, [mockData]);

  const moodCountArr = useMemo(() => {
    return Object.entries(moodCountData).map(([mood, count]) => ({
      mood,
      count,
    }));
  }, [moodCountData]);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const svgRef = useRef(null);

  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) return;

    const updateDimensions = () => {
      setDimensions({
        width: svgElement.clientWidth,
        height: svgElement.clientHeight,
      });
    };
    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(svgElement);

    return () => resizeObserver.disconnect();
  }, []);

  const { arcGenerator, arcData, color } = useMemo(() => {
    if (
      dimensions.width === 0 ||
      dimensions.height === 0 ||
      moodCountArr.length === 0
    ) {
      return { arcGenerator: null, arcData: [], color: null };
    }

    let pieGenerator = d3.pie().value((d) => d.count);
    let calculatedArcData = pieGenerator(moodCountArr);

    const outerRadius =
      (Math.min(dimensions.width, dimensions.height) / 2) * 0.9;
    const innerRadius = outerRadius * 0.3;

    let calculatedArcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const calculatedColor = d3
      .scaleOrdinal(d3.schemeCategory10)
      .domain(moodCountArr.map((d) => d.mood));

    return {
      arcGenerator: calculatedArcGenerator,
      arcData: calculatedArcData,
      color: calculatedColor,
    };
  }, [dimensions, moodCountArr]);

  const gRef = useRef(null);

  useEffect(() => {
    if (!gRef.current || !arcGenerator || !color || arcData.length === 0) {
      if (gRef.current) {
        d3.select(gRef.current).selectAll("*").remove();
      }
      return;
    }

    const svgGroup = d3.select(gRef.current);

    svgGroup
      .selectAll("path")
      .data(arcData)
      .join("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => color(d.data.mood))
      .attr("stroke", "white")
      .attr("stroke-width", 1.5);

    svgGroup
      .selectAll("text")
      .data(arcData)
      .join("text")
      .each(function (d) {
        let centroid = arcGenerator.centroid(d);
        d3.select(this)
          .attr("x", centroid[0])
          .attr("y", centroid[1])
          .attr("dy", "0em")
          .attr("dx", "-3em")
          .attr("font-size", "1em")
          .text(d.data.mood + ": " + d.data.count);
      });
  }, [arcData, arcGenerator, color]);

  const transform =
    dimensions.width > 0 && dimensions.height > 0
      ? `translate(${dimensions.width / 2}, ${dimensions.height / 2})`
      : "";

  return (
    <>
      <svg ref={svgRef} className="w-full h-full">
        <g ref={gRef} className="pie" transform={transform}></g>
      </svg>
    </>
  );
}
