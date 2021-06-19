import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function BarChart({ barData, width, height }) {
  const ref = useRef(null);

  const margin = { top: 30, right: 0, bottom: 30, left: 40 };
  const color = 'steelblue';

  const y = d3.scaleLinear()
    .domain([0, d3.max(barData.data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top]);

  const x = d3.scaleBand()
    .domain(d3.range(barData.data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, barData.format))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
      .attr("x", -margin.left)
      .attr("y", 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text(barData.y));

  const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x)
      .tickFormat(i => barData.data[i].name)
      .tickSizeOuter(0)); 

  useEffect(() => {
    const svg = d3.select("svg")
      .attr("viewBox", [0, 0, width, height]);

    svg.append("g")
      .attr("fill", color)
      .selectAll("rect")
      .data(barData.data)
      .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth());

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);
  }, []);
  

  return (
    <svg width={width} height={height} ref={ref}></svg>
  );
}

export default BarChart;
