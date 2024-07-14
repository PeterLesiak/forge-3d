import type { FloatArray } from '@/Types/Array';

import type { Buffer } from './Buffer';

export class FloatBuffer implements Buffer<number> {
    public readonly components = 1;

    private readonly _source: FloatArray;

    public constructor(source: number[] | FloatArray) {
        if (Array.isArray(source)) {
            this._source = new Float32Array(source);
            return;
        }

        this._source = source.map(value => value);
    }

    public clone(): FloatBuffer {
        return new FloatBuffer(this._source);
    }

    public get size(): number {
        return this._source.length / this.components;
    }

    public get(index: number): number {
        return this._source[index];
    }

    public set(index: number, value: number): this {
        this._source[index] = value;

        return this;
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<number, void> {
        for (let i = 0; i < this._source.length; i += this.components) {
            yield this._source[i];
        }
    }
}
