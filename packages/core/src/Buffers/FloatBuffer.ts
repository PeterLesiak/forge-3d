import type { FloatArray } from '@/Types/Array';

import { Buffer } from './Buffer';

export class FloatBuffer extends Buffer<number> {
    public readonly components = 1;

    protected _source: FloatArray;

    public constructor(source: number[] | FloatArray) {
        super();

        if (Array.isArray(source)) {
            this._source = new Float32Array(source);

            return;
        }

        this._source = source.map(value => value);
    }

    public set(index: number, value: number): this {
        this._source[index] = value;

        return this;
    }

    public get(index: number): number {
        return this._source[index];
    }
}
