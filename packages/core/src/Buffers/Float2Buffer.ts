import type { Type } from '@/Types/Type';
import type { FloatArray } from '@/Types/Array';
import { Observable, type Observer, makeProxyObserver } from '@/Observer';
import type { Vector2Array } from '@/Maths/Vector2';

import type { OnBufferUpdate } from './Buffer';

export class Float2Buffer implements Type, Iterable<Vector2Array> {
    public readonly source: FloatArray;

    public onUpdateObservable = new Observable<OnBufferUpdate<Float2Buffer>>();

    public onUpdate(
        callback: OnBufferUpdate<Float2Buffer>,
    ): Observer<OnBufferUpdate<Float2Buffer>> {
        return this.onUpdateObservable.add(callback);
    }

    public constructor(source: number[] | FloatArray) {
        const proxyTarget = Array.isArray(source) ? new Float32Array(source) : source;

        this.source = makeProxyObserver(proxyTarget, ({ previous }) => {
            this.onUpdateObservable.dispatch({
                dispatcher: this,
                previous: new Float2Buffer(previous),
            });
        });
    }

    public clone(): Float2Buffer {
        return new Float2Buffer(this.source.map(value => value));
    }

    public get length(): number {
        return this.source.length / 2;
    }

    public get(index: number): Vector2Array {
        return [this.source[index], this.source[index + 1]];
    }

    public set(index: number, x: number, y: number): this {
        const previous = this.clone();

        this.source[index + 0] = x;
        this.source[index + 1] = y;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });

        return this;
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<Vector2Array> {
        for (let i = 0; i < this.source.length; i += 2) {
            yield this.get(i);
        }
    }
}
