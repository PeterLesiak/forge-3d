import type { FloatArray } from '@/Types/Array';

import type { Buffer } from './Buffer';

export class FloatBuffer implements Buffer<number> {
    public readonly source: FloatArray;

    public constructor(source: number[] | FloatArray) {
        if (Array.isArray(source)) {
            this.source = new Float32Array(source);
            return;
        }

        this.source = source.map(value => value);
    }

    public clone(): FloatBuffer {
        return new FloatBuffer(this.source);
    }

    public get size(): number {
        return this.source.length;
    }

    public get(index: number): number {
        return this.source[index];
    }

    public set(index: number, value: number): this {
        this.source[index] = value;

        return this;
    }

    public get objectClassName(): string {
        return 'FloatBuffer';
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<number, void> {
        for (let i = 0; i < this.source.length; ++i) {
            yield this.source[i];
        }
    }
}
