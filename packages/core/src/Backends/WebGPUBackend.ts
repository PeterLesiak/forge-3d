import type { Backend } from './Backend';

export class WebGPUBackend implements Backend {
    public initialize(contextProvider: HTMLCanvasElement): boolean {
        return true;
    }

    public get objectClassName(): string {
        return 'WebGPUBackend';
    }

    public label: string = '';
}
