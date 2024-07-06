import type { IntegerArray } from '@/Types/Array';

import { Buffer } from './Buffer';

export class IntegerBuffer extends Buffer<number> {
    public readonly components = 1;

    protected _source: IntegerArray;

    public constructor(source: number[] | Int8Array | Int16Array | Int32Array) {
        super();

        if (Array.isArray(source)) {
            this._source = new Int32Array(source);

            return;
        }

        this._source = source;
    }

    public set(index: number, value: number): this {
        this._source[index] = value;

        return this;
    }

    public get(index: number): number {
        return this._source[index];
    }
}
