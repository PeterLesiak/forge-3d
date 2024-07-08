import type { Degrees } from '@/Types/Scalar';
import { Observable, type Observer, type ObserverFunction } from '@/Observer';
import type { CoordinateSystem } from '@/Maths/CoordinateSystem';
import type { Viewport } from '@/Maths/Viewport';
import { Matrix } from '@/Maths/Matrix';
import { Node } from '@/Node';

export type OnCameraUpdate = ObserverFunction<{ dispatcher: Camera; previous: Camera }>;

export class Camera extends Node {
    public readonly onCameraUpdateObservable = new Observable<OnCameraUpdate>();

    public onCameraUpdate(callback: OnCameraUpdate): Observer<OnCameraUpdate> {
        return this.onCameraUpdateObservable.add(callback);
    }

    private _fov: Degrees = 60;

    public get fov(): number {
        return this._fov;
    }

    public set fov(value: number) {
        const previous = this.clone();

        this._fov = value;

        this.onCameraUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _near: Degrees = 0.1;

    public get near(): number {
        return this._near;
    }

    public set near(value: number) {
        const previous = this.clone();

        this._near = value;

        this.onCameraUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _far: Degrees = 2000;

    public get far(): number {
        return this._far;
    }

    public set far(value: number) {
        const previous = this.clone();

        this._far = value;

        this.onCameraUpdateObservable.dispatch({ dispatcher: this, previous });
    }

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
