import { useState, useContext } from 'react';
import { transformCodeToNumbers } from "../utils/utils";
import { RawTextValue } from './FileProcessor';
import { AppContext, Context } from '../store/context';


const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.5rem'
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
}

export default function RawText({ id }: RawTextProps) {
    const [state, dispatch] = useContext<Context>(AppContext);
    const {rawTexts} = state

    const text = rawTexts[id].text;
    const [result, setResult] = useState('');

    const scan = () => {
        setResult(transformCodeToNumbers(text));
        let utterance = new SpeechSynthesisUtterance("Scanning");
        utterance.pitch = 0;
        utterance.lang = 'en';
        speechSynthesis.speak(utterance);
    };

    const checkNumber = () => {
        const reversedResult = result.split('').reverse();
        let checksum = '';
        let state = '';

        if (result.indexOf('?') !== -1) {
            checksum = 'none';
            state = 'ILL';

        } else {
            checksum = reversedResult.reduce((sum, item, index) => {
                return `${+sum + +item * (index + 1)}`;
            });
            state = +checksum % 11 === 0 ? 'OK' : 'ERR';
        }

        dispatch({type : 'setRawTexts', payload: {
            ...rawTexts,
            [id]: {
                ...rawTexts[id],
                result,
                checksum,
                state
            }
        }});
    };

    return (
        <div style={styles.container}>
            <div>{id}</div>
            <pre>{text}</pre>
            <button style={styles.button} onClick={() => scan()}>scan</button>
            <div>{result}</div>
            {result && <button style={styles.button} onClick={() => checkNumber()}>checksum</button>}
        </div>
    );
}