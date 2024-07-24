import type { Backend } from './Backend';
import { EmptyBackend } from './EmptyBackend';
import { WebGLBackend, WebGLBackendNotSupportedError } from './WebGLBackend';
import { WebGPUBackend, WebGPUBackendNotSupportedError } from './WebGPUBackend';

export const backendFallback = (contextProvider: HTMLCanvasElement): Backend => {
    try {
        return new WebGPUBackend(contextProvider);
    } catch (error) {
        if (!(error instanceof WebGPUBackendNotSupportedError)) {
            throw error;
        }
    }

    try {
        return new WebGLBackend(contextProvider);
    } catch (error) {
        if (!(error instanceof WebGLBackendNotSupportedError)) {
            throw error;
        }
    }

    return new EmptyBackend(contextProvider);
};
