import type { Degrees } from '@/Types/Scalar';
import type { CoordinateSystem } from '@/Maths/CoordinateSystem';
import type { Viewport } from '@/Maths/Viewport';
import { Matrix } from '@/Maths/Matrix';
import { Node } from '@/Node';

export class Camera extends Node {
    public fov: Degrees = 60;

    public near: number = 0.1;

    public far: number = 2000;

    public readonly projectionMatrix: Matrix = Matrix.Identity();

    public computeProjectionMatrix(
        viewport: Viewport,
        coordinateSystem: CoordinateSystem,
    ): Matrix {
        const aspect = viewport.aspect;

        this.projectionMatrix.perspective(
            this.fov,
            aspect,
            this.near,
            this.far,
            coordinateSystem,
        );

        return this.projectionMatrix;
    }

    public readonly viewMatrix: Matrix = Matrix.Identity();

    public computeViewMatrix(computeWorldMatrix: boolean = true): Matrix {
        if (computeWorldMatrix) {
            this.computeWorldMatrix();
        }

        this.viewMatrix.copy(this.worldMatrix).invert();

        return this.viewMatrix;
    }

    public override copy(other: Camera): this {
        super.copy(other);

        this.fov = other.fov;
        this.near = other.near;
        this.far = other.far;

        return this;
    }

    public override clone(): Camera {
        const camera = new Camera();

        camera.copy(this);

        return camera;
    }
}
