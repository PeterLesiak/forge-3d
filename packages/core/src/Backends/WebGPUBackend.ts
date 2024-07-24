import { BackendNotSupportedError, type Backend } from './Backend';

export class WebGPUBackendNotSupportedError extends BackendNotSupportedError {
    public constructor() {
        super('WebGPUBackend');
    }
}

export class WebGPUBackend implements Backend {
    public readonly contextProvider: HTMLCanvasElement;

    public readonly renderingAPI: 'WebGPU';

    /** @throws {WebGPUBackendNotSupportedError} */
    public constructor(contextProvider: HTMLCanvasElement) {
        this.contextProvider = contextProvider;

        this.renderingAPI = 'WebGPU';
    }

    public get objectClassName(): string {
        return 'WebGPUBackend';
    }

    public label: string = '';
}
