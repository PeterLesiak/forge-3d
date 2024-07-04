import type { Type } from '@/Types/Type';

export type QuaternionArray = [number, number, number, number];

export class Quaternion implements Type {
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

    public set(x: number, y: number, z: number, w: number): this {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;
    }

    public copy(other: Quaternion): this {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
        this.w = other.w;

        return this;
    }

    public clone(): Quaternion {
        return new Quaternion(this.x, this.y, this.z, this.w);
    }

    public label: string = '';

    public static Zero(): Quaternion {
        return new Quaternion(0.0, 0.0, 0.0, 0.0);
    }

    public static Identity(): Quaternion {
        return new Quaternion(0.0, 0.0, 0.0, 1.0);
    }
}
