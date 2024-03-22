import RawText from "./components/RawText";
import FileProcessor from "./components/FileProcessor.tsx";

import {case1, case2, case3, case4, case5} from './store/raw-data.ts';

console.clear();

const codedNumbers = [
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

const transformCodeToNumbers = (codedNumber) => {
  const caseByRows = codedNumber.split('\n');

  const row1 = caseByRows[1].split('');
  const row2 = caseByRows[2].split('');
  const row3 = caseByRows[3].split('');

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
    codedNumbers.forEach((cn, cni) => {
      if (value.raw === cn) {
        value.real = `${cni}`;
        result += value.real;
      }
    });
  });

  // console.log(positions);

  return result;
};

const result1 = transformCodeToNumbers(case1);

const tester = (a, b) => {
  console.log(a, b, a === b);
};

tester(transformCodeToNumbers(case1), '123456789');


export default function App() {

  return (
    <div>sanyi
      <FileProcessor />
    </div>
  )
}