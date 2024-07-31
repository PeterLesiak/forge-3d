import type { Seconds } from '@/Types/Scalar';
import type { Type } from '@/Types/Type';

const now = (): Seconds => performance.now() / 1000.0;

export class Timer implements Type {
    private internalIsRunning: boolean = false;

    public get isRunning(): boolean {
        return this.internalIsRunning;
    }

    private timestamp: Seconds = 0.0;

    private previousElapsedTime: Seconds = 0.0;

    private previousDeltaTime: Seconds = 0.0;

    public start(): this {
        this.internalIsRunning = true;

        this.timestamp = now() - this.previousElapsedTime;
        this.previousDeltaTime = now();

        return this;
    }

    public stop(): this {
        this.internalIsRunning = false;

        return this;
    }

    public get elapsedTime(): Seconds {
        if (!this.isRunning) {
            return this.previousElapsedTime;
        }

        const elapsedTime = now() - this.timestamp;

        this.previousElapsedTime = elapsedTime;

        return elapsedTime;
    }

    public get deltaTime(): Seconds {
        if (!this.isRunning) {
            return 0.0;
        }

        const now = performance.now() / 1000;

        const deltaTime = now - this.previousDeltaTime;

        this.previousDeltaTime = now;

        return deltaTime;
    }

    public get objectClassName(): string {
        return 'Timer';
    }

    public label: string = '';
}
