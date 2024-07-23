import type { Type } from '@/Types/Type';
import type { Node } from '@/Node';

export interface EngineProperties {
    readonly domElement?: HTMLCanvasElement;
}

export class Engine implements EngineProperties, Type {
    public readonly domElement: HTMLCanvasElement = document.createElement('canvas');

    public constructor(properties: EngineProperties = {}) {
        if (properties.domElement) {
            this.domElement = properties.domElement;
        }
    }

    public render(node: Node): this {
        return this;
    }

    public label: string = '';
}
