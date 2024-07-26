import type { Nullable } from '@/Types/Utilities';

import type { Backend } from './Backend';

export class WebGPUBackend implements Backend {
    private internalContextProvider: Nullable<HTMLCanvasElement> = null;

    public get contextProvider(): Nullable<HTMLCanvasElement> {
        return this.internalContextProvider;
    }

    private internalInitialized: boolean = false;

    public get initialized(): boolean {
        return this.internalInitialized;
    }

    public initialize(contextProvider: HTMLCanvasElement): boolean {
        this.internalContextProvider = contextProvider;
        this.internalInitialized = false;

        return false;
    }

    public get objectClassName(): string {
        return 'WebGPUBackend';
    }

    public label: string = '';
}
