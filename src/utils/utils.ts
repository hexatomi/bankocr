let id = 0;

export const createId = (): string => {
    id++;
    return `${id}`;
};