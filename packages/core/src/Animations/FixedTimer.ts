import type { Seconds } from '@/Types/Scalar';

import { Timer } from './Timer';

export class FixedTimer extends Timer {
    public frameRate: number = 60.0;

    public constructor(frameRate?: number) {
        super();

        if (frameRate) {
            this.frameRate = frameRate;
        }
    }

    public override get deltaTime(): Seconds {
        if (!this.isRunning) {
            return 0.0;
        }

        return 1.0 / this.frameRate;
    }

    public override get objectClassName(): string {
        return 'FixedTimer';
    }
}
