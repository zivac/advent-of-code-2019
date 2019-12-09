import { join } from 'path';
import { readFileSync } from 'fs';
import { Intcode } from './common/intcode';
import { Readable } from 'stream';
import { createInterface } from 'readline';
import { flatten } from 'lodash';

const getAmplifierInput = async (amplifier: Intcode): Promise<number> => {
    return new Promise(async (resolve) => {
        amplifier.readline.on('line', data => resolve(parseInt(data)));
        await amplifier.executeCommand(0);
    })
}

const testPhaseSequence = async (sequence: number[], output: number = 0): Promise<number> => {
    if (!sequence.length) return output;
    const input = new Readable({ read: () => { } });
    const amplifier = new Intcode(
        readFileSync(join(__dirname, 'inputs/day07.txt')).toString().split(',').map(num => parseInt(num.trim())),
        createInterface(input, null)
    );
    input.push(`${sequence.shift()}\n${output}\n`);
    return testPhaseSequence(sequence, await getAmplifierInput(amplifier));
}

const getPermutations = (sequence: number[]): number[][] => {
    if (sequence.length === 1) return [sequence];
    return flatten(sequence.map(el => getPermutations(sequence.filter(rest => rest !== el)).map(permutation => [el].concat(permutation))));
}

const findHighestSignal = async (): Promise<number> => {
    return Math.max(...await Promise.all(getPermutations([0, 1, 2, 3, 4]).map(sequence => testPhaseSequence(sequence))));
}

(async () => {
    console.log(await findHighestSignal())
})()
