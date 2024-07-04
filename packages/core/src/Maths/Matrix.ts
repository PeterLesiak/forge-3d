import type { Type } from '@/Types/Type';

// prettier-ignore
export type Matrix4x4Array = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
];

export class Matrix implements Type {
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
        // prettier-ignore
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

    public label: string = '';

    public static Zero(): Matrix {
        // prettier-ignore
        return new Matrix(
            0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0,
        );
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
}
