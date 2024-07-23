import type { Nullable } from '@/Types/Utilities';
import { Observable, type ObserverFunction } from '@/Observer';
import { Matrix } from '@/Maths/Matrix';
import { Transform } from '@/Maths/Transform';

export type OnChildAdded<T extends Node = Node> = ObserverFunction<{
    dispatcher: T;
    node: Node;
}>;

export type OnChildRemoved<T extends Node = Node> = ObserverFunction<{
    dispatcher: T;
    child: Node;
    parent: Node;
}>;

export type OnBeforeRender<T extends Node = Node> = ObserverFunction<T>;

export type OnAfterRender<T extends Node = Node> = ObserverFunction<T>;

export class Node extends Transform implements Iterable<Node> {
    public constructor(parent: Nullable<Node> = null) {
        super();

        parent?.add(this);
    }

    /** @internal */
    private internalRoot: Node = this;

    public get root(): Node {
        return this.internalRoot;
    }

    private internalParent: Nullable<Node> = null;

    public get parent(): Nullable<Node> {
        return this.internalParent;
    }

    public readonly children: Node[] = [];

    public get isEmpty(): boolean {
        return !this.children.length;
    }

    public has(...nodes: Nullable<Node>[]): boolean {
        for (const node of this) {
            if (nodes.includes(node)) {
                return true;
            }
        }

        return false;
    }

    public readonly onChildAddedObservable = new Observable<OnChildAdded<this>>();

    public onChildAdded(callback: OnChildAdded) {
        return this.onChildAddedObservable.add(callback);
    }

    public add(...nodes: Nullable<Node>[]): this {
        for (const node of nodes) {
            if (!node) continue;

            if (node == this) continue;

            if (node.has(this)) continue;

            node.removeFromParent();

            this.children.push(node);

            node.internalParent = this;
            node.internalRoot = this.root;

            this.traverseParents(
                parent => parent.onChildAddedObservable.dispatch({ dispatcher: parent, node }),
                true,
            );
        }

        return this;
    }

    public addUnSafe(...nodes: Nullable<Node>[]): this {
        for (const node of nodes) {
            if (!node) continue;

            node.removeFromParent();

            this.children.push(node);

            node.internalParent = this;
            node.internalRoot = this.root;

            this.traverseParents(
                parent => parent.onChildAddedObservable.dispatch({ dispatcher: parent, node }),
                true,
            );
        }

        return this;
    }

    public readonly onChildRemovedObservable = new Observable<OnChildRemoved<this>>();

    public onChildRemoved(callback: OnChildRemoved) {
        return this.onChildRemovedObservable.add(callback);
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
        const parent = this.parent;

        if (!parent) return this;

        const index = parent.children.indexOf(this);

        parent.children.splice(index, 1);

        this.internalParent = null;
        this.internalRoot = this;

        this.traverseParents(
            node =>
                node.onChildRemovedObservable.dispatch({
                    dispatcher: node,
                    child: this,
                    parent,
                }),
            true,
        );

        return this;
    }

    public clear(): this {
        for (const node of this.children) {
            node.removeFromParent();
        }

        return this;
    }

    public traverse(callback: (node: Node) => void, includeSelf: boolean = false): this {
        if (includeSelf) {
            callback(this);
        }

        for (const node of this) {
            callback(node);
        }

        return this;
    }

    public traverseParents(
        callback: (node: Node) => void,
        includeSelf: boolean = false,
    ): this {
        if (includeSelf) {
            callback(this);
        }

        if (this.parent) {
            this.parent.traverseParents(callback, true);
        }

        return this;
    }

    public readonly onBeforeRenderObservable = new Observable<OnBeforeRender<this>>();

    public onBeforeRender(callback: OnBeforeRender<this>) {
        return this.onBeforeRenderObservable.add(callback);
    }

    public readonly onAfterRenderObservable = new Observable<OnAfterRender<this>>();

    public onAfterRender(callback: OnAfterRender<this>) {
        return this.onAfterRenderObservable.add(callback);
    }

    public readonly worldMatrix = Matrix.identity();

    public computeWorldMatrix(updateParents = true, updateChildren = false): Matrix {
        if (this.parent) {
            if (updateParents) {
                this.parent.computeWorldMatrix(true, false);
            }

            this.worldMatrix.multiplyMatrices(this.parent.worldMatrix, this.localMatrix);
        } else {
            this.worldMatrix.copy(this.localMatrix);
        }

        if (updateChildren) {
            for (const child of this.children) {
                child.computeWorldMatrix(false, true);
            }
        }

        return this.worldMatrix;
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
