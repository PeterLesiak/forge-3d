import type { Radians } from '@/Types/Scalar';
import type { DataArray } from '@/Types/Array';
import type { Type } from '@/Types/Type';

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

export class Matrix implements Type, Iterable<number> {
    // prettier-ignore
    public readonly elements: Matrix4x4Array;

    // prettier-ignore
    public constructor(
        n11: number, n12: number, n13: number, n14: number,
        n21: number, n22: number, n23: number, n24: number,
        n31: number, n32: number, n33: number, n34: number,
        n41: number, n42: number, n43: number, n44: number,
    ) {
        this.elements = [
            n11, n12, n13, n14,
            n21, n22, n23, n24,
            n31, n32, n33, n34,
            n41, n42, n43, n44,
        ];
    }

    public copy(other: Matrix): this {
        this.elements[0] = other.elements[0];
        this.elements[1] = other.elements[1];
        this.elements[2] = other.elements[2];
        this.elements[3] = other.elements[3];

        this.elements[4] = other.elements[4];
        this.elements[5] = other.elements[5];
        this.elements[6] = other.elements[6];
        this.elements[7] = other.elements[7];

        this.elements[8] = other.elements[8];
        this.elements[9] = other.elements[9];
        this.elements[10] = other.elements[10];
        this.elements[11] = other.elements[11];

        this.elements[12] = other.elements[12];
        this.elements[13] = other.elements[13];
        this.elements[14] = other.elements[14];
        this.elements[15] = other.elements[15];

        return this;
    }

    public clone(): Matrix {
        return new Matrix(
            this.elements[0],
            this.elements[1],
            this.elements[2],
            this.elements[3],

            this.elements[4],
            this.elements[5],
            this.elements[6],
            this.elements[7],

            this.elements[8],
            this.elements[9],
            this.elements[10],
            this.elements[11],

            this.elements[12],
            this.elements[13],
            this.elements[14],
            this.elements[15],
        );
    }

    // prettier-ignore
    public set(
        n11: number, n12: number, n13: number, n14: number,
        n21: number, n22: number, n23: number, n24: number,
        n31: number, n32: number, n33: number, n34: number,
        n41: number, n42: number, n43: number, n44: number,
    ) {
        this.elements[0] = n11;
        this.elements[1] = n12;
        this.elements[2] = n13;
        this.elements[3] = n14;

        this.elements[4] = n21;
        this.elements[5] = n22;
        this.elements[6] = n23;
        this.elements[7] = n24;

        this.elements[8] = n31;
        this.elements[9] = n32;
        this.elements[10] = n33;
        this.elements[11] = n34;

        this.elements[12] = n41;
        this.elements[13] = n42;
        this.elements[14] = n43;
        this.elements[15] = n44;
    }

    public setScalar(scalar: number): this {
        this.elements[0] = scalar;
        this.elements[1] = scalar;
        this.elements[2] = scalar;
        this.elements[3] = scalar;

        this.elements[4] = scalar;
        this.elements[5] = scalar;
        this.elements[6] = scalar;
        this.elements[7] = scalar;

        this.elements[8] = scalar;
        this.elements[9] = scalar;
        this.elements[10] = scalar;
        this.elements[11] = scalar;

        this.elements[12] = scalar;
        this.elements[13] = scalar;
        this.elements[14] = scalar;
        this.elements[15] = scalar;

        return this;
    }

    public get isIdentity(): boolean {
        return (
            this.elements[0] == 1.0 &&
            this.elements[1] == 0.0 &&
            this.elements[2] == 0.0 &&
            this.elements[3] == 0.0 &&
            this.elements[4] == 0.0 &&
            this.elements[5] == 1.0 &&
            this.elements[6] == 0.0 &&
            this.elements[7] == 0.0 &&
            this.elements[8] == 0.0 &&
            this.elements[9] == 0.0 &&
            this.elements[10] == 1.0 &&
            this.elements[11] == 0.0 &&
            this.elements[12] == 0.0 &&
            this.elements[13] == 0.0 &&
            this.elements[14] == 0.0 &&
            this.elements[15] == 1.0
        );
    }

