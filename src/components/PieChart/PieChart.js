import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

function PieChart({ 
  pieData, 
  width, 
  height, 
}) {
  const ref = useRef(null);

  const createPie = d3
    .pie()
    .value(d => d.value)
    .sort(null);

  const createArc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2 - 1);
  
  const color = d3
    .scaleOrdinal()
    .domain(pieData.data.map(d => d.name))
    .range(d3.quantize(
        t => d3.interpolateSpectral(t * 0.8 + 0.1), 
        pieData.data.length
      )
    .reverse());

  useEffect(() => {
    const arcLabel = () => {
      const radius = Math.min(width, height) / 2 * 0.8;
      return d3.arc().innerRadius(radius).outerRadius(radius);
    };

    const arcs = createPie(pieData.data);

    const svg = d3.select(ref.current)
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

    svg.append("g")
      .attr("stroke", "white")
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", d => color(d.data.name))
      .attr("d", createArc)
      .append("title")
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
      .attr("transform", d => `translate(${arcLabel().centroid(d)})`)
      .call(text => 
        text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text(d => d.data.name))
      .call(text => 
        text.filter(d => (d.endAngle - d.startAngle) < 0.25).append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .attr("font-size", 8)
          .text(d => d.data.name))
      .call(text =>
        text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text(d => d.data.value.toLocaleString()))
      .call(text =>
        text.filter(d => (d.endAngle - d.startAngle) < 0.25).append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .attr("font-size", 8)
          .text(d => {
            const valueStr = d.data.value.toString();
            if (d.data.value < 10000000) {
              return `${valueStr[0]},${valueStr[1]}M`;
            } else {
              return `${valueStr[0]}${valueStr[1]}M`;
            }
            
          }));
    }, [pieData, width, height, color, createArc, createPie]);

  return (
    <svg width={width} height={height} ref={ref}></svg>
  );
}

PieChart.defaultProps = {
  width: 500,
  height: 500,
};

PieChart.propTypes = {
  pieData: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })
    ).isRequired,
    format: PropTypes.string.isRequired,
    y: PropTypes.string.isRequired,
  }).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default PieChart;
