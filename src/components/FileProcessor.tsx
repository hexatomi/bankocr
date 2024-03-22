import { useEffect, useState } from 'react';
import { getFileContent } from '../store/raw-data';
import { createId } from '../utils/utils';
import RawText from './RawText';

export interface RawTextValue {
    text: string;
    checksum: number;
    state: 'OK' | 'ERR' | 'ILL';
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
                        tempObj[createId()] = { text: s, checksum: -1, state: 'OK' };
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
        <div>
            {Object.keys(rawTexts).map((key) => <RawText id={key} rawTexts={rawTexts} setRawTexts={setRawTexts} key={key} />)}
        </div>
    );
}