    public setIdentity(): this {
        this.elements[0] = 1.0;
        this.elements[1] = 0.0;
        this.elements[2] = 0.0;
        this.elements[3] = 0.0;

        this.elements[4] = 0.0;
        this.elements[5] = 1.0;
        this.elements[6] = 0.0;
        this.elements[7] = 0.0;

        this.elements[8] = 0.0;
        this.elements[9] = 0.0;
        this.elements[10] = 1.0;
        this.elements[11] = 0.0;

        this.elements[12] = 0.0;
        this.elements[13] = 0.0;
        this.elements[14] = 0.0;
        this.elements[15] = 1.0;

        return this;
    }

    public get isZero(): boolean {
        return (
            this.elements[0] == 0.0 &&
            this.elements[1] == 0.0 &&
            this.elements[2] == 0.0 &&
            this.elements[3] == 0.0 &&
            this.elements[4] == 0.0 &&
            this.elements[5] == 0.0 &&
            this.elements[6] == 0.0 &&
            this.elements[7] == 0.0 &&
            this.elements[8] == 0.0 &&
            this.elements[9] == 0.0 &&
            this.elements[10] == 0.0 &&
            this.elements[11] == 0.0 &&
            this.elements[12] == 0.0 &&
            this.elements[13] == 0.0 &&
            this.elements[14] == 0.0 &&
            this.elements[15] == 0.0
        );
    }

    public setZero(): this {
        this.setScalar(0.0);

        return this;
    }

    public fromArray(array: DataArray, offset: number = 0): this {
        this.elements[0] = array[offset + 0];
        this.elements[1] = array[offset + 1];
        this.elements[2] = array[offset + 2];
        this.elements[3] = array[offset + 3];
        this.elements[4] = array[offset + 4];
        this.elements[5] = array[offset + 5];
        this.elements[6] = array[offset + 6];
        this.elements[7] = array[offset + 7];
        this.elements[8] = array[offset + 8];
        this.elements[9] = array[offset + 9];
        this.elements[10] = array[offset + 10];
        this.elements[11] = array[offset + 11];
        this.elements[12] = array[offset + 12];
        this.elements[13] = array[offset + 13];
        this.elements[14] = array[offset + 14];
        this.elements[15] = array[offset + 15];

        return this;
    }

    public toArray(array: DataArray, offset: number = 0): this {
        array[offset + 0] = this.elements[0];
        array[offset + 1] = this.elements[1];
        array[offset + 2] = this.elements[2];
        array[offset + 3] = this.elements[3];
        array[offset + 4] = this.elements[4];
        array[offset + 5] = this.elements[5];
        array[offset + 6] = this.elements[6];
        array[offset + 7] = this.elements[7];
        array[offset + 8] = this.elements[8];
        array[offset + 9] = this.elements[9];
        array[offset + 10] = this.elements[10];
        array[offset + 11] = this.elements[11];
        array[offset + 12] = this.elements[12];
        array[offset + 13] = this.elements[13];
        array[offset + 14] = this.elements[14];
        array[offset + 15] = this.elements[15];

        return this;
    }

    public asArray(): Matrix4x4Array {
        return [...this.elements];
    }

