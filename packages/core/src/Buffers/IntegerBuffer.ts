import type { Type } from '@/Types/Type';
import type { IntegerArray } from '@/Types/Array';
import { Observable, type Observer, makeProxyObserver } from '@/Observer';

import type { OnBufferUpdate } from './Buffer';

export class IntegerBuffer implements Type, Iterable<number> {
    public readonly source: IntegerArray;

    public onUpdateObservable = new Observable<OnBufferUpdate<IntegerBuffer>>();

    public onUpdate(
        callback: OnBufferUpdate<IntegerBuffer>,
    ): Observer<OnBufferUpdate<IntegerBuffer>> {
        return this.onUpdateObservable.add(callback);
    }

    public constructor(source: number[] | IntegerArray) {
        const proxyTarget = Array.isArray(source) ? new Int32Array(source) : source;

        this.source = makeProxyObserver(proxyTarget, ({ previous }) => {
            this.onUpdateObservable.dispatch({
                dispatcher: this,
                previous: new IntegerBuffer(previous),
            });
        });
    }

    public clone(): IntegerBuffer {
        return new IntegerBuffer(this.source.map(value => value));
    }

    public get length(): number {
        return this.source.length;
    }

    public get(index: number): number {
        return this.source[index];
    }

    public set(index: number, value: number): this {
        const previous = this.clone();

        this.source[index] = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });

        return this;
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<number> {
        for (let i = 0; i < this.source.length; ++i) {
            yield this.source[i];
        }
    }
}
