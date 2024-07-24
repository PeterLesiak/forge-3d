import type { Nullable } from '@/Types/Utilities';
import { UIntegerBuffer } from '@/Buffers/UIntegerBuffer';
import { Float2Buffer } from '@/Buffers/Float2Buffer';
import { Float3Buffer } from '@/Buffers/Float3Buffer';
import type { Node } from '@/Node';
import type { Material } from '@/Materials/Material';

import { Geometry } from '../Geometry';
import { Mesh } from '../Mesh';

export interface CubeProperties {
    material?: Material;

    parent?: Nullable<Node>;
}

export class Cube extends Mesh implements CubeProperties {
    public constructor(properties: CubeProperties);

    public constructor(parent: Nullable<Node>);

    public constructor();

    public constructor(properties: CubeProperties | Nullable<Node> = {}) {
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

        let material: Material | undefined = undefined;
        let parent: Nullable<Node> | undefined = undefined;

        if (properties) {
            if ('material' in properties) {
                material = properties.material;
            }

            if ('parent' in properties) {
                parent = properties.parent;
            }
        }

        super(geometry, material, parent);
    }

    public override get objectClassName(): string {
        return 'Cube';
    }
}
