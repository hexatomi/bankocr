let id = 0;

export const createId = (): string => {
    id++;
    return `${id}`;
};

export const codedNumbers = [
    ' _ | ||_|',
    '     |  |',
    ' _  _||_ ',
    ' _  _| _|',
    '   |_|  |',
    ' _ |_  _|',
    ' _ |_ |_|',
    ' _   |  |',
    ' _ |_||_|',
    ' _ |_| _|',
];

export const transformCodeToNumbers = (codedNumber: string) => {
    const caseByRows = codedNumber.split('\n');

    const row1 = caseByRows[0].split('');
    const row2 = caseByRows[1].split('');
    const row3 = caseByRows[2].split('');

    const positions: Record<string, { raw: string; real: string }> = {
        0: { raw: '', real: '0' },
        1: { raw: '', real: '0' },
        2: { raw: '', real: '0' },
        3: { raw: '', real: '0' },
        4: { raw: '', real: '0' },
        5: { raw: '', real: '0' },
        6: { raw: '', real: '0' },
        7: { raw: '', real: '0' },
        8: { raw: '', real: '0' },
    };

    let result = '';

    const pushCharsByIndex = (char: string, index: number) => {
        const slot = Math.floor(index / 3);
        positions[slot].raw += char;
    };

    row1.forEach((char, index) => {
        pushCharsByIndex(char, index);
    });
    row2.forEach((char, index) => {
        pushCharsByIndex(char, index);
    });
    row3.forEach((char, index) => {
        pushCharsByIndex(char, index);
    });

    Object.values(positions).forEach((value) => {
        let found = false;
        codedNumbers.forEach((cn, cni) => {
            if (value.raw === cn) {
                value.real = `${cni}`;
                result += value.real;
                found = true;
            }
        });
        if (!found) {
            result += '?';
        }
    });

    return result;
};