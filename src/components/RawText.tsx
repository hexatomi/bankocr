import { codedNumbers } from "../utils/utils";

interface RawTextProps {
    text: string;
}

const transformCodeToNumbers = (codedNumber) => {
    const caseByRows = codedNumber.split('\n');

    const row1 = caseByRows[0].split('');
    const row2 = caseByRows[1].split('');
    const row3 = caseByRows[2].split('');

    const positions = {
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

    const pushCharsByIndex = (char, index) => {
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

    let result = '';

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

export default function RawText({ text }: RawTextProps) {
    
    const result = transformCodeToNumbers(text);

    return (
        <div>
            <pre>{text}</pre>
            <div>{result}</div>
        </div>
    );
}