import type { Radians } from '@/Types/Scalar';
import type { Type } from '@/Types/Type';

import { Vector3 } from './Vector3';
import { Quaternion, type EulerOrder } from './Quaternion';
import { Matrix } from './Matrix';

const _quaternion = /* @__PURE__ */ Quaternion.identity();

export class Transform implements Type {
    public readonly position = Vector3.zero();

    public translate(x: number, y: number, z: number): this {
        this.position.translate(x, y, z);

        return this;
    }

    public readonly rotation = Quaternion.identity();

    public rotationOrder: EulerOrder = 'xyz';

    public rotate(
        x: Radians,
        y: Radians,
        z: Radians,
        order: EulerOrder = this.rotationOrder,
    ): this {
        _quaternion.fromEuler(x, y, z, order);

        this.rotation.multiply(_quaternion);

        return this;
    }

    public rotateX(angle: Radians, order?: EulerOrder): this {
        this.rotate(angle, 0.0, 0.0, order);

        return this;
    }

    public rotateY(angle: Radians, order?: EulerOrder): this {
        this.rotate(0.0, angle, 0.0, order);

        return this;
    }

    public rotateZ(angle: Radians, order?: EulerOrder): this {
        this.rotate(0.0, 0.0, angle, order);

        return this;
    }

    public readonly scale = Vector3.one();

    public setScale(width: number, height: number, depth: number): this;

    public setScale(scalar: number): this;

    public setScale(width: number, height?: number, depth?: number): this {
        if (!height) height = width;
        if (!depth) depth = width;

        this.scale.set(width, height, depth);

        return this;
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

    public readonly localMatrix = Matrix.identity();

    public computeLocalMatrix(): Matrix {
        this.localMatrix.compose(this.position, this.rotation, this.scale);

        return this.localMatrix;
    }

    public label: string = '';
}
