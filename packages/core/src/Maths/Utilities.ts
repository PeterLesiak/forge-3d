export const EPSILON = 0.000001;

export const last = <T>(array: T[]): T => array[array.length - 1];

export const equals = (a: number, b: number, threshold: number = EPSILON): boolean => {
    return Math.abs(a - b) <= threshold + Number.EPSILON;
};
