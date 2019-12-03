import { readFileSync } from 'fs';
import { join } from 'path';
import { intersection, keys, sum } from 'lodash';

const traceWire = (wirePath: string[]): { [key: string]: number } => {
    const wireMap = {};
    let point = [0, 0], distance = 0;
    wirePath.forEach(pathSegment => {
        const direction = pathSegment[0];
        const length = parseInt(pathSegment.substr(1));
        for (let i = 0; i < length; i++) {
            distance++;
            point[direction === 'R' || direction === 'L' ? 0 : 1] += (direction === 'R' || direction === 'D') ? 1 : -1;
            if (!wireMap[point.toString()]) wireMap[point.toString()] = distance;
        }
    })
    return wireMap;
}

const manhattanDistance = (point1: number[], point2: number[] = [0, 0]): number => {
    return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
}

const wirePaths = readFileSync(join(__dirname, 'inputs/day03.txt')).toString().split('\n').map(line => line.split(','));
const tracedWires = wirePaths.map(traceWire);
const intersections = intersection(...tracedWires.map(keys)).map(key => key.split(',').map(part => parseInt(part.trim())));
const closestDistance = intersections.reduce((closest, intersection) => Math.min(closest, manhattanDistance(intersection)), Infinity);
const shortestPath = intersections.reduce((shortest, intersection) => Math.min(shortest, sum(tracedWires.map(wire => wire[intersection.toString()]))), Infinity);

console.log(closestDistance);
console.log(shortestPath);