import type { Type } from '@/Types/Type';
import type { Node } from '@/Node';
import type { Backend } from '@/Backends/Backend';
import { backendFallback } from '@/Backends/Fallback';

export interface EngineProperties {
    readonly domElement: HTMLCanvasElement;

    readonly backend: Backend;
}

export class Engine implements EngineProperties, Type {
    public readonly domElement: HTMLCanvasElement;

    public readonly backend: Backend;

    public constructor(properties: Partial<EngineProperties> = {}) {
        this.domElement = properties.domElement ?? document.createElement('canvas');

        const backend = properties.backend;

        if (backend && backend.initialize(this.domElement)) {
            this.backend = backend;
        } else {
            this.backend = backendFallback(this.domElement);
        }
    }

    public render(node: Node): this {
        return this;
    }

    public get objectClassName(): string {
        return 'Engine';
    }

    public label: string = '';
}
