import { readFileSync } from 'fs';
import { join } from 'path';

const executeCommand = (intcode: number[], index: number): void => {
    switch (intcode[index]) {
        case 1:
            intcode[intcode[index + 3]] = intcode[intcode[index + 1]] + intcode[intcode[index + 2]];
            return executeCommand(intcode, index + 4);
        case 2:
            intcode[intcode[index + 3]] = intcode[intcode[index + 1]] * intcode[intcode[index + 2]];
            return executeCommand(intcode, index + 4);
        case 99:
            return;
        default:
            throw new Error('Something went wrong');
    }
}

const tryInputs = (noun: number, verb: number): number => {
    const intcode = readFileSync(join(__dirname, 'inputs/day02.txt')).toString().split(',').map(part => parseInt(part.trim()))
    intcode[1] = noun;
    intcode[2] = verb;
    executeCommand(intcode, 0);
    return intcode[0];
}

const findInputs = (maxNoun: number, maxVerb: number, expectedOutput: number): number => {
    for (let noun = 0; noun < maxNoun; noun++) {
        for (let verb = 0; verb < maxVerb; verb++) {
            if (tryInputs(noun, verb) === expectedOutput) return 100 * noun + verb;
        }
    }
}

console.log(tryInputs(12, 2));
console.log(findInputs(100, 100, 19690720));