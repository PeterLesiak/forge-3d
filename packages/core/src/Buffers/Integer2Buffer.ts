import type { Type } from '@/Types/Type';
import type { IntegerArray } from '@/Types/Array';
import { Observable, type Observer } from '@/Observer';
import type { Vector2Array } from '@/Maths/Vector2';

import type { OnBufferUpdate } from './Buffer';

export class Integer2Buffer implements Type, Iterable<Vector2Array> {
    private readonly _source: IntegerArray;

    public constructor(source: number[] | IntegerArray) {
        if (Array.isArray(source)) {
            this._source = new Int32Array(source);
            return;
        }

        this._source = source.map(value => value);
    }

    public clone(): Integer2Buffer {
        return new Integer2Buffer(this._source.map(value => value));
    }

    public get length(): number {
        return this._source.length / 2;
    }

    public get(index: number): Vector2Array {
        return [this._source[index], this._source[index + 1]];
    }

    public readonly onUpdateObservable = new Observable<OnBufferUpdate<Integer2Buffer>>();

    public onUpdate(
        callback: OnBufferUpdate<Integer2Buffer>,
    ): Observer<OnBufferUpdate<Integer2Buffer>> {
        return this.onUpdateObservable.add(callback);
    }

    public set(index: number, x: number, y: number): this {
        const previous = this.clone();

        this._source[index + 0] = x;
        this._source[index + 1] = y;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });

        return this;
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<Vector2Array> {
        for (let i = 0; i < this._source.length; i += 2) {
            yield this.get(i);
        }
    }
}
