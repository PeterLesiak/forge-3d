import type { Type } from '@/Types/Type';
import type { FloatArray } from '@/Types/Array';
import { Observable, type Observer } from '@/Observer';

import type { OnBufferUpdate } from './Buffer';

export class FloatBuffer implements Type, Iterable<number> {
    private readonly _source: FloatArray;

    public constructor(source: number[] | FloatArray) {
        if (Array.isArray(source)) {
            this._source = new Float32Array(source);
            return;
        }

        this._source = source.map(value => value);
    }

    public clone(): FloatBuffer {
        return new FloatBuffer(this._source.map(value => value));
    }

    public get length(): number {
        return this._source.length;
    }

    public get(index: number): number {
        return this._source[index];
    }

    public readonly onUpdateObservable = new Observable<OnBufferUpdate<FloatBuffer>>();

    public onUpdate(
        callback: OnBufferUpdate<FloatBuffer>,
    ): Observer<OnBufferUpdate<FloatBuffer>> {
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
