import type { Radians } from '@/Types/Scalar';
import type { DataArray } from '@/Types/Array';
import type { Type } from '@/Types/Type';

import { equals } from './Utilities';

export type EulerOrder = 'xyz' | 'xzy' | 'yxz' | 'yzx' | 'zxy' | 'zyx';

export type QuaternionArray = [number, number, number, number];

export class Quaternion implements Type, Iterable<number> {
    public x: number;

    public y: number;

    public z: number;

    public w: number;

    public constructor(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public copy(other: Quaternion): this {
        this.set(other.x, other.y, other.z, other.w);

        return this;
    }

    public clone(): Quaternion {
        return new Quaternion(this.x, this.y, this.z, this.w);
    }

    public set(x: number, y: number, z: number, w: number): this {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;
    }

    public setScalar(scalar: number): this {
        this.set(scalar, scalar, scalar, scalar);

        return this;
    }

    public isIdentity(): boolean {
        return this.x == 0.0 && this.y == 0.0 && this.z == 0.0 && this.w == 1.0;
    }

    public setIdentity(): this {
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
        this.w = 1.0;

        return this;
    }

    public isinzero(): boolean {
        return this.x == 0.0 && this.y == 0.0 && this.z == 0.0 && this.w == 0.0;
    }

    public setZero(): this {
        this.setScalar(0.0);

        return this;
    }

    public fromArray(array: DataArray, offset: number = 0): this {
        this.set(array[offset], array[offset + 1], array[offset + 2], array[offset + 3]);

        return this;
    }

    public toArray(array: DataArray, offset: number = 0): this {
        array[offset + 0] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.w;

        return this;
    }

    public asArray(): QuaternionArray {
        return [this.x, this.y, this.z, this.w];
    }

    public multiplyQuaternions(a: Quaternion, b: Quaternion): this {
        const ax = a.x;
        const ay = a.y;
        const az = a.z;
        const aw = a.w;

        const bx = b.x;
        const by = b.y;
        const bz = b.z;
        const bw = b.w;

        this.x = ax * bw + aw * bx + ay * bz - az * by;
        this.y = ay * bw + aw * by + az * bx - ax * bz;
        this.z = az * bw + aw * bz + ax * by - ay * bx;
        this.w = aw * bw - ax * bx - ay * by - az * bz;

        return this;
    }

    public multiplyFlat(x: number, y: number, z: number, w: number): this {
        this.set(this.x * x, this.y * y, this.z * z, this.w * w);

        return this;
    }

    public multiplyScalar(scalar: number): this {
        this.set(this.x * scalar, this.y * scalar, this.z * scalar, this.w * scalar);

        return this;
    }

    public multiply(other: Quaternion): this {
        this.multiplyQuaternions(this, other);

        return this;
    }

    public premultiply(other: Quaternion): this {
        this.multiplyQuaternions(other, this);

        return this;
    }

    public equals(other: Quaternion, threshold?: number): boolean {
        return (
            equals(this.x, other.x, threshold) &&
            equals(this.y, other.y, threshold) &&
            equals(this.z, other.z, threshold) &&
            equals(this.w, other.w, threshold)
        );
    }

    public equalsExactly(other: Quaternion): boolean {
        return this.equals(other, 0.0);
    }

    public conjugate(): this {
        this.multiplyFlat(-1.0, -1.0, -1.0, 1.0);

        return this;
    }

    public get lengthSquared(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }

    public get length(): number {
        return Math.sqrt(this.lengthSquared);
    }

    public normalize(): this {
        const length = this.length;

        if (length == 0.0) {
            this.setZero();

            return this;
        }

        this.multiplyScalar(1.0 / length);

        return this;
    }

    public normalized(): Quaternion {
        return this.clone().normalize();
    }

    public dot(other: Quaternion): number {
        return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
    }

    public invert(): this {
        const dot = this.dot(this);

        if (dot == 0.0) {
            this.setZero();

            return this;
        }

        this.multiplyFlat(-1.0 / dot, -1.0 / dot, -1.0 / dot, 1.0 / dot);

        return this;
    }

    public inverse(): Quaternion {
        return this.clone().invert();
    }

    public fromEuler(x: Radians, y: Radians, z: Radians, order: EulerOrder = 'xyz'): this {
        const sinx = Math.sin(x * 0.5);
        const cosx = Math.cos(x * 0.5);
        const siny = Math.sin(y * 0.5);
        const cosy = Math.cos(y * 0.5);
        const sinz = Math.sin(z * 0.5);
        const cosz = Math.cos(z * 0.5);

        switch (order) {
            case 'xyz':
                this.x = sinx * cosy * cosz + cosx * siny * sinz;
                this.y = cosx * siny * cosz - sinx * cosy * sinz;
                this.z = cosx * cosy * sinz + sinx * siny * cosz;
                this.w = cosx * cosy * cosz - sinx * siny * sinz;
                break;

            case 'xzy':
                this.x = sinx * cosy * cosz - cosx * siny * sinz;
                this.y = cosx * siny * cosz - sinx * cosy * sinz;
                this.z = cosx * cosy * sinz + sinx * siny * cosz;
                this.w = cosx * cosy * cosz + sinx * siny * sinz;
                break;

            case 'yxz':
                this.x = sinx * cosy * cosz + cosx * siny * sinz;
                this.y = cosx * siny * cosz - sinx * cosy * sinz;
                this.z = cosx * cosy * sinz - sinx * siny * cosz;
                this.w = cosx * cosy * cosz + sinx * siny * sinz;
                break;

            case 'yzx':
                this.x = sinx * cosy * cosz + cosx * siny * sinz;
                this.y = cosx * siny * cosz + sinx * cosy * sinz;
                this.z = cosx * cosy * sinz - sinx * siny * cosz;
                this.w = cosx * cosy * cosz - sinx * siny * sinz;
                break;

            case 'zxy':
                this.x = sinx * cosy * cosz - cosx * siny * sinz;
                this.y = cosx * siny * cosz + sinx * cosy * sinz;
                this.z = cosx * cosy * sinz + sinx * siny * cosz;
                this.w = cosx * cosy * cosz - sinx * siny * sinz;
                break;

            case 'zyx':
                this.x = sinx * cosy * cosz - cosx * siny * sinz;
                this.y = cosx * siny * cosz + sinx * cosy * sinz;
                this.z = cosx * cosy * sinz - sinx * siny * cosz;
                this.w = cosx * cosy * cosz + sinx * siny * sinz;
                break;
        }

        return this;
    }

    public toString(): string {
        return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }

    public static identity(): Quaternion {
        return new Quaternion(0.0, 0.0, 0.0, 1.0);
    }

    public static zero(): Quaternion {
        return new Quaternion(0.0, 0.0, 0.0, 0.0);
    }

    public static fromArray(array: DataArray, offset?: number): Quaternion {
        return Quaternion.identity().fromArray(array, offset);
    }

    public static multiply(a: Quaternion, b: Quaternion): Quaternion {
        return Quaternion.zero().multiplyQuaternions(a, b);
    }

    public static conjugate(other: Quaternion): Quaternion {
        return other.clone().conjugate();
    }

    public static fromEuler(
        x: Radians,
        y: Radians,
        z: Radians,
        order?: EulerOrder,
    ): Quaternion {
        return Quaternion.identity().fromEuler(x, y, z, order);
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<number, void> {
        yield this.x;
        yield this.y;
        yield this.z;
        yield this.w;
    }
}
