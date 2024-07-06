import type { IntegerArray } from '@/Types/Array';
import type { Vector2Array } from '@/Maths/Vector2';

import { Buffer } from './Buffer';

export class Integer2Buffer extends Buffer<Vector2Array> {
    public readonly components = 2;

    protected _source: IntegerArray;

    public constructor(source: number[] | IntegerArray) {
        super();

        if (Array.isArray(source)) {
            this._source = new Int32Array(source);

            return;
        }

        this._source = source.map(value => value);
    }

    public set(index: number, x: number, y: number): this {
        this._source[index + 0] = x;
        this._source[index + 1] = y;

        return this;
    }

    public get(index: number): Vector2Array {
        return [this._source[index], this._source[index + 1]];
    }
}
