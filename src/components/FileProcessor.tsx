import { useEffect, useState } from 'react';
import { getFileContent } from '../store/raw-data';
import { createId } from '../utils/utils';
import RawText from './RawText';
import Results from './Results';

const styles = {
    container: {
        border: '1px solid red',
        display: 'flex',
    },
    left: {
        border: '1px solid red',
        width: '70%'
    },
    right: {
        border: '1px solid red',
        width : '30%'
    }
};

export interface RawTextValue {
    text: string;
    result: string;
    checksum: number;
    state: 'OK' | 'ERR' | 'ILL' | '';
}

export default function FileProcessor() {
    const [rawTexts, setRawTexts] = useState<Record<string, RawTextValue>>({});

    useEffect(() => {
        getFileContent().then((content) => {
            const tempObj: Record<string, RawTextValue> = {};
            let tempArr: string[] = [];
            let tempIndex = 1;

            const contentArr = content.split('\n');

            for (const row of contentArr) {
                if (row) {
                    if (tempIndex === 5) {
                        let s = '';
                        for (const item of tempArr) {
                            s += item;
                            s += '\n'
                        }
                        tempObj[createId()] = { text: s, result: '', checksum: -1, state: '' };
                        tempIndex = 1;
                        tempArr = [];
                    }
                    tempArr = [...tempArr, row];
                    tempIndex++;
                }
            }
            setRawTexts(tempObj)
        }).catch(() => console.error('error'));
    }, []);
    return (
        <div style={styles.container}>
            <div style={styles.left}>
                {Object.keys(rawTexts).map((key) => <RawText id={key} rawTexts={rawTexts} setRawTexts={setRawTexts} key={key} />)}
            </div>
            <div style={styles.right}>
                <Results rawTexts={rawTexts} />
            </div>
        </div>
    );
}