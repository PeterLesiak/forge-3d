import type { Type } from '@/Types/Type';
import type { FloatArray } from '@/Types/Array';
import { Observable, type Observer, makeProxyObserver } from '@/Observer';

import type { OnBufferUpdate } from './Buffer';

export class FloatBuffer implements Type, Iterable<number> {
    public readonly source: FloatArray;

    public onUpdateObservable = new Observable<OnBufferUpdate<FloatBuffer>>();

    public onUpdate(
        callback: OnBufferUpdate<FloatBuffer>,
    ): Observer<OnBufferUpdate<FloatBuffer>> {
        return this.onUpdateObservable.add(callback);
    }

    public constructor(source: number[] | FloatArray) {
        const proxyTarget = Array.isArray(source) ? new Float32Array(source) : source;

        this.source = makeProxyObserver(proxyTarget, ({ previous }) => {
            this.onUpdateObservable.dispatch({
                dispatcher: this,
                previous: new FloatBuffer(previous),
            });
        });
    }

    public clone(): FloatBuffer {
        return new FloatBuffer(this.source.map(value => value));
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
