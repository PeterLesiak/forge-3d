import type { Type } from '@/Types/Type';

export enum LogLevel {
    None,

    Error,

    Warn,

    Info,

    Debug,

    Verbose,
}

export class Logger implements Type {
    public logLevel: LogLevel = LogLevel.Warn;

    public constructor(logLevel?: LogLevel) {
        if (logLevel) {
            this.logLevel = logLevel;
        }
    }

    public readonly store = {
        error: new Map<string, number>(),

        warn: new Map<string, number>(),

        info: new Map<string, number>(),

        debug: new Map<string, number>(),

        special: new Map<string, number>(),
    };

    public console: boolean = true;

    public error(message: string): this {
        if (this.logLevel < LogLevel.Error) return this;

        const count = this.store.error.get(message) ?? 0;

        if (!count && this.console) {
            console.log(
                `%c✖ ERROR%c${message}`,
                'font-size: 15px; font-weight: 600; color: black; background: #ef5350; border-radius: 2px; padding-inline: 5px; display: inline-flex;',
                'font-weight: 600; padding: 2px 5px; margin-left: 3px; display: inline-flex;',
            );
        }

        this.store.error.set(message, count + 1);

        return this;
    }

    public warn(message: string): this {
        if (this.logLevel < LogLevel.Warn) return this;

        const count = this.store.warn.get(message) ?? 0;

        if (!count && this.console) {
            console.log(
                `%c⚠ WARN%c${message}`,
                'font-size: 15px; font-weight: 600; color: black; background: #ffd500; border-radius: 2px; padding-inline: 5px; display: inline-flex;',
                'font-weight: 600; padding: 2px 5px; margin-left: 3px; display: inline-flex;',
            );
        }

        this.store.warn.set(message, count + 1);

        return this;
    }

    public info(message: string): this {
        if (this.logLevel < LogLevel.Info) return this;

        const count = this.store.info.get(message) ?? 0;

        if (!count && this.console) {
            console.log(
                `%ci INFO%c${message}`,
                'font-size: 15px; font-weight: 600; color: black; background: #42a7f0; border-radius: 2px; padding-inline: 5px; display: inline-flex;',
                'font-weight: 600; padding: 2px 5px; margin-left: 3px; display: inline-flex;',
            );
        }

        this.store.info.set(message, count + 1);

        return this;
    }

    public debug(message: string): this {
        if (this.logLevel < LogLevel.Info) return this;

        const count = this.store.debug.get(message) ?? 0;

        if (!count && this.console) {
            console.log(
                `%c⚙ DEBUG%c${message}`,
                'font-size: 15px; font-weight: 600; color: black; background: #d192e7; border-radius: 2px; padding-inline: 5px; display: inline-flex;',
                'font-weight: 600; padding: 2px 5px; margin-left: 3px; display: inline-flex;',
            );
        }

        this.store.debug.set(message, count + 1);

        return this;
    }

    public special(message: string): this {
        if (this.logLevel == LogLevel.None) return this;

        const count = this.store.special.get(message) ?? 0;

        console.log(
            `%cΞ FORGE3D%c${message}`,
            'font-size: 15px; font-weight: 600; color: black; background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%); border-radius: 2px; padding-inline: 5px; display: inline-flex;',
            'font-weight: 600; padding: 2px 5px; margin-left: 3px; display: inline-flex;',
        );

        this.store.special.set(message, count + 1);

        return this;
    }

    public get objectClassName(): string {
        return 'Logger';
    }

    public label: string = '';
}

export const logger = new Logger(LogLevel.Verbose);
