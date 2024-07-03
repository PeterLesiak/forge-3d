import type { Nullable } from '@/Types/Utilities';
import { Transform } from '@/Maths/Transform';

export class Node extends Transform implements Iterable<Node> {
    public override readonly objectClassName: string = 'Node';

    public children: Node[] = [];

    private _parent: Nullable<Node> = null;

    public get parent(): Nullable<Node> {
        return this._parent;
    }

    private _root: Node = this;

    public get root(): Node {
        return this._root;
    }

    public constructor(parent: Nullable<Node> = null) {
        super();

        parent?.add(this);
    }

    public get isEmpty(): boolean {
        return !this.children.length;
    }

    public contains(...nodes: Nullable<Node>[]): boolean {
        for (const node of nodes) {
            if (!node) continue;

            if (node.parent === this) {
                return true;
            }
        }

        return false;
    }

    public add(...nodes: Nullable<Node>[]): this {
        for (const node of nodes) {
            if (!node) continue;

            node.removeFromParent();

            this.children.push(node);

            node._parent = this;
            node._root = this.root;
        }

        return this;
    }

    public remove(...nodes: Nullable<Node>[]): this {
        for (const node of nodes) {
            if (!node) continue;

            const index = this.children.indexOf(node);

            if (index < 0) continue;

            this.children.splice(index, 1);

            node._parent = null;
            node._root = node;
        }

        return this;
    }

    public removeFromParent(): this {
        this.parent?.remove(this);

        return this;
    }

    public *[Symbol.iterator](): Iterator<Node, void> {
        const search = function* (root: Node): Generator<Node, void> {
            for (const node of root.children) {
                yield node;
            }

            for (const node of root.children) {
                yield* search(node);
            }
        };

        yield* search(this);
    }
}
