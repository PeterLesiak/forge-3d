import type { IntegerArray } from '@/Types/Array';
import type { Vector4Array } from '@/Maths/Vector4';

import { Buffer } from './Buffer';

export class Integer4Buffer extends Buffer<Vector4Array> {
    public readonly components = 4;

    protected _source: IntegerArray;

    public constructor(source: number[] | Int8Array | Int16Array | Int32Array) {
        super();

        if (Array.isArray(source)) {
            this._source = new Int32Array(source);

            return;
        }

        this._source = source;
    }

    public set(index: number, x: number, y: number, z: number, w: number): this {
        this._source[index + 0] = x;
        this._source[index + 1] = y;
        this._source[index + 2] = z;
        this._source[index + 3] = w;

        return this;
    }

    public get(index: number): Vector4Array {
        return [
            this._source[index + 0],
            this._source[index + 1],
            this._source[index + 2],
            this._source[index + 3],
        ];
    }
}
