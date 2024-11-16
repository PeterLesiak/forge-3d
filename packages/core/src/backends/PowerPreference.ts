export const PowerPreference = {
    default: 'default',

    lowPower: 'low-power',

    highPerformance: 'high-performance',
} as const;

export type PowerPreference = keyof typeof PowerPreference;
