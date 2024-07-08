import type { Radians } from '@/Types/Scalar';
import type { DataArray } from '@/Types/Array';
import type { Type } from '@/Types/Type';
import { Observable, type Observer, type ObserverFunction } from '@/Observer';

import { CoordinateSystem } from './CoordinateSystem';
import { equals } from './Utilities';
import type { Vector3 } from './Vector3';
import type { Quaternion } from './Quaternion';

// prettier-ignore
export type Matrix4x4Array = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
];

export type OnMatrixUpdate = ObserverFunction<{ dispatcher: Matrix; previous: Matrix }>;

export class Matrix implements Type, Iterable<number> {
    public readonly onUpdateObservable = new Observable<OnMatrixUpdate>();

    public onUpdate(callback: OnMatrixUpdate): Observer<OnMatrixUpdate> {
        return this.onUpdateObservable.add(callback);
    }

    private _n11: number;

    public get n11(): number {
        return this._n11;
    }

    public set n11(value: number) {
        const previous = this.clone();

        this._n11 = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _n12: number;

    public get n12(): number {
        return this._n12;
    }

    public set n12(value: number) {
        const previous = this.clone();

        this._n12 = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _n13: number;

    public get n13(): number {
        return this._n13;
    }

    public set n13(value: number) {
        const previous = this.clone();

        this._n13 = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _n14: number;

    public get n14(): number {
        return this._n14;
    }

    public set n14(value: number) {
        const previous = this.clone();

        this._n14 = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _n21: number;

    public get n21(): number {
        return this._n21;
    }

    public set n21(value: number) {
        const previous = this.clone();

        this._n21 = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _n22: number;

    public get n22(): number {
        return this._n22;
    }

    public set n22(value: number) {
        const previous = this.clone();

        this._n22 = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _n23: number;

    public get n23(): number {
        return this._n23;
    }

    public set n23(value: number) {
        const previous = this.clone();

        this._n23 = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _n24: number;

    public get n24(): number {
        return this._n24;
    }

    public set n24(value: number) {
        const previous = this.clone();

        this._n24 = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _n31: number;

    public get n31(): number {
        return this._n31;
    }

    public set n31(value: number) {
        const previous = this.clone();

        this._n31 = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _n32: number;

    public get n32(): number {
        return this._n32;
    }

    public set n32(value: number) {
        const previous = this.clone();

        this._n32 = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _n33: number;

    public get n33(): number {
        return this._n33;
    }

    public set n33(value: number) {
        const previous = this.clone();

        this._n33 = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _n34: number;

    public get n34(): number {
        return this._n34;
    }

    public set n34(value: number) {
        const previous = this.clone();

        this._n34 = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _n41: number;

    public get n41(): number {
        return this._n41;
    }

    public set n41(value: number) {
        const previous = this.clone();

        this._n41 = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _n42: number;

    public get n42(): number {
        return this._n42;
    }

    public set n42(value: number) {
        const previous = this.clone();

        this._n42 = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _n43: number;

    public get n43(): number {
        return this._n43;
    }

    public set n43(value: number) {
        const previous = this.clone();

        this._n43 = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _n44: number;

    public get n44(): number {
        return this._n44;
    }

    public set n44(value: number) {
        const previous = this.clone();

        this._n44 = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    // prettier-ignore
    public constructor(
        n11: number, n12: number, n13: number, n14: number,
        n21: number, n22: number, n23: number, n24: number,
        n31: number, n32: number, n33: number, n34: number,
        n41: number, n42: number, n43: number, n44: number,
    ) {
        this._n11 = n11; this._n12 = n12; this._n13 = n13; this._n14 = n14;
        this._n21 = n21; this._n22 = n22; this._n23 = n23; this._n24 = n24;
        this._n31 = n31; this._n32 = n32; this._n33 = n33; this._n34 = n34;
        this._n41 = n41; this._n42 = n42; this._n43 = n43; this._n44 = n44;
    }

    public copy(other: Matrix): this {
        // prettier-ignore
        this.set(
            other.n11, other.n12, other.n13, other.n14,
            other.n21, other.n22, other.n23, other.n24,
            other.n31, other.n32, other.n33, other.n34,
            other.n41, other.n42, other.n43, other.n44,
        )

        return this;
    }

    public clone(): Matrix {
        // prettier-ignore
        return new Matrix(
            this.n11, this.n12, this.n13, this.n14,
            this.n21, this.n22, this.n23, this.n24,
            this.n31, this.n32, this.n33, this.n34,
            this.n41, this.n42, this.n43, this.n44,
        );
    }

    // prettier-ignore
    public set(
        n11: number, n12: number, n13: number, n14: number,
        n21: number, n22: number, n23: number, n24: number,
        n31: number, n32: number, n33: number, n34: number,
        n41: number, n42: number, n43: number, n44: number,
    ) {
        const previous = this.clone();

        this._n11 = n11; this._n12 = n12; this._n13 = n13; this._n14 = n14;
        this._n21 = n21; this._n22 = n22; this._n23 = n23; this._n24 = n24;
        this._n31 = n31; this._n32 = n32; this._n33 = n33; this._n34 = n34;
        this._n41 = n41; this._n42 = n42; this._n43 = n43; this._n44 = n44;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    public setScalar(scalar: number): this {
        // prettier-ignore
        this.set(
            scalar, scalar, scalar, scalar,
            scalar, scalar, scalar, scalar,
            scalar, scalar, scalar, scalar,
            scalar, scalar, scalar, scalar,
        );

        return this;
    }

    public get isIdentity(): boolean {
        // prettier-ignore
        return (
            this.n11 == 1.0 && this.n12 == 0.0 && this.n13 == 0.0 && this.n14 == 0.0 &&
            this.n21 == 0.0 && this.n22 == 1.0 && this.n23 == 0.0 && this.n24 == 0.0 &&
            this.n31 == 0.0 && this.n32 == 0.0 && this.n33 == 1.0 && this.n34 == 0.0 &&
            this.n41 == 0.0 && this.n42 == 0.0 && this.n43 == 0.0 && this.n44 == 1.0
        );
    }

    public setIdentity(): this {
        // prettier-ignore
        this.set(
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        );

        return this;
    }

    public get isZero(): boolean {
        // prettier-ignore
        return (
            this.n11 == 0.0 && this.n12 == 0.0 && this.n13 == 0.0 && this.n14 == 0.0 &&
            this.n21 == 0.0 && this.n22 == 0.0 && this.n23 == 0.0 && this.n24 == 0.0 &&
            this.n31 == 0.0 && this.n32 == 0.0 && this.n33 == 0.0 && this.n34 == 0.0 &&
            this.n41 == 0.0 && this.n42 == 0.0 && this.n43 == 0.0 && this.n44 == 0.0
        );
    }

    public setZero(): this {
        this.setScalar(0.0);

        return this;
    }

    public fromArray(array: DataArray, offset: number = 0): this {
        // prettier-ignore
        this.set(
            array[offset + 0],  array[offset + 1],  array[offset + 2],  array[offset + 3],
            array[offset + 4],  array[offset + 5],  array[offset + 6],  array[offset + 7],
            array[offset + 8],  array[offset + 9],  array[offset + 10], array[offset + 11],
            array[offset + 12], array[offset + 13], array[offset + 14], array[offset + 15],
        );

        return this;
    }

    public toArray(array: DataArray, offset: number = 0): this {
        array[offset + 0] = this.n11;
        array[offset + 1] = this.n12;
        array[offset + 2] = this.n13;
        array[offset + 3] = this.n14;
        array[offset + 4] = this.n21;
        array[offset + 5] = this.n22;
        array[offset + 6] = this.n23;
        array[offset + 7] = this.n24;
        array[offset + 8] = this.n31;
        array[offset + 9] = this.n32;
        array[offset + 10] = this.n33;
        array[offset + 11] = this.n34;
        array[offset + 12] = this.n41;
        array[offset + 13] = this.n42;
        array[offset + 14] = this.n43;
        array[offset + 15] = this.n44;

        return this;
    }

    public asArray(): Matrix4x4Array {
        // prettier-ignore
        return [
            this.n11, this.n12, this.n13, this.n14,
            this.n21, this.n22, this.n23, this.n24,
            this.n31, this.n32, this.n33, this.n34,
            this.n41, this.n42, this.n43, this.n44,
        ];
    }

    public multiplyMatrices(a: Matrix, b: Matrix): this {
        const a11 = a.n11;
        const a12 = a.n12;
        const a13 = a.n13;
        const a14 = a.n14;
        const a21 = a.n21;
        const a22 = a.n22;
        const a23 = a.n23;
        const a24 = a.n24;
        const a31 = a.n31;
        const a32 = a.n32;
        const a33 = a.n33;
        const a34 = a.n34;
        const a41 = a.n41;
        const a42 = a.n42;
        const a43 = a.n43;
        const a44 = a.n44;

        const b11 = b.n11;
        const b12 = b.n12;
        const b13 = b.n13;
        const b14 = b.n14;
        const b21 = b.n21;
        const b22 = b.n22;
        const b23 = b.n23;
        const b24 = b.n24;
        const b31 = b.n31;
        const b32 = b.n32;
        const b33 = b.n33;
        const b34 = b.n34;
        const b41 = b.n41;
        const b42 = b.n42;
        const b43 = b.n43;
        const b44 = b.n44;

        this.n11 = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        this.n12 = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        this.n13 = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        this.n14 = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

        this.n21 = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        this.n22 = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        this.n23 = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        this.n24 = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

        this.n31 = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        this.n32 = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        this.n33 = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        this.n34 = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

        this.n41 = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        this.n42 = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        this.n43 = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        this.n44 = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

        return this;
    }

    public multiply(other: Matrix): this {
        this.multiplyMatrices(this, other);

        return this;
    }

    public premultiply(other: Matrix): this {
        this.multiplyMatrices(other, this);

        return this;
    }

    public equals(other: Matrix, threshold?: number): boolean {
        return (
            equals(this.n11, other.n11, threshold) &&
            equals(this.n12, other.n12, threshold) &&
            equals(this.n13, other.n13, threshold) &&
            equals(this.n14, other.n14, threshold) &&
            equals(this.n21, other.n21, threshold) &&
            equals(this.n22, other.n22, threshold) &&
            equals(this.n23, other.n23, threshold) &&
            equals(this.n24, other.n24, threshold) &&
            equals(this.n31, other.n31, threshold) &&
            equals(this.n32, other.n32, threshold) &&
            equals(this.n33, other.n33, threshold) &&
            equals(this.n34, other.n34, threshold) &&
            equals(this.n41, other.n41, threshold) &&
            equals(this.n42, other.n42, threshold) &&
            equals(this.n43, other.n43, threshold) &&
            equals(this.n44, other.n44, threshold)
        );
    }

    public exactlyEquals(other: Matrix): boolean {
        return this.equals(other, 0.0);
    }

    public get determinant(): number {
        const n11 = this.n11;
        const n12 = this.n12;
        const n13 = this.n13;
        const n14 = this.n14;

        const n21 = this.n21;
        const n22 = this.n22;
        const n23 = this.n23;
        const n24 = this.n24;

        const n31 = this.n31;
        const n32 = this.n32;
        const n33 = this.n33;
        const n34 = this.n34;

        const n41 = this.n41;
        const n42 = this.n42;
        const n43 = this.n43;
        const n44 = this.n44;

        const b0 = n11 * n22 - n12 * n21;
        const b1 = n11 * n23 - n13 * n21;
        const b2 = n12 * n23 - n13 * n22;
        const b3 = n31 * n42 - n32 * n41;
        const b4 = n31 * n43 - n33 * n41;
        const b5 = n32 * n43 - n33 * n42;
        const b6 = n11 * b5 - n12 * b4 + n13 * b3;
        const b7 = n21 * b5 - n22 * b4 + n23 * b3;
        const b8 = n31 * b2 - n32 * b1 + n33 * b0;
        const b9 = n41 * b2 - n42 * b1 + n43 * b0;

        return n24 * b6 - n14 * b7 + n44 * b8 - n34 * b9;
    }

    public invert(): this {
        const n11 = this.n11;
        const n12 = this.n12;
        const n13 = this.n13;
        const n14 = this.n14;

        const n21 = this.n21;
        const n22 = this.n22;
        const n23 = this.n23;
        const n24 = this.n24;

        const n31 = this.n31;
        const n32 = this.n32;
        const n33 = this.n33;
        const n34 = this.n34;

        const n41 = this.n41;
        const n42 = this.n42;
        const n43 = this.n43;
        const n44 = this.n44;

        const b0 = n11 * n22 - n12 * n21;
        const b1 = n11 * n23 - n13 * n21;
        const b2 = n11 * n24 - n14 * n21;
        const b3 = n12 * n23 - n13 * n22;
        const b4 = n12 * n24 - n14 * n22;
        const b5 = n13 * n24 - n14 * n23;
        const b6 = n31 * n42 - n32 * n41;
        const b7 = n31 * n43 - n33 * n41;
        const b8 = n31 * n44 - n34 * n41;
        const b9 = n32 * n43 - n33 * n42;
        const b10 = n32 * n44 - n34 * n42;
        const b11 = n33 * n44 - n34 * n43;

        const determinant = b0 * b11 - b1 * b10 + b2 * b9 + b3 * b8 - b4 * b7 + b5 * b6;

        if (determinant == 0.0) return this;

        const inverseDeterminant = 1.0 / determinant;

        this.n11 = (n22 * b11 - n23 * b10 + n24 * b9) * inverseDeterminant;
        this.n12 = (n13 * b10 - n12 * b11 - n14 * b9) * inverseDeterminant;
        this.n13 = (n42 * b5 - n43 * b4 + n44 * b3) * inverseDeterminant;
        this.n14 = (n33 * b4 - n32 * b5 - n34 * b3) * inverseDeterminant;

        this.n21 = (n23 * b8 - n21 * b11 - n24 * b7) * inverseDeterminant;
        this.n22 = (n11 * b11 - n13 * b8 + n14 * b7) * inverseDeterminant;
        this.n23 = (n43 * b2 - n41 * b5 - n44 * b1) * inverseDeterminant;
        this.n24 = (n31 * b5 - n33 * b2 + n34 * b1) * inverseDeterminant;

        this.n31 = (n21 * b10 - n22 * b8 + n24 * b6) * inverseDeterminant;
        this.n32 = (n12 * b8 - n11 * b10 - n14 * b6) * inverseDeterminant;
        this.n33 = (n41 * b4 - n42 * b2 + n44 * b0) * inverseDeterminant;
        this.n34 = (n32 * b2 - n31 * b4 - n34 * b0) * inverseDeterminant;

        this.n41 = (n22 * b7 - n21 * b9 - n23 * b6) * inverseDeterminant;
        this.n42 = (n11 * b9 - n12 * b7 + n13 * b6) * inverseDeterminant;
        this.n43 = (n42 * b1 - n41 * b3 - n43 * b0) * inverseDeterminant;
        this.n44 = (n31 * b3 - n32 * b1 + n33 * b0) * inverseDeterminant;

        return this;
    }

    public get inverse(): Matrix {
        return this.clone().invert();
    }

    public compose(translation: Vector3, rotation: Quaternion, scale: Vector3): this {
        const xx = 2.0 * rotation.x * rotation.x;
        const xy = 2.0 * rotation.x * rotation.y;
        const xz = 2.0 * rotation.x * rotation.z;
        const yy = 2.0 * rotation.y * rotation.y;
        const yz = 2.0 * rotation.y * rotation.z;
        const zz = 2.0 * rotation.z * rotation.z;
        const wx = 2.0 * rotation.w * rotation.x;
        const wy = 2.0 * rotation.w * rotation.y;
        const wz = 2.0 * rotation.w * rotation.z;

        const sx = scale.x;
        const sy = scale.y;
        const sz = scale.z;

        this.n11 = (1.0 - (yy + zz)) * sx;
        this.n12 = (xy - wz) * sy;
        this.n13 = (xz + wy) * sz;
        this.n14 = translation.x;

        this.n21 = (xy + wz) * sx;
        this.n22 = (1.0 - (xx + zz)) * sy;
        this.n23 = (yz - wx) * sz;
        this.n24 = translation.y;

        this.n31 = (xz - wy) * sx;
        this.n32 = (yz + wx) * sy;
        this.n33 = (1.0 - (xx + yy)) * sz;
        this.n34 = translation.z;

        this.n41 = 0.0;
        this.n42 = 0.0;
        this.n43 = 0.0;
        this.n44 = 1.0;

        return this;
    }

    public perspective(
        fov: Radians,
        aspect: number,
        near: number,
        far: number,
        coordinateSystem: CoordinateSystem,
    ): this {
        const f = 1.0 / Math.tan(fov / 2.0);
        const nf = 1.0 / (near - far);

        this.n11 = f / aspect;
        this.n12 = 0.0;
        this.n13 = 0.0;
        this.n14 = 0.0;

        this.n21 = 0.0;
        this.n22 = f;
        this.n23 = 0.0;
        this.n24 = 0.0;

        this.n31 = 0.0;
        this.n32 = 0.0;

        switch (coordinateSystem) {
            case CoordinateSystem.WebGLCoordinateSystem:
                this.n33 = (far + near) * nf;
                this.n34 = 2.0 * far * near * nf;
                break;

            case CoordinateSystem.WebGPUCoordinateSystem:
                this.n33 = far * nf;
                this.n34 = far * near * nf;
                break;
        }

        this.n41 = 0.0;
        this.n42 = 0.0;
        this.n43 = -1.0;
        this.n44 = 0.0;

        return this;
    }

    public toString(): string {
        const n11 = this.n11;
        const n12 = this.n12;
        const n13 = this.n13;
        const n14 = this.n14;

        const n21 = this.n21;
        const n22 = this.n22;
        const n23 = this.n23;
        const n24 = this.n24;

        const n31 = this.n31;
        const n32 = this.n32;
        const n33 = this.n33;
        const n34 = this.n34;

        const n41 = this.n41;
        const n42 = this.n42;
        const n43 = this.n43;
        const n44 = this.n44;

        return `(${n11}, ${n12}, ${n13}, ${n14}\n${n21}, ${n22}, ${n23}, ${n24}\n${n31}, ${n32}, ${n33}, ${n34}\n${n41}, ${n42}, ${n43}, ${n44}\n)`;
    }

    public static Identity(): Matrix {
        // prettier-ignore
        return new Matrix(
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        );
    }

    public static Zero(): Matrix {
        // prettier-ignore
        return new Matrix(
            0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0,
        );
    }

    public static FromArray(array: DataArray, offset?: number): Matrix {
        return Matrix.Identity().fromArray(array, offset);
    }

    public static Multiply(a: Matrix, b: Matrix): Matrix {
        return Matrix.Identity().multiplyMatrices(a, b);
    }

    public static Compose(translation: Vector3, rotation: Quaternion, scale: Vector3): Matrix {
        return Matrix.Identity().compose(translation, rotation, scale);
    }

    public static Perspective(
        fovy: Radians,
        aspect: number,
        near: number,
        far: number,
        coordinateSystem: CoordinateSystem,
    ): Matrix {
        return Matrix.Identity().perspective(fovy, aspect, near, far, coordinateSystem);
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<number, void> {
        yield this.n11;
        yield this.n12;
        yield this.n13;
        yield this.n14;

        yield this.n21;
        yield this.n22;
        yield this.n23;
        yield this.n24;

        yield this.n31;
        yield this.n32;
        yield this.n33;
        yield this.n34;

        yield this.n41;
        yield this.n42;
        yield this.n43;
        yield this.n44;
    }
}
