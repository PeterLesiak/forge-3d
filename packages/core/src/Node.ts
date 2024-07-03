import type { Nullable } from '@/Types/Utilities';
import { Transform } from '@/Maths/Transform';

export class Node extends Transform {
    public root: Node = this;

    public parent: Nullable<Node> = null;

    public children: Node[] = [];

    public constructor(parent: Nullable<Node> = null) {
        super();

        this.add(parent);
    }

    public get isEmpty(): boolean {
        return !this.children.length;
    }

    public add(...nodes: Nullable<Node>[]): this {
        for (const node of nodes) {
            if (!node) continue;

            node.removeFromParent();

            this.children.push(node);

            node.parent = this;
        }

        return this;
    }

    public remove(...nodes: Nullable<Node>[]): this {
        for (const node of nodes) {
            if (!node) continue;

            const index = this.children.indexOf(node);

            if (index < 0) continue;

            this.children.splice(index, 1);

            node.parent = null;
        }

        return this;
    }

    public removeFromParent(): this {
        this.parent?.remove(this);

        return this;
    }
}
