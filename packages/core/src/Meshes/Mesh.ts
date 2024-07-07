import type { Nullable } from '@/Types/Utilities';
import { Node } from '@/Node';

import type { Geometry } from './Geometry';

export class Mesh extends Node {
    public geometry: Geometry;

    public constructor(geometry: Geometry, parent: Nullable<Node> = null) {
        super(parent);

        this.geometry = geometry;
    }

    public override copy(other: Mesh): this {
        super.copy(other);

        this.geometry = other.geometry.clone();

        return this;
    }

    public override clone(): Mesh {
        const mesh = new Mesh(this.geometry.clone());

        return mesh;
    }
}
