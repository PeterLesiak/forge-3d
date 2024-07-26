import type { Backend } from './Backend';
import { EmptyBackend } from './EmptyBackend';
import { WebGLBackend } from './WebGLBackend';
import { WebGPUBackend } from './WebGPUBackend';

export const backendFallback = (contextProvider: HTMLCanvasElement): Backend => {
    let backend: Backend;

    backend = new WebGPUBackend();
    if (backend.initialize(contextProvider)) {
        return backend;
    }

    backend = new WebGLBackend();
    if (backend.initialize(contextProvider)) {
        return backend;
    }

    backend = new EmptyBackend();
    backend.initialize(contextProvider);
    return backend;
};
