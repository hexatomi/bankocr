import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

console.clear();

const case1 = `
    _  _     _  _  _  _  _ 
  | _| _||_||_ |_   ||_||_|
  ||_  _|  | _||_|  ||_| _|
  
`;

const case2 = `
    _  _     _  _  _  _  _ 
  | _| _||_||_ |_   ||_|| |
  ||_  _|  | _||_|  ||_||_|
  
`;

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


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
