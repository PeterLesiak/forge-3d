import type { Matrix } from '@/Maths';
import { Node } from '@/Node';

export class Scene extends Node {
    public override computeWorldMatrix(): Matrix {
        this.worldMatrix.copy(this.localMatrix);

        return super.computeWorldMatrix(false, true);
    }

    public override get objectClassName(): string {
        return 'Scene';
    }
}
