import type { Type } from '@/Types/Type';
import type { FloatArray } from '@/Types/Array';
import { Observable, type Observer, makeProxyObserver } from '@/Observer';
import type { Vector3Array } from '@/Maths/Vector3';

import type { OnBufferUpdate } from './Buffer';

export class Float3Buffer implements Type, Iterable<Vector3Array> {
    public readonly source: FloatArray;

    public onUpdateObservable = new Observable<OnBufferUpdate<Float3Buffer>>();

    public onUpdate(
        callback: OnBufferUpdate<Float3Buffer>,
    ): Observer<OnBufferUpdate<Float3Buffer>> {
        return this.onUpdateObservable.add(callback);
    }

    public constructor(source: number[] | FloatArray) {
        const proxyTarget = Array.isArray(source) ? new Float32Array(source) : source;

        this.source = makeProxyObserver(proxyTarget, ({ previous }) => {
            this.onUpdateObservable.dispatch({
                dispatcher: this,
                previous: new Float3Buffer(previous),
            });
        });
    }

    public clone(): Float3Buffer {
        return new Float3Buffer(this.source.map(value => value));
    }

    public get length(): number {
        return this.source.length / 3;
    }

    public get(index: number): Vector3Array {
        return [this.source[index], this.source[index + 1], this.source[index + 2]];
    }

    public set(index: number, x: number, y: number, z: number): this {
        const previous = this.clone();

        this.source[index + 0] = x;
        this.source[index + 1] = y;
        this.source[index + 2] = z;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });

        return this;
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<Vector3Array> {
        for (let i = 0; i < this.source.length; i += 3) {
            yield this.get(i);
        }
    }
}
