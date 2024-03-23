type RawTextValue = {
    text: string;
    result: string;
    checksum: number;
    state: 'OK' | 'ERR' | 'ILL' | '';
}

export type RawTexts = Record<string, RawTextValue>

export type AppState = {
    rawTexts: RawTexts
}

type Action = {
    type: 'setRawTexts';
    payload: RawTexts
}

export const appReducer = (state: AppState, action: Action) => {
    switch (action.type) {

        case 'setRawTexts': {
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
    rawTexts: {}
};