import type { Nullable } from '@/Types/Utilities';

import type { Backend } from './Backend';

export class EmptyBackend implements Backend {
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
        this.internalInitialized = true;

        return true;
    }

    public get objectClassName(): string {
        return 'EmptyBackend';
    }

    public label: string = '';
}
