import type { FloatArray } from '@/Types/Array';
import type { Vector3Array } from '@/Maths/Vector3';

import { Buffer } from './Buffer';

export class Float3Buffer extends Buffer<Vector3Array> {
    public readonly components = 3;

    protected _source: FloatArray;

    public constructor(source: number[] | FloatArray) {
        super();

        if (Array.isArray(source)) {
            this._source = new Float32Array(source);

            return;
        }

        this._source = source.map(value => value);
    }

    public set(index: number, x: number, y: number, z: number): this {
        this._source[index + 0] = x;
        this._source[index + 1] = y;
        this._source[index + 2] = z;

        return this;
    }

    public get(index: number): Vector3Array {
        return [this._source[index], this._source[index + 1], this._source[index + 2]];
    }
}
