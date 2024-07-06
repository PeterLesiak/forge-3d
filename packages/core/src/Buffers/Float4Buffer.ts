import type { FloatArray } from '@/Types/Array';
import type { Vector4Array } from '@/Maths/Vector4';

import { Buffer } from './Buffer';

export class Float4Buffer extends Buffer<Vector4Array> {
    public readonly components = 4;

    protected _source: FloatArray;

    public constructor(source: number[] | FloatArray) {
        super();

        if (Array.isArray(source)) {
            this._source = new Float32Array(source);

            return;
        }

        this._source = source.map(value => value);
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
