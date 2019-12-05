import { Intcode } from './common/intcode';
import { readFileSync, exists } from 'fs';
import { join } from 'path';

const tryInputs = (noun: number, verb: number): number => {
    const intcode = new Intcode(readFileSync(join(__dirname, 'inputs/day02.txt')).toString().split(',').map(part => parseInt(part.trim())))
    intcode.memory[1] = noun;
    intcode.memory[2] = verb;
    intcode.executeCommand(0);
    return intcode.memory[0];
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