import type { Type } from '@/Types/Type';

export class BackendNotSupportedError extends Error {
    public constructor(backendName: string) {
        super(`@forge-3d/core | ${backendName} is not supported`);
    }
}

export interface Backend extends Type {
    readonly contextProvider: HTMLCanvasElement;

    readonly renderingAPI: string;
}
