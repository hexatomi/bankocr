type RawTextValue = {
    text: string;
    result: string;
    checksum: number;
    state: 'OK' | 'ERR' | 'ILL' | '';
}

type Action = {
    type: 'setRawTexts';
    payload: RawTexts
}

type RawTexts = Record<string, RawTextValue>

export type AppState = {
    rawTexts: RawTexts
}

export const appReducer = (state: AppState, action: Action) => {
    switch (action.type) {
        case 'setRawTexts': {
            const a = {
                ...state,
                rawTexts: action.payload
            };
            console.log(222, a)
            return {
                ...state,
                rawTexts: action.payload
            };
        }

        default: {
            return state;
        }
    }
};

export const initialState: AppState = {
    rawTexts : {}
};