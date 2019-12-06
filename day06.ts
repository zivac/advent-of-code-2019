import { join } from 'path';
import { readFileSync } from 'fs';

const countOrbits = (planet): number => {
    if (planet === 'COM') return null;
    return 1 + countOrbits(orbitMap[planet]);
}

const getChain = (planet): string[] => {
    if (planet === 'COM') return ['COM'];
    return [planet].concat(getChain(orbitMap[planet]));
}

const orbitMap: {[planet: string]: string} = { 'COM': null };
const orbits: string[][] = readFileSync(join(__dirname, 'inputs/day06.txt')).toString().split('\n').map(line => line.split(')'));
orbits.forEach(orbit => orbitMap[orbit[1]] = orbit[0]);

const totalNumOrbits = orbits.reduce((sum, orbit) => {
    return sum + countOrbits(orbit[1]);
}, 0)

const startChain = getChain('YOU');
const goalChain = getChain('SAN');
const commonPlanet = startChain.find(planet => goalChain.indexOf(planet) !== -1);
const totalLength = startChain.indexOf(commonPlanet) + goalChain.indexOf(commonPlanet) - 2;

console.log(totalNumOrbits);
console.log(totalLength);