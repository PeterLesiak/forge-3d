import type { Backend } from './Backend';

export class WebGLBackend implements Backend {
    public initialize(contextProvider: HTMLCanvasElement): boolean {
        return true;
    }

    public get objectClassName(): string {
        return 'WebGLBackend';
    }

    public label: string = '';
}
