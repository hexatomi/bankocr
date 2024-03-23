import { AppContext, Context } from '../store/context';
import { useState, useContext } from 'react';
import { AppState } from '../store/reducer';


const styles = {
    container : {
        padding: '2rem',
        display: 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        gap : '2rem'
    },
    row : {
        display : 'flex',
        gap : '1rem',
        padding: '0.25rem',
        letterSpacing : '0.125rem'
    },
};

export default function Results() {
    const [state, dispatch] = useContext<Context>(AppContext);
    const {rawTexts} = state as AppState
    return (
        <div style={styles.container}>
            <h2>RESULTS</h2>
            <ul>
                {Object.entries(rawTexts).map(([key, value]) => {
                    return (
                        <li key={key} style={styles.row}>
                            <span>{value.result}</span>
                            <span>{value.state}</span>
                        </li>
                    );
                })}
            </ul>

        </div>
    );
};