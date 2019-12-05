import { join } from 'path';
import { Intcode } from './common/intcode';
import { readFileSync } from 'fs';

const intcode = new Intcode(readFileSync(join(__dirname, 'inputs/day05.txt')).toString().split(',').map(part => parseInt(part.trim())));
intcode.executeCommand(0);
