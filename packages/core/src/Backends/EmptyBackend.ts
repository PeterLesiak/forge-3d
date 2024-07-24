import type { Backend } from './Backend';

export class EmptyBackend implements Backend {
    public initialize(): boolean {
        return true;
    }

    public get objectClassName(): string {
        return 'EmptyBackend';
    }

    public label: string = '';
}
