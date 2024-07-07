import type { Type } from '@/Types/Type';
import type { IntegerArray } from '@/Types/Array';
import { Observable, type Observer, makeProxyObserver } from '@/Observer';
import type { Vector4Array } from '@/Maths/Vector4';

import type { OnBufferUpdate } from './Buffer';

export class Integer4Buffer implements Type, Iterable<Vector4Array> {
    public readonly source: IntegerArray;

    public onUpdateObservable = new Observable<OnBufferUpdate<Integer4Buffer>>();

    public onUpdate(
        callback: OnBufferUpdate<Integer4Buffer>,
    ): Observer<OnBufferUpdate<Integer4Buffer>> {
        return this.onUpdateObservable.add(callback);
    }

    public constructor(source: number[] | IntegerArray) {
        const proxyTarget = Array.isArray(source) ? new Int32Array(source) : source;

        this.source = makeProxyObserver(proxyTarget, ({ previous }) => {
            this.onUpdateObservable.dispatch({
                dispatcher: this,
                previous: new Integer4Buffer(previous),
            });
        });
    }

    public clone(): Integer4Buffer {
        return new Integer4Buffer(this.source.map(value => value));
    }

    public get length(): number {
        return this.source.length / 4;
    }

    public get(index: number): Vector4Array {
        return [
            this.source[index + 0],
            this.source[index + 1],
            this.source[index + 2],
            this.source[index + 3],
        ];
    }

    public set(index: number, x: number, y: number, z: number, w: number): this {
        const previous = this.clone();

        this.source[index + 0] = x;
        this.source[index + 1] = y;
        this.source[index + 2] = z;
        this.source[index + 3] = w;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });

        return this;
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<Vector4Array> {
        for (let i = 0; i < this.source.length; i += 4) {
            yield this.get(i);
        }
    }
}
