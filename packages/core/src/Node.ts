import type { Nullable } from '@/Types/Utilities';
import { Transform } from '@/Maths/Transform';

export class Node extends Transform implements Iterable<Node> {
    public readonly children: Node[] = [];

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
        for (const node of this) {
            if (nodes.includes(node)) {
                return true;
            }
        }

        return false;
    }

    public add(...nodes: Nullable<Node>[]): this {
        for (const node of nodes) {
            if (!node) continue;

            if (node === this) continue;

            if (node.contains(this)) continue;

            node.removeFromParent();

            this.children.push(node);

            node._parent = this;
            node._root = this.root;
        }

        return this;
    }

    public remove(...nodes: Nullable<Node>[]): this {
        for (const node of this) {
            if (nodes.includes(node)) {
                node.removeFromParent();
            }
        }

        return this;
    }

    public removeFromParent(): this {
        if (!this.parent) return this;

        const index = this.parent.children.indexOf(this);

        this.parent.children.splice(index, 1);
        this._parent = null;
        this._root = this;

        return this;
    }

    public removeAll(): this {
        for (const node of this.children) {
            node.removeFromParent();
        }

        return this;
    }

    public traverse(callback: (node: Node) => any, includeSelf: boolean = false): this {
        if (includeSelf) {
            callback(this);
        }

        for (const node of this) {
            callback(node);
        }

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
