import type { Type } from '@/Types/Type';
import type { IntegerArray } from '@/Types/Array';
import { Observable, type Observer } from '@/Observer';
import type { Vector4Array } from '@/Maths/Vector4';

import type { OnBufferUpdate } from './Buffer';

export class Integer4Buffer implements Type, Iterable<Vector4Array> {
    private readonly _source: IntegerArray;

    public constructor(source: number[] | IntegerArray) {
        if (Array.isArray(source)) {
            this._source = new Int32Array(source);
            return;
        }

        this._source = source.map(value => value);
    }

    public clone(): Integer4Buffer {
        return new Integer4Buffer(this._source.map(value => value));
    }

    public get length(): number {
        return this._source.length / 4;
    }

    public get(index: number): Vector4Array {
        return [
            this._source[index + 0],
            this._source[index + 1],
            this._source[index + 2],
            this._source[index + 3],
        ];
    }

    public readonly onUpdateObservable = new Observable<OnBufferUpdate<Integer4Buffer>>();

    public onUpdate(
        callback: OnBufferUpdate<Integer4Buffer>,
    ): Observer<OnBufferUpdate<Integer4Buffer>> {
        return this.onUpdateObservable.add(callback);
    }

    public set(index: number, x: number, y: number, z: number, w: number): this {
        const previous = this.clone();

        this._source[index + 0] = x;
        this._source[index + 1] = y;
        this._source[index + 2] = z;
        this._source[index + 3] = w;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });

        return this;
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<Vector4Array> {
        for (let i = 0; i < this._source.length; i += 4) {
            yield this.get(i);
        }
    }
}