    public multiplyMatrices(a: Matrix, b: Matrix): this {
        const a11 = a.elements[0];
        const a12 = a.elements[1];
        const a13 = a.elements[2];
        const a14 = a.elements[3];
        const a21 = a.elements[4];
        const a22 = a.elements[5];
        const a23 = a.elements[6];
        const a24 = a.elements[7];
        const a31 = a.elements[8];
        const a32 = a.elements[9];
        const a33 = a.elements[10];
        const a34 = a.elements[11];
        const a41 = a.elements[12];
        const a42 = a.elements[13];
        const a43 = a.elements[14];
        const a44 = a.elements[15];

        const b11 = b.elements[0];
        const b12 = b.elements[1];
        const b13 = b.elements[2];
        const b14 = b.elements[3];
        const b21 = b.elements[4];
        const b22 = b.elements[5];
        const b23 = b.elements[6];
        const b24 = b.elements[7];
        const b31 = b.elements[8];
        const b32 = b.elements[9];
        const b33 = b.elements[10];
        const b34 = b.elements[11];
        const b41 = b.elements[12];
        const b42 = b.elements[13];
        const b43 = b.elements[14];
        const b44 = b.elements[15];

        this.elements[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        this.elements[1] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        this.elements[2] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        this.elements[3] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

        this.elements[4] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        this.elements[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        this.elements[6] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        this.elements[7] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

        this.elements[8] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        this.elements[9] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        this.elements[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        this.elements[11] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

        this.elements[12] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        this.elements[13] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        this.elements[14] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        this.elements[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

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
            equals(this.elements[0], other.elements[0], threshold) &&
            equals(this.elements[1], other.elements[1], threshold) &&
            equals(this.elements[2], other.elements[2], threshold) &&
            equals(this.elements[3], other.elements[3], threshold) &&
            equals(this.elements[4], other.elements[4], threshold) &&
            equals(this.elements[5], other.elements[5], threshold) &&
            equals(this.elements[6], other.elements[6], threshold) &&
            equals(this.elements[7], other.elements[7], threshold) &&
            equals(this.elements[8], other.elements[8], threshold) &&
            equals(this.elements[9], other.elements[9], threshold) &&
            equals(this.elements[10], other.elements[10], threshold) &&
            equals(this.elements[11], other.elements[11], threshold) &&
            equals(this.elements[12], other.elements[12], threshold) &&
            equals(this.elements[13], other.elements[13], threshold) &&
            equals(this.elements[14], other.elements[14], threshold) &&
            equals(this.elements[15], other.elements[15], threshold)
        );
    }

    public exactlyEquals(other: Matrix): boolean {
        return this.equals(other, 0.0);
    }

    public get determinant(): number {
        const n11 = this.elements[0];
        const n12 = this.elements[1];
        const n13 = this.elements[2];
        const n14 = this.elements[3];

        const n21 = this.elements[4];
        const n22 = this.elements[5];
        const n23 = this.elements[6];
        const n24 = this.elements[7];

        const n31 = this.elements[8];
        const n32 = this.elements[9];
        const n33 = this.elements[10];
        const n34 = this.elements[11];

        const n41 = this.elements[12];
        const n42 = this.elements[13];
        const n43 = this.elements[14];
        const n44 = this.elements[15];

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
        const n11 = this.elements[0];
        const n12 = this.elements[1];
        const n13 = this.elements[2];
        const n14 = this.elements[3];

        const n21 = this.elements[4];
        const n22 = this.elements[5];
        const n23 = this.elements[6];
        const n24 = this.elements[7];

        const n31 = this.elements[8];
        const n32 = this.elements[9];
        const n33 = this.elements[10];
        const n34 = this.elements[11];

        const n41 = this.elements[12];
        const n42 = this.elements[13];
        const n43 = this.elements[14];
        const n44 = this.elements[15];

        const b00 = n11 * n22 - n12 * n21;
        const b01 = n11 * n23 - n13 * n21;
        const b02 = n11 * n24 - n14 * n21;
        const b03 = n12 * n23 - n13 * n22;
        const b04 = n12 * n24 - n14 * n22;
        const b05 = n13 * n24 - n14 * n23;
        const b06 = n31 * n42 - n32 * n41;
        const b07 = n31 * n43 - n33 * n41;
        const b08 = n31 * n44 - n34 * n41;
        const b09 = n32 * n43 - n33 * n42;
        const b10 = n32 * n44 - n34 * n42;
        const b11 = n33 * n44 - n34 * n43;

        const determinant =
            b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

        if (determinant == 0.0) return this;

        const inverseDeterminant = 1.0 / determinant;

        this.elements[0] = (n22 * b11 - n23 * b10 + n24 * b09) * inverseDeterminant;
        this.elements[1] = (n13 * b10 - n12 * b11 - n14 * b09) * inverseDeterminant;
        this.elements[2] = (n42 * b05 - n43 * b04 + n44 * b03) * inverseDeterminant;
        this.elements[3] = (n33 * b04 - n32 * b05 - n34 * b03) * inverseDeterminant;

        this.elements[4] = (n23 * b08 - n21 * b11 - n24 * b07) * inverseDeterminant;
        this.elements[5] = (n11 * b11 - n13 * b08 + n14 * b07) * inverseDeterminant;
        this.elements[6] = (n43 * b02 - n41 * b05 - n44 * b01) * inverseDeterminant;
        this.elements[7] = (n31 * b05 - n33 * b02 + n34 * b01) * inverseDeterminant;

        this.elements[8] = (n21 * b10 - n22 * b08 + n24 * b06) * inverseDeterminant;
        this.elements[9] = (n12 * b08 - n11 * b10 - n14 * b06) * inverseDeterminant;
        this.elements[10] = (n41 * b04 - n42 * b02 + n44 * b00) * inverseDeterminant;
        this.elements[11] = (n32 * b02 - n31 * b04 - n34 * b00) * inverseDeterminant;

        this.elements[12] = (n22 * b07 - n21 * b09 - n23 * b06) * inverseDeterminant;
        this.elements[13] = (n11 * b09 - n12 * b07 + n13 * b06) * inverseDeterminant;
        this.elements[14] = (n42 * b01 - n41 * b03 - n43 * b00) * inverseDeterminant;
        this.elements[15] = (n31 * b03 - n32 * b01 + n33 * b00) * inverseDeterminant;

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

        this.elements[0] = (1.0 - (yy + zz)) * sx;
        this.elements[1] = (xy - wz) * sy;
        this.elements[2] = (xz + wy) * sz;
        this.elements[3] = translation.x;

        this.elements[4] = (xy + wz) * sx;
        this.elements[5] = (1.0 - (xx + zz)) * sy;
        this.elements[6] = (yz - wx) * sz;
        this.elements[7] = translation.y;

        this.elements[8] = (xz - wy) * sx;
        this.elements[9] = (yz + wx) * sy;
        this.elements[10] = (1.0 - (xx + yy)) * sz;
        this.elements[11] = translation.z;

        this.elements[12] = 0.0;
        this.elements[13] = 0.0;
        this.elements[14] = 0.0;
        this.elements[15] = 1.0;

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

        this.elements[0] = f / aspect;
        this.elements[1] = 0.0;
        this.elements[2] = 0.0;
        this.elements[3] = 0.0;

        this.elements[4] = 0.0;
        this.elements[5] = f;
        this.elements[6] = 0.0;
        this.elements[7] = 0.0;

        this.elements[8] = 0.0;
        this.elements[9] = 0.0;

        switch (coordinateSystem) {
            case CoordinateSystem.WebGLCoordinateSystem:
                this.elements[10] = (far + near) * nf;
                this.elements[11] = 2.0 * far * near * nf;
                break;

            case CoordinateSystem.WebGPUCoordinateSystem:
                this.elements[10] = far * nf;
                this.elements[11] = far * near * nf;
                break;
        }

        this.elements[12] = 0.0;
        this.elements[13] = 0.0;
        this.elements[14] = -1.0;
        this.elements[15] = 0.0;

        return this;
    }

    public toString(): string {
        const n11 = this.elements[0];
        const n12 = this.elements[1];
        const n13 = this.elements[2];
        const n14 = this.elements[3];

        const n21 = this.elements[4];
        const n22 = this.elements[5];
        const n23 = this.elements[6];
        const n24 = this.elements[7];

        const n31 = this.elements[8];
        const n32 = this.elements[9];
        const n33 = this.elements[10];
        const n34 = this.elements[11];

        const n41 = this.elements[12];
        const n42 = this.elements[13];
        const n43 = this.elements[14];
        const n44 = this.elements[15];

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
        yield this.elements[0];
        yield this.elements[1];
        yield this.elements[2];
        yield this.elements[3];

        yield this.elements[4];
        yield this.elements[5];
        yield this.elements[6];
        yield this.elements[7];

        yield this.elements[8];
        yield this.elements[9];
        yield this.elements[10];
        yield this.elements[11];

        yield this.elements[12];
        yield this.elements[13];
        yield this.elements[14];
        yield this.elements[15];
    }
}
