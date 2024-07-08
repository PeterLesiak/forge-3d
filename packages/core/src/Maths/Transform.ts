import type { Type } from '@/Types/Type';
import { Observable, type Observer, type ObserverFunction } from '@/Observer';

import { Vector3 } from './Vector3';
import { Quaternion } from './Quaternion';
import { Matrix } from './Matrix';

export type OnTransformUpdate = ObserverFunction<{
    dispatcher: Transform;
    previous: Transform;
}>;

export class Transform implements Type {
    public readonly position: Vector3 = Vector3.Zero();

    public readonly rotation: Quaternion = Quaternion.Identity();

    public readonly scale: Vector3 = Vector3.One();

    public readonly onTransformUpdateObservable = new Observable<OnTransformUpdate>();

    public onTransformUpdate(callback: OnTransformUpdate): Observer<OnTransformUpdate> {
        return this.onTransformUpdateObservable.add(callback);
    }

    public constructor(positon?: Vector3, rotation?: Quaternion, scale?: Vector3) {
        if (positon) this.position.copy(positon);
        if (rotation) this.rotation.copy(rotation);
        if (scale) this.scale.copy(scale);

        this.position.onUpdate(({ previous: position }) => {
            const previous = new Transform(position, this.rotation, this.scale);

            this.onTransformUpdateObservable.dispatch({ dispatcher: this, previous });
        });

        this.rotation.onUpdate(({ previous: rotation }) => {
            const previous = new Transform(this.position, rotation, this.scale);

            this.onTransformUpdateObservable.dispatch({ dispatcher: this, previous });
        });

        this.scale.onUpdate(({ previous: scale }) => {
            const previous = new Transform(this.position, this.rotation, scale);

            this.onTransformUpdateObservable.dispatch({ dispatcher: this, previous });
        });
    }

    public readonly localMatrix: Matrix = Matrix.Identity();

    public computeLocalMatrix(): Matrix {
        this.localMatrix.compose(this.position, this.rotation, this.scale);

        return this.localMatrix;
    }

    public copy(other: Transform): this {
        this.position.copy(other.position);
        this.rotation.copy(other.rotation);
        this.scale.copy(other.scale);

        return this;
    }

    public clone(): Transform {
        const transform = new Transform();

        transform.copy(this);

        return transform;
    }

    public label: string = '';
}
