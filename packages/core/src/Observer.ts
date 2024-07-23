import type { Type } from '@/Types/Type';

export type ObserverFunction<T = any> = (event: T) => void;

export class Observer<T extends ObserverFunction> {
    public observable: Observable<T>;

    public callback: T;

    public constructor(observable: Observable<T>, callback: T) {
        this.observable = observable;
        this.callback = callback;
    }

    public remove(): void {
        this.observable.remove(this);
    }
}

export class Observable<T extends ObserverFunction> implements Type {
    /** @internal */
    private readonly observers: Observer<T>[] = [];

    public add(callback: T): Observer<T> {
        const observer = new Observer(this, callback);

        this.observers.push(observer);

        return observer;
    }

    public addFirst(callback: T): Observer<T> {
        const observer = new Observer(this, callback);

        this.observers.unshift(observer);

        return observer;
    }

    public remove(observer: Observer<T>): this {
        const index = this.observers.indexOf(observer);

        if (index >= 0) {
            this.observers.splice(index, 1);
        }

        return this;
    }

    public clear(): this {
        this.observers.length = 0;

        return this;
    }

    public dispatch(data: Parameters<T>[0]): this {
        for (const observer of this.observers) {
            observer.callback(data);
        }

        return this;
    }

    public label: string = '';
}
