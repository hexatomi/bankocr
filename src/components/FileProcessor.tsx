import { useEffect, useContext } from 'react';
import { AppContext } from '../store/context';
import { RawTexts } from '../store/reducer';
import { getFileContent } from '../store/raw-data';
import { createId } from '../utils/utils';
import RawText from './RawText';
import Results from './Results';

const styles = {
    container: {
        display: 'flex',
        gap: '1rem',
        width: '100%'
    },
    left: {
        border: '1px solid rgba(0,0,0,0.5)',
        borderRadius: '1rem',
        width: '70%'
    },
    right: {
        border: '1px solid rgba(0,0,0,0.5)',
        borderRadius: '1rem',
        width: '30%'
    }
};

export default function FileProcessor() {
    const [state, dispatch] = useContext(AppContext);
    const { rawTexts } = state;

    useEffect(() => {
        getFileContent().then((content) => {
            const tempObj: RawTexts= {};
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

            dispatch({ type: 'setRawTexts', payload: tempObj });
            
        }).catch(() => console.error('error'));
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.left}>
                {Object.keys(rawTexts).map((key) => <RawText id={key} key={key} />)}
            </div>
            <div style={styles.right}>
                <Results />
            </div>
        </div>
    );
}