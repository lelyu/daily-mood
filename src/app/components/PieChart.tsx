"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";

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
}

export default function PieChart({
  data,
  innerRadiusRatio = 0,
}: PieChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

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

    return () => resizeObserver.disconnect();
  }, []);

  const aggregatedData: AggregatedMoodData[] = useMemo(() => {
    if (!data) return [];
    const moodCounts = d3.rollup(
      data,
      (v) => v.length,
      (d) => d.mood
    );
    return Array.from(moodCounts, ([mood, count]) => ({ mood, count }));
  }, [data]);

  const { color, arc, labelArc, arcsData } = useMemo(() => {
    const { width, height } = dimensions;

    if (width === 0 || height === 0) {
      return { color: null, arc: null, labelArc: null, arcsData: [] };
    }

    const currentHeight = Math.min(width, height);
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
  }, [aggregatedData, dimensions, innerRadiusRatio]);

  if (!aggregatedData || aggregatedData.length === 0) {
    return (
      <div ref={containerRef} className="w-full h-64 text-center p-4">
        No data available.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="text-sm w-full h-[400px] md:w-[600px] md:h-[500px] mx-auto"
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
                  d={arc(arcItem) || ""}
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
