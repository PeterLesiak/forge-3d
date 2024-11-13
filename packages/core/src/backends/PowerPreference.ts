export const PowerPreference = {
    default: 'default',

    lowPower: 'lowPower',

    highPerformance: 'highPerformance',
} as const;

export type PowerPreference = keyof typeof PowerPreference;
