const countPasswords = (rangeFrom: number, rangeTo: number, isPartTwo?: boolean): number => {
    let count = 0;
    for (let i = rangeFrom; i <= rangeTo; i++) {
        if (checkPassword(i.toString(), isPartTwo)) count++;
    }
    return count;
}

var checkPassword = (password: string, isPartTwo?: boolean): boolean => {
    let hasRepeatingNums = false;
    for (let i = 0; i < password.length - 1; i++) {
        if (password[i + 1] < password[i]) return false;
        if (password[i + 1] == password[i] && (!isPartTwo || password[i + 2] != password[i] && password[i - 1] != password[i])) hasRepeatingNums = true;
    }
    return hasRepeatingNums;
}

console.log(countPasswords(128392, 643281))
console.log(countPasswords(128392, 643281, true));