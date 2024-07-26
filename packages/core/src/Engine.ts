import type { Type } from '@/Types/Type';
import { packageName, packageVersion } from '@/Package';
import { logger } from '@/Logger';
import type { Node } from '@/Node';
import type { Backend } from '@/Backends/Backend';
import { EmptyBackend } from '@/Backends/EmptyBackend';
import { backendFallback } from '@/Backends/Fallback';

export interface EngineProperties {
    readonly backend: Backend;

    readonly domElement: HTMLCanvasElement;
}

export class Engine implements EngineProperties, Type {
    public readonly backend: Backend;

    public readonly domElement: HTMLCanvasElement;

    public constructor(properties: Partial<EngineProperties> = {}) {
        this.domElement = properties.domElement ?? document.createElement('canvas');

        const backend = properties.backend;

        if (backend && backend.initialize(this.domElement)) {
            this.backend = properties.backend;
        } else {
            this.backend = backendFallback(this.domElement);

            if (backend) {
                logger.warn({
                    label: this.label,
                    scope: 'Engine',
                    message: `Failed to initialize ${backend.objectClassName}. Using a fallback backend`,
                });
            }

            if (this.backend instanceof EmptyBackend) {
                logger.warn({
                    label: this.label,
                    scope: 'Engine',
                    message: 'No backends supported. Using an empty backend',
                });
            }
        }

        logger.special({
            label: `${packageName} v${packageVersion}`,
            scope: 'Engine',
            message: `Using ${this.backend.objectClassName}`,
        });
    }

    public render<T extends Node>(node: T): this {
        return this;
    }

    public get objectClassName(): string {
        return 'Engine';
    }

    public label: string = '';
}
