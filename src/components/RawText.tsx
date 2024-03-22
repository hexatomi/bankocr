import { useState } from 'react';
import { transformCodeToNumbers } from "../utils/utils";
import { RawTextValue } from './FileProcessor';

const styles = {
    container: {
        border: '1px solid red'
    },
    row: {
        border: '1px solid red',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    button: {
        margin: '0',
        padding: '0.5rem 1rem',
        border: '1px solid black',
        borderRadius: '0.25rem',
        outline: 'none',
        cursor: 'pointer',
        backgroundColor: 'transparent'
    }
};

interface RawTextProps {
    id: string;
    rawTexts: Record<string, RawTextValue>
    setRawTexts: Function;
}

export default function RawText({ id, rawTexts, setRawTexts }: RawTextProps) {
    const text = rawTexts[id].text;
    const [result, setResult] = useState('');

    const scan = () => {
        setResult(transformCodeToNumbers(text));
    };

    const generateChecksum = () => { 
        setRawTexts({
            ...rawTexts,
            [id]:{
                ...rawTexts[id],
                result: result,
                cheksum : 8,
                state : 'ERR'
            }
        });
    };

    return (
        <div style={styles.container}>
            <div style={styles.row}>
                <div>{id}</div>
                <pre>{text}</pre>
                <button style={styles.button} onClick={() => scan()}>scan</button>
                <div>{result}</div>
                {result && <button style={styles.button} onClick={() => generateChecksum()}>checksum</button>}
            </div>
        </div>
    );
}