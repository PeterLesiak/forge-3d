import type { Backend } from './Backend';

export class EmptyBackend implements Backend {
    public readonly contextProvider: HTMLCanvasElement;

    public constructor(contextProvider: HTMLCanvasElement) {
        this.contextProvider = contextProvider;
    }

    public readonly renderingAPI: string = '<empty>';

    public get objectClassName(): string {
        return 'EmptyBackend';
    }

    public label: string = '';
}
