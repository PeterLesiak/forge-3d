import type { UIntegerArray } from '@/Types/Array';
import type { Vector4Array } from '@/Maths/Vector4';

import type { Buffer } from './Buffer';

export class UInteger4Buffer implements Buffer<Vector4Array> {
    public readonly components = 4;

    private readonly _source: UIntegerArray;

    public constructor(source: number[] | UIntegerArray) {
        if (Array.isArray(source)) {
            this._source = new Uint32Array(source);
            return;
        }

        this._source = source.map(value => value);
    }

    public clone(): UInteger4Buffer {
        return new UInteger4Buffer(this._source);
    }

    public get size(): number {
        return this._source.length / this.components;
    }

    public get(index: number): Vector4Array {
        return [
            this._source[index + 0],
            this._source[index + 1],
            this._source[index + 2],
            this._source[index + 3],
        ];
    }

    public set(index: number, x: number, y: number, z: number, w: number): this {
        this._source[index + 0] = x;
        this._source[index + 1] = y;
        this._source[index + 2] = z;
        this._source[index + 3] = w;

        return this;
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<Vector4Array, void> {
        for (let i = 0; i < this._source.length; i += this.components) {
            yield this.get(i);
        }
    }
}
