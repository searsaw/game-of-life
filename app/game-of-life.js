import d3 from 'd3';
import { updateData } from './helpers';

let boardSideLength;
let intervalId = null;

export function setUpGameBoard(sideLength) {
    boardSideLength = sideLength;
}

export function startGame(rootElement, startingData, interval) {
    let tickNum = 0;
    let data = Array.prototype.slice.call(startingData, 0);

    let svg = d3.select(rootElement).select('svg')
        .attr('width', boardSideLength)
        .attr('height', boardSideLength);

    function updateGraph(data) {
        const circleOffset = (boardSideLength / data.length) / 2;
        const scale = d3.scale.linear()
            .domain([0, data.length])
            .range([0, boardSideLength]);

        let circleGroup = svg.selectAll('g')
            .data(data)
            .attr('height', d => boardSideLength / data.length)
            .attr('width', d => boardSideLength / data.length)
            .attr('transform', (d, i) => `translate(0, ${scale(i)})`);

        circleGroup.enter().append('g')
            .attr('height', d => boardSideLength / data.length)
            .attr('width', d => boardSideLength / data.length)
            .attr('transform', (d, i) => `translate(0, ${scale(i)})`);

        let circles = circleGroup.selectAll('circle')
            .data(d => d)
            .attr('cx', d => circleOffset)
            .attr('cy', d => circleOffset)
            .attr('r', d => circleOffset - data.length / 20)
            .attr('transform', (d, i) => `translate(${scale(i)})`)
            .classed('alive', d => d === 1);

        circles.enter().append('circle')
            .attr('cx', d => circleOffset)
            .attr('cy', d => circleOffset)
            .attr('r', d => 0)
            .attr('transform', (d, i) => `translate(${scale(i)})`)
            .classed('alive', d => d === 1)
            .transition()
                .attr('r', d => circleOffset - data.length / 20);

        circles.exit().remove();
    }


    function nextTick() {
        console.log(`tickNum: ${++tickNum}`);
        data = updateData(data);
        updateGraph(data);
    }

    if (intervalId) stopGame();
    updateGraph(startingData);
    intervalId = setInterval(nextTick, interval);
}

export function stopGame() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}
