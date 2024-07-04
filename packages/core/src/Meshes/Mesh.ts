import type { Nullable } from '@/Types/Utilities';
import { Node } from '@/Node';

import { Geometry } from './Geometry';

export class Mesh extends Node {
    public geometry: Geometry;

    public constructor(geometry: Geometry, parent: Nullable<Node> = null) {
        super(parent);

        this.geometry = geometry;
    }
}
