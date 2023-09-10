import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
// import { nodes, links } from '../data';
import data from "../data.json"

const NetworkChart = () => {
    const chartRef = useRef();
    let count = 0
    useEffect(() => {
        if (count === 0) {
            count++
            return
        }
        // Create a D3 force simulation
        const simulation = d3
            .forceSimulation(data.entities)
            .force('link', d3.forceLink(data.connections).id(d => d.id))
            .force('charge', d3.forceManyBody().strength(-100))
            .force('center', d3.forceCenter(300, 300));

        // Create SVG element
        const svg = d3.select(chartRef.current).append('svg').attr('width', 600).attr('height', 600);

        // Create links with arrowheads
        const link = svg
            .selectAll('.link')
            .data(data.connections)
            .enter()
            .append('line')
            .attr('class', 'link')
            .style('stroke', '#999');

        // Create nodes
        const node = svg
            .selectAll('.node')
            .data(data.entities)
            .enter()
            .append('circle')
            .attr('class', 'node')
            .attr('r', 20)
            .style('fill', '#69b3a2');

        // Add labels to nodes, positioned to the right
        const label = svg
            .selectAll('.label')
            .data(data.entities)
            .enter()
            .append('text')
            .attr('class', 'label')
            .text(d => d.name)
            .attr('x', d => d.x)
            .attr('y', d => d.y);

        // Update positions in the simulation
        simulation.on('tick', () => {
            // Remove unwanted links
            link.exit().remove();

            // Remove unwanted labels
            label.exit().remove();

            // Update positions of the remaining links and labels
            link
                .attr('x1', d => {
                    const sourceNode = data.entities.find(node => node.name === d.Start);
                    return sourceNode ? sourceNode.x : 0;
                })
                .attr('y1', d => {
                    const sourceNode = data.entities.find(node => node.name === d.Start);
                    return sourceNode ? sourceNode.y : 0;
                })
                .attr('x2', d => {
                    const targetNode = data.entities.find(node => node.name === d.End);
                    return targetNode ? targetNode.x : 0;
                })
                .attr('y2', d => {
                    const targetNode = data.entities.find(node => node.name === d.End);
                    return targetNode ? targetNode.y : 0;
                });

            // Update positions of the remaining nodes and labels
            node.attr('cx', d => d.x).attr('cy', d => d.y);

            label
                .attr('x', d => {
                    const radius = 20; // Radius of the circle
                    return d.x + (d.x > 300 ? radius + 10 : -(radius + 10)); // Adjust the x-offset as needed
                })
                .attr('y', d => {
                    const radius = 20; // Radius of the circle
                    return d.y + (d.y > 300 ? radius + 10 : -(radius + 10)); // Adjust the y-offset as needed
                });
        });


        return () => {
            // Clean up simulation when the component unmounts
            simulation.stop();
        };

    }, [count]);

    return <div ref={chartRef}></div>;
};

export default NetworkChart;
