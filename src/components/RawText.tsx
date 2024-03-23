import { useState, useContext } from 'react';
import { AppContext } from '../store/context';
import { transformCodeToNumbers } from "../utils/utils";

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.5rem',
    },
    preContainer: {
        border: '1px solid rgba(0,0,0,0.5)',
        borderRadius: '0.25rem',
        position: 'relative',
        padding: '0 1rem'
    },
    bar: {
        position: 'absolute',
        width: '3px',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        left: '0',
        top: '0',
        transition: 'left 1000ms',
        borderRadius: '0.125rem',
    },
    result: {
        letterSpacing: '0.125rem'
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
} as any;

interface RawTextProps {
    id: string;
}

export default function RawText({ id }: RawTextProps) {
    const [state, dispatch] = useContext(AppContext);
    const { rawTexts } = state;
    const text = rawTexts[id].text;
    const [result, setResult] = useState('');
    const [scanned, setScanned] = useState(false);

    const scan = () => {
        setScanned(true);
        setTimeout(() => {
            setResult(transformCodeToNumbers(text));
        }, 1000);
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

        dispatch({
            type: 'setRawTexts',
            payload: {
                ...rawTexts,
                [id]: {
                    ...rawTexts[id],
                    result,
                    checksum,
                    state
                }
            }
        });
    };

    return (
        <div style={styles.container}>
            <div>{id}</div>

            <div style={styles.preContainer}>
                <pre>{text}</pre>
                <div style={{ ...styles.bar, left: scanned === false ? '0' : 'calc(100% - 3px)' }}></div>
            </div>

            <button style={styles.button} onClick={() => scan()}>scan</button>

            <div style={styles.result}>{result}</div>

            {result && <button style={styles.button} onClick={() => checkNumber()}>checksum</button>}
        </div>
    );
}