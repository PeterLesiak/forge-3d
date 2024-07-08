import type { Nullable } from '@/Types/Utilities';
import { Observable, type Observer, type ObserverFunction } from '@/Observer';
import { Node } from '@/Node';

import { Geometry } from './Geometry';

export type OnGeometryChange = ObserverFunction<{ dispatcher: Mesh; previous: Mesh }>;

export class Mesh extends Node {
    public readonly onGeometryChangeObservable = new Observable<OnGeometryChange>();

    public onGeometryChange(callback: OnGeometryChange): Observer<OnGeometryChange> {
        return this.onGeometryChangeObservable.add(callback);
    }

    private _geometry: Geometry;

    public get geometry(): Geometry {
        return this._geometry;
    }

    public set geometry(value: Geometry) {
        const previous = this.clone();

        this._geometry = value;

        this.onGeometryChangeObservable.dispatch({ dispatcher: this, previous });
    }

    public constructor(geometry: Geometry, parent: Nullable<Node> = null) {
        super(parent);

        this._geometry = geometry;
    }

    public override copy(other: Mesh): this {
        super.copy(other);

        const previous = new Mesh(this.geometry.clone());

        this._geometry = other.geometry.clone();

        this.onGeometryChangeObservable.dispatch({ dispatcher: this, previous });

        return this;
    }

    public override clone(): Mesh {
        const mesh = new Mesh(this.geometry);

        mesh.copy(this);

        return mesh;
    }
}
