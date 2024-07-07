import type { Type } from '@/Types/Type';
import type { UIntegerArray } from '@/Types/Array';
import { Observable, type Observer, makeProxyObserver } from '@/Observer';

import type { OnBufferUpdate } from './Buffer';

export class UIntegerBuffer implements Type, Iterable<number> {
    public readonly source: UIntegerArray;

    public onUpdateObservable = new Observable<OnBufferUpdate<UIntegerBuffer>>();

    public onUpdate(
        callback: OnBufferUpdate<UIntegerBuffer>,
    ): Observer<OnBufferUpdate<UIntegerBuffer>> {
        return this.onUpdateObservable.add(callback);
    }

    public constructor(source: number[] | UIntegerArray) {
        const proxyTarget = Array.isArray(source) ? new Uint32Array(source) : source;

        this.source = makeProxyObserver(proxyTarget, ({ previous }) => {
            this.onUpdateObservable.dispatch({
                dispatcher: this,
                previous: new UIntegerBuffer(previous),
            });
        });
    }

    public clone(): UIntegerBuffer {
        return new UIntegerBuffer(this.source.map(value => value));
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
