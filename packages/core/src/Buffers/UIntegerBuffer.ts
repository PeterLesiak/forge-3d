import type { Type } from '@/Types/Type';
import type { UIntegerArray } from '@/Types/Array';
import { Observable, type Observer } from '@/Observer';

import type { OnBufferUpdate } from './Buffer';

export class UIntegerBuffer implements Type, Iterable<number> {
    private readonly _source: UIntegerArray;

    public constructor(source: number[] | UIntegerArray) {
        if (Array.isArray(source)) {
            this._source = new Uint32Array(source);
            return;
        }

        this._source = source.map(value => value);
    }

    public clone(): UIntegerBuffer {
        return new UIntegerBuffer(this._source.map(value => value));
    }

    public get length(): number {
        return this._source.length;
    }

    public get(index: number): number {
        return this._source[index];
    }

    public readonly onUpdateObservable = new Observable<OnBufferUpdate<UIntegerBuffer>>();

    public onUpdate(
        callback: OnBufferUpdate<UIntegerBuffer>,
    ): Observer<OnBufferUpdate<UIntegerBuffer>> {
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
