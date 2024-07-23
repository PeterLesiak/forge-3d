import type { Nullable } from '@/Types/Utilities';
import { Node } from '@/Node';
import type { Material } from '@/Materials/Material';
import { StandardMaterial } from '@/Materials/StandardMaterial';

import type { Geometry } from './Geometry';

export class Mesh extends Node {
    public geometry: Geometry;

    public material: Material;

    public constructor(
        geometry: Geometry,
        material: Material = new StandardMaterial(),
        parent?: Nullable<Node>,
    ) {
        super(parent);

        this.geometry = geometry;
        this.material = material;
    }

    public override copy(other: Mesh): this {
        super.copy(other);

        this.geometry = other.geometry.clone();
        this.material = other.material.clone();

        return this;
    }

    public override clone(): Mesh {
        const mesh = new Mesh(this.geometry, this.material);

        mesh.copy(this);

        return mesh;
    }
}
