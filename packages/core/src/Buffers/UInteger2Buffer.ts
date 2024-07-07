import type { Type } from '@/Types/Type';
import type { UIntegerArray } from '@/Types/Array';
import { Observable, type Observer, makeProxyObserver } from '@/Observer';
import type { Vector2Array } from '@/Maths/Vector2';

import type { OnBufferUpdate } from './Buffer';

export class UInteger2Buffer implements Type, Iterable<Vector2Array> {
    public readonly source: UIntegerArray;

    public onUpdateObservable = new Observable<OnBufferUpdate<UInteger2Buffer>>();

    public onUpdate(
        callback: OnBufferUpdate<UInteger2Buffer>,
    ): Observer<OnBufferUpdate<UInteger2Buffer>> {
        return this.onUpdateObservable.add(callback);
    }

    public constructor(source: number[] | UIntegerArray) {
        const proxyTarget = Array.isArray(source) ? new Uint32Array(source) : source;

        this.source = makeProxyObserver(proxyTarget, ({ previous }) => {
            this.onUpdateObservable.dispatch({
                dispatcher: this,
                previous: new UInteger2Buffer(previous),
            });
        });
    }

    public clone(): UInteger2Buffer {
        return new UInteger2Buffer(this.source.map(value => value));
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
