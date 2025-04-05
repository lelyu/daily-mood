// src/components/PieChart.tsx (or similar path)
"use client"; // Needed for useRef, useState, useEffect

import React, { useState, useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";

// Interfaces remain the same
interface AggregatedMoodData {
  mood: string;
  count: number;
}

interface MoodEntry {
  id: number;
  date: string;
  mood: string;
  note: string;
  intensity: number;
}

interface PieChartProps {
  data: MoodEntry[];
  innerRadiusRatio?: number;
  // No width/height props needed by default anymore
  // Optional: Could add minWidth/minHeight props if desired
}

export default function PieChart({
  data,
  innerRadiusRatio = 0,
}: PieChartProps) {
  // Ref for the container div we'll measure
  const containerRef = useRef<HTMLDivElement>(null);

  // State to store the measured dimensions
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  // --- 1. Measure Container Size ---
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Set initial dimensions
    setDimensions({ width: element.clientWidth, height: element.clientHeight });

    // Use ResizeObserver to detect size changes
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) {
        return;
      }
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    resizeObserver.observe(element);

    // Cleanup observer on component unmount
    return () => resizeObserver.disconnect();
  }, []); // Empty dependency array means this runs once on mount

  // --- 2. Data Aggregation (same as before) ---
  const aggregatedData: AggregatedMoodData[] = useMemo(() => {
    if (!data) return [];
    const moodCounts = d3.rollup(
      data,
      (v) => v.length,
      (d) => d.mood
    );
    return Array.from(moodCounts, ([mood, count]) => ({ mood, count }));
  }, [data]);

  // --- 3. D3 Setup (Calculations based on measured dimensions) ---
  const { color, arc, labelArc, arcsData } = useMemo(() => {
    // Use measured dimensions from state
    const { width, height } = dimensions;

    // Handle initial render or zero dimensions
    if (width === 0 || height === 0) {
      return { color: null, arc: null, labelArc: null, arcsData: [] };
    }

    const currentHeight = Math.min(width, height); // Maintain aspect ratio somewhat
    const outerRadius = Math.min(width, currentHeight) / 2 - 1;
    const currentInnerRadius =
      outerRadius * Math.max(0, Math.min(1, innerRadiusRatio));

    const color = d3
      .scaleOrdinal<string>()
      .domain(aggregatedData.map((d) => d.mood))
      .range(
        d3
          .quantize(
            (t) => d3.interpolateSpectral(t * 0.8 + 0.1),
            aggregatedData.length
          )
          .reverse()
      );

    const pie = d3
      .pie<AggregatedMoodData>()
      .sort(null)
      .value((d) => d.count);

    const arc = d3
      .arc<d3.PieArcDatum<AggregatedMoodData>>()
      .innerRadius(currentInnerRadius)
      .outerRadius(outerRadius);

    const labelRadius = outerRadius * 0.75;
    const labelArc = d3
      .arc<d3.PieArcDatum<AggregatedMoodData>>()
      .innerRadius(labelRadius)
      .outerRadius(labelRadius);

    const arcsData = pie(aggregatedData);

    return { color, arc, labelArc, arcsData };
  }, [aggregatedData, dimensions, innerRadiusRatio]); // Recalculate when dimensions change

  // --- 4. JSX Rendering ---
  if (!aggregatedData || aggregatedData.length === 0) {
    return (
      <div ref={containerRef} className="w-full h-64 text-center p-4">
        No data available.
      </div>
    );
  }

  // Use the containerRef on the wrapper div with Tailwind classes
  return (
    <div
      ref={containerRef}
      // --- Tailwind classes define the size ---
      // Example: Full width on small screens, fixed 600px on md+, specific height
      className="text-sm w-full h-[400px] md:w-[600px] md:h-[500px] mx-auto" // Added mx-auto for centering if width is fixed
    >
      {/* Render SVG only when dimensions are known and valid */}
      {dimensions.width > 0 &&
        dimensions.height > 0 &&
        arc &&
        color &&
        labelArc && (
          <svg
            // SVG fills the container div
            width={dimensions.width}
            height={dimensions.height}
            // ViewBox dynamically updates based on measured size for centering
            viewBox={`${-dimensions.width / 2} ${-dimensions.height / 2} ${
              dimensions.width
            } ${dimensions.height}`}
          >
            <g stroke="white" strokeWidth={1}>
              {arcsData.map((arcItem, index) => (
                <path
                  key={arcItem.data.mood || index}
                  d={arc(arcItem) || ""} // Use calculated arc generator
                  fill={color(arcItem.data.mood)}
                >
                  <title>{`${arcItem.data.mood}: ${arcItem.data.count}`}</title>
                </path>
              ))}
            </g>
            <g textAnchor="middle">
              {arcsData.map((arcItem, index) => {
                const [x, y] = labelArc.centroid(arcItem);
                const angle = arcItem.endAngle - arcItem.startAngle;
                if (angle < 0.25) return null;
                return (
                  <text
                    key={arcItem.data.mood || index + "-label"}
                    transform={`translate(${x}, ${y})`}
                    fill="#333"
                    dy="0.35em"
                  >
                    {arcItem.data.mood}
                    <tspan
                      x="0"
                      dy="1.2em"
                      fontSize="0.8em"
                      fill="#666"
                      fontWeight="normal"
                    >
                      {arcItem.data.count}
                    </tspan>
                  </text>
                );
              })}
            </g>
          </svg>
        )}
      {(dimensions.width === 0 || dimensions.height === 0) && (
        <div className="flex items-center justify-center h-full text-gray-500">
          Loading Chart...
        </div>
      )}
    </div>
  );
}
