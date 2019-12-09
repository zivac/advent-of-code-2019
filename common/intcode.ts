import { createInterface } from 'readline';

export class Intcode {

    constructor(
        public memory: number[],
        public readline = createInterface(process.stdin, process.stdout)
    ) { }

    executeCommand(index: number): void {
        const opcode = this.memory[index] % 100;
        switch (opcode) {
            case 1:
                this.memory[this.memory[index + 3]] = this.getParameter(index, 1) + this.getParameter(index, 2);
                return index === this.memory[index + 3] ? this.executeCommand(index) : this.executeCommand(index + 4);
            case 2:
                this.memory[this.memory[index + 3]] = this.getParameter(index, 1) * this.getParameter(index, 2);
                return index === this.memory[index + 3] ? this.executeCommand(index) : this.executeCommand(index + 4);
            case 3:
                return this.readline.question('', input => {
                    this.memory[this.memory[index + 1]] = parseInt(input);
                    this.executeCommand(index + 2);
                })
            case 4:
                this.readline.write(this.getParameter(index, 1).toString() + '\n');
                return this.executeCommand(index + 2);
            case 5:
                if (this.getParameter(index, 1)) return this.executeCommand(this.getParameter(index, 2));
                else return this.executeCommand(index + 3);
            case 6:
                if (!this.getParameter(index, 1)) return this.executeCommand(this.getParameter(index, 2));
                else return this.executeCommand(index + 3);
            case 7:
                this.memory[this.memory[index + 3]] = this.getParameter(index, 1) < this.getParameter(index, 2) ? 1 : 0;
                return index === this.memory[index + 3] ? this.executeCommand(index) : this.executeCommand(index + 4);
            case 8:
                this.memory[this.memory[index + 3]] = this.getParameter(index, 1) == this.getParameter(index, 2) ? 1 : 0;
                return index === this.memory[index + 3] ? this.executeCommand(index) : this.executeCommand(index + 4);
            case 99:
                return this.readline.close();
            default:
                throw new Error('Something went wrong');
        }
    }

    getParameter(index: number, paramIndex: number): number {
        const command = this.memory[index].toString().split('').reverse().join('');
        const param = this.memory[index + paramIndex];
        const mode = parseInt(command[1 + paramIndex]);
        return mode ? param : this.memory[param];
    }

}