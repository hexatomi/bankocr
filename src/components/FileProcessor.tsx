import { useEffect, useState } from 'react';
import { getFileContent } from '../store/raw-data';
import { createId } from '../utils/utils';
import RawText from './RawText';

export default function FileProcessor() {
    const [rawTexts, setRawTexts] = useState<Record<string, string>>({});

    useEffect(() => {
        getFileContent().then((content) => {
            const tempObj: Record<string, string> = {};
            let tempArr: string[] = [];
            let tempIndex = 1;

            const contentArr = content.split('\n');

            for (const row of contentArr) {
                if (row) {
                    if (tempIndex === 5) {
                        let s = '';
                        for(const item of tempArr) {
                            s += item;
                            s += '\n'
                        }
                        tempObj[createId()] = s;
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
        <div>file processor
            {Object.entries(rawTexts!).map(([key, value]) => {
            return (
                <RawText text={value} key={key}/>
            );
        })}
        </div>
        
    );
}