import { readFileSync } from 'fs';
import { join } from 'path';

const dayOnePartOne = (modules: number[]): number => {
    return modules.reduce((sum, weight) => {
        return sum + Math.floor(weight / 3) - 2;
    }, 0)
};

const dayOnePartTwo = (modules: number[]): number => {
    return modules.reduce((sum, weight) => {
        let fuel: number, remainingWeight = weight;
        do {
            fuel = Math.floor(remainingWeight / 3) - 2;
            remainingWeight = fuel;
            sum += Math.max(fuel, 0);
        } while (fuel > 0)
        return sum;
    }, 0)
};

const modules = readFileSync(join(__dirname, 'inputs/day01.txt')).toString().split('\n').map(part => parseInt(part.trim()))

console.log(dayOnePartOne(modules));
console.log(dayOnePartTwo(modules));