import { BackendNotSupportedError, type Backend } from './Backend';

export class WebGLBackendNotSupportedError extends BackendNotSupportedError {
    public constructor() {
        super('WebGLBackend');
    }
}

export class WebGLBackend implements Backend {
    public readonly contextProvider: HTMLCanvasElement;

    public readonly renderingAPI: 'WebGL1' | 'WebGL2';

    /** @throws {WebGLBackendNotSupportedError} */
    public constructor(contextProvider: HTMLCanvasElement) {
        this.contextProvider = contextProvider;

        this.renderingAPI = 'WebGL2';
    }

    public get objectClassName(): string {
        return 'WebGLBackend';
    }

    public label: string = '';
}
