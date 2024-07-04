import type { Degress } from '@/Types/Scalar';
import type { CoordinateSystem } from '@/Maths/CoordinateSystem';
import { Viewport } from '@/Maths/Viewport';
import { Matrix } from '@/Maths/Matrix';
import { Node } from '@/Node';

export class Camera extends Node {
    public fov: Degress = 60;

    public near: number = 0.1;

    public far: number = 2000;

    public readonly viewport: Viewport = new Viewport(1.0, 1.0);

    public readonly projectionMatrix: Matrix = Matrix.Identity();

    public computeProjectionMatrix(coordinateSystem: CoordinateSystem): Matrix {
        const aspect = this.viewport.aspect;

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

        this.viewMatrix.setFromInverse(this.worldMatrix);

        return this.viewMatrix;
    }
}
