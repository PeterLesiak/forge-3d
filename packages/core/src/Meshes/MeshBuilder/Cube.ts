import type { Nullable } from '@/Types/Utilities';
import type { Node } from '@/Node';
import { UIntegerBuffer } from '@/Buffers/UIntegerBuffer';
import { Float2Buffer } from '@/Buffers/Float2Buffer';
import { Float3Buffer } from '@/Buffers/Float3Buffer';

import { Geometry } from '../Geometry';
import { Mesh } from '../Mesh';

export class Cube extends Mesh {
    public constructor(parent: Nullable<Node> = null) {
        // prettier-ignore
        const indexBuffer = new UIntegerBuffer([
            // front
            0, 1, 2,
            0, 2, 3,

            // back
            4, 5, 6,
            4, 6, 7,

            // top
            8, 9, 10,
            8, 10, 11,

            // bottom
            12, 13, 14,
            12, 14, 15,

            // right
            16, 17, 18,
            16, 18, 19,

            // left
            20, 21, 22,
            20, 22, 23,

        ]);

        // prettier-ignore
        const positionBuffer = new Float3Buffer([
            // front
            -1.0, -1.0, 1.0,
            1.0, -1.0, 1.0,
            1.0, 1.0, 1.0,
            -1.0, 1.0, 1.0,

            // back
            -1.0, -1.0, -1.0,
            -1.0, 1.0, -1.0,
            1.0, 1.0, -1.0,
            1.0, -1.0, -1.0,

            // top
            -1.0, 1.0, -1.0,
            -1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, -1.0,

            // bottom
            -1.0, -1.0, -1.0,
            1.0, -1.0, -1.0,
            1.0, -1.0, 1.0,
            -1.0, -1.0, 1.0,

            // right
            1.0, -1.0, -1.0,
            1.0, 1.0, -1.0,
            1.0, 1.0, 1.0,
            1.0, -1.0, 1.0,

            // left
            -1.0, -1.0, -1.0,
            -1.0, -1.0, 1.0,
            -1.0, 1.0, 1.0,
            -1.0, 1.0, -1.0,
        ]);

        // prettier-ignore
        const normalBuffer = new Float3Buffer([
            // front
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,

            // back
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,

            // top
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,

            // bottom
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,

            // right
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,

            // left
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
        ]);

        // prettier-ignore
        const uvBuffer = new Float2Buffer([
            // front
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,

            // back
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,

            // top
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,

            // bottom
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,

            // right
            0.0, 0.0, 
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,

            // left
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        ]);

        const geometry = new Geometry();
        geometry.setIndex(indexBuffer);
        geometry.setPosition(positionBuffer);
        geometry.setNormal(normalBuffer);
        geometry.setUV(uvBuffer);

        super(geometry, parent);
    }
}
