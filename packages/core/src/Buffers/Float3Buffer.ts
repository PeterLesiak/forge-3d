import type { FloatArray } from '@/Types/Array';
import type { Vector3Array } from '@/Maths/Vector3';

import type { Buffer } from './Buffer';

export class Float3Buffer implements Buffer<Vector3Array> {
    public readonly components = 3;

    private readonly _source: FloatArray;

    public constructor(source: number[] | FloatArray) {
        if (Array.isArray(source)) {
            this._source = new Float32Array(source);
            return;
        }

        this._source = source.map(value => value);
    }

    public clone(): Float3Buffer {
        return new Float3Buffer(this._source);
    }

    public get size(): number {
        return this._source.length / this.components;
    }

    public get(index: number): Vector3Array {
        return [this._source[index], this._source[index + 1], this._source[index + 2]];
    }

    public set(index: number, x: number, y: number, z: number): this {
        this._source[index + 0] = x;
        this._source[index + 1] = y;
        this._source[index + 2] = z;

        return this;
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<Vector3Array, void> {
        for (let i = 0; i < this._source.length; i += this.components) {
            yield this.get(i);
        }
    }
}
