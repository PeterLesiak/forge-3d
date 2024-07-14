import type { IntegerArray } from '@/Types/Array';
import type { Vector2Array } from '@/Maths/Vector2';

import type { Buffer } from './Buffer';

export class Integer2Buffer implements Buffer<Vector2Array> {
    public readonly components = 2;

    private readonly _source: IntegerArray;

    public constructor(source: number[] | IntegerArray) {
        if (Array.isArray(source)) {
            this._source = new Int32Array(source);
            return;
        }

        this._source = source.map(value => value);
    }

    public clone(): Integer2Buffer {
        return new Integer2Buffer(this._source);
    }

    public get size(): number {
        return this._source.length / this.components;
    }

    public get(index: number): Vector2Array {
        return [this._source[index], this._source[index + 1]];
    }

    public set(index: number, x: number, y: number): this {
        this._source[index + 0] = x;
        this._source[index + 1] = y;

        return this;
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<Vector2Array, void> {
        for (let i = 0; i < this._source.length; i += this.components) {
            yield this.get(i);
        }
    }
}
