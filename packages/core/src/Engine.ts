import { name, version } from '@/Package';
import type { Type } from '@/Types/Type';
import { logger } from '@/Logger';
import type { Node } from '@/Node';
import type { Backend } from '@/Backends/Backend';
import { backendFallback } from '@/Backends/Fallback';

export interface EngineProperties {
    readonly backend: Backend;

    readonly domElement: HTMLCanvasElement;
}

export class Engine implements EngineProperties, Type {
    public readonly backend: Backend;

    public readonly domElement: HTMLCanvasElement;

    public constructor(properties: Partial<EngineProperties> = {}) {
        const contextProvider = properties.domElement ?? document.createElement('canvas');

        this.backend = properties.backend ?? backendFallback(contextProvider);

        this.domElement = this.backend.contextProvider;

        logger.special(`Using ${name} v${version} with ${this.backend.renderingAPI}`);
    }

    public render(node: Node): this {
        return this;
    }

    public get objectClassName(): string {
        return 'Engine';
    }

    public label: string = '';
}
