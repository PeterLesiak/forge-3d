export const EPSILON = 0.000001;

export const equals = (a: number, b: number, threshold: number = EPSILON): boolean => {
    return Math.abs(a - b) <= threshold + Number.EPSILON;
};
