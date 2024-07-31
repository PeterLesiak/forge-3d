import type { Keys } from '@/Types/Utilities';

export type CoordinateSystem = Keys<typeof CoordinateSystem>;

export const CoordinateSystem = {
    WEBGL: 'WEBGL',

    WEBGPU: 'WEBGPU',
} as const;
