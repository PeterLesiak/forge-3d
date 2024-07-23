import type { Type } from '@/Types/Type';

import { Vector3 } from './Vector3';
import { Quaternion } from './Quaternion';
import { Matrix } from './Matrix';

export class Transform implements Type {
    public readonly position = Vector3.zero();

    public readonly rotation = Quaternion.identity();

    public readonly scale = Vector3.one();

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

    public readonly localMatrix = Matrix.identity();

    public computeLocalMatrix(): Matrix {
        this.localMatrix.compose(this.position, this.rotation, this.scale);

        return this.localMatrix;
    }

    public label: string = '';
}
