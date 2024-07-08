import type { Type } from '@/Types/Type';
import type { IntegerArray } from '@/Types/Array';
import { Observable, type Observer } from '@/Observer';

import type { OnBufferUpdate } from './Buffer';

export class IntegerBuffer implements Type, Iterable<number> {
    private readonly _source: IntegerArray;

    public constructor(source: number[] | IntegerArray) {
        if (Array.isArray(source)) {
            this._source = new Int32Array(source);
            return;
        }

        this._source = source.map(value => value);
    }

    public clone(): IntegerBuffer {
        return new IntegerBuffer(this._source.map(value => value));
    }

    public get length(): number {
        return this._source.length;
    }

    public get(index: number): number {
        return this._source[index];
    }

    public readonly onUpdateObservable = new Observable<OnBufferUpdate<IntegerBuffer>>();

    public onUpdate(
        callback: OnBufferUpdate<IntegerBuffer>,
    ): Observer<OnBufferUpdate<IntegerBuffer>> {
        return this.onUpdateObservable.add(callback);
    }

    public set(index: number, value: number): this {
        const previous = this.clone();

        this._source[index] = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });

        return this;
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<number> {
        for (let i = 0; i < this._source.length; ++i) {
            yield this._source[i];
        }
    }
}
