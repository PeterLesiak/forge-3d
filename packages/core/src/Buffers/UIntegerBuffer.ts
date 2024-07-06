import type { UIntegerArray } from '@/Types/Array';

import { Buffer } from './Buffer';

export class UIntegerBuffer extends Buffer<number> {
    public readonly components = 1;

    protected _source: UIntegerArray;

    public constructor(source: number[] | UIntegerArray) {
        super();

        if (Array.isArray(source)) {
            this._source = new Uint32Array(source);

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
