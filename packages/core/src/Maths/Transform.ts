import type { Type } from '@/Types/Type';

import { Vector3 } from './Vector3';
import { Quaternion } from './Quaternion';
import { Matrix } from './Matrix';

export class Transform implements Type {
    public readonly position: Vector3 = Vector3.Zero();

    public readonly rotation: Quaternion = Quaternion.Identity();

    public readonly scale: Vector3 = Vector3.One();

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
