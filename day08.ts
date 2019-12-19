import { readFileSync } from 'fs';

const data = readFileSync('inputs/day08.txt').toString();

const width = 25;
const height = 6;

let layers: string[] = new Array(data.length / (width * height)).fill(null)
    .map((t, index) => data.substring(index * (width * height), (index + 1) * (width * height)));

const countDigits = (layer: string, digit: string): number => {
    return layer.split(digit).length - 1;
}

const stackLayers = (layers: string[]): string => {
    return new Array(layers[0].length).fill(null).map((t, index) => layers.find(layer => layer[index] !== '2')[index]).join('');
}

const zeroCounts = layers.map(layer => countDigits(layer, '0'));
const layer = layers[zeroCounts.indexOf(Math.min(...zeroCounts))];
const image = stackLayers(layers);

console.log(countDigits(layer, '1') * countDigits(layer, '2'));
console.log(new Array(image.length / width).fill(null).map((t, index) => image.substring(index * width, (index + 1) * width).replace(/0/g, ' ')))
