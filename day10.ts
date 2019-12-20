import { readFileSync } from 'fs';
import { flatten, keys } from 'lodash';

const asteroidMap = readFileSync('inputs/day10.txt').toString().split('\n').map(row => row.split('').map(dot => dot == '#'))

const greatestCommonDenominator = (a: number, b: number): number => {
    if (b) return greatestCommonDenominator(b, a % b)
    return Math.abs(a)
}

const getAngle = (direction: string): number => {
    const point = direction.split(',').map(x => parseInt(x.trim()))
    const angle = Math.atan2(point[1], point[0])
    return angle >= 0 ? angle : angle + 2 * Math.PI;
}

const getDistance = (point1: [number, number], point2: [number, number]): number => {
    return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2))
}

const countVisibleAsteroids = (x: number, y: number, asteroidMap: boolean[][]): number => {
    if (!asteroidMap[x][y]) return 0
    const directions = new Set()
    return asteroidMap.reduce((sum, row, i) => row.reduce((sum, point, j) => {
        if (!point || (x == i && y == j)) return sum;
        const gcd = greatestCommonDenominator((x - i), (y - j))
        const direction = `${(x - i) / gcd},${(y - j) / gcd}`
        if (directions.has(direction)) return sum
        directions.add(direction)
        return sum + 1
    }, sum), 0)
}

const getVisibleMap = (x: number, y: number, asteroidMap: boolean[][]): {[direction: string]: [[number, number]]} => {
    const visibleMap = {};
    asteroidMap.forEach((row, i) => row.forEach((point, j) => {
        if (!point || (x == i && y == j)) return
        const gcd = greatestCommonDenominator((x - i), (y - j))
        const direction = `${(x - i) / gcd},${(j - y) / gcd}`
        if (!visibleMap[direction]) return visibleMap[direction] = [[j, i]]
        visibleMap[direction].push([j, i])
        visibleMap[direction].sort((a, b) => getDistance([x, y], a) - getDistance([x, y], b))
    }))
    return visibleMap
}

const countMap = asteroidMap.map((row, x) => row.map((point, y) => countVisibleAsteroids(x, y, asteroidMap)))
const maxCount = Math.max(...flatten(countMap))

console.log(maxCount)

const flatIndex = flatten(countMap).indexOf(maxCount)
const monitoringStationLocation = [flatIndex % asteroidMap[0].length, Math.floor(flatIndex / asteroidMap[0].length)]
const visibleMap = getVisibleMap(monitoringStationLocation[1], monitoringStationLocation[0], asteroidMap)
const laserOrder = keys(visibleMap).sort((a, b) => getAngle(a) - getAngle(b))
const stopNumber = 200;
let destroyCount = 0;
while(true) {
    for(let direction of laserOrder) {
        if (!visibleMap[direction].length) continue;
        const destroyedAsteroid = visibleMap[direction].shift();
        destroyCount ++;
        if (destroyCount === stopNumber) {
            console.log(destroyedAsteroid[0] * 100 + destroyedAsteroid[1]);
            break;
        }
    }
    if (destroyCount === stopNumber) break;
}