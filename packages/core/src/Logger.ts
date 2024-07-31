import type { Type } from '@/Types/Type';
import type { Keys } from '@/Types/Utilities';

export type LogLevel = Keys<typeof LogLevel>;

export const LogLevel = {
    VERBOSE: 'VERBOSE',

    DEBUG: 'DEBUG',

    INFO: 'INFO',

    WARN: 'WARN',

    ERROR: 'ERROR',

    NONE: 'NONE',
} as const;

const LogValue = {
    VERBOSE: 0,

    DEBUG: 1,

    INFO: 2,

    WARN: 3,

    ERROR: 4,

    NONE: 5,
} as const;

export type LoggerMessage = {
    label?: string;
    scope?: string;
    message: string;
};

export class Logger implements Type {
    public logLevel: LogLevel = LogLevel.WARN;

    public constructor(logLevel?: LogLevel) {
        if (logLevel) {
            this.logLevel = logLevel;
        }
    }

    public readonly store = {
        debug: new Map<string, number>(),

        info: new Map<string, number>(),

        warn: new Map<string, number>(),

        error: new Map<string, number>(),

        special: new Map<string, number>(),
    };

    public console: boolean = true;

    public format(properties: {
        name?: string;
        theme?: string;
        label?: string;
        scope?: string;
        message: string;
    }): this {
        if (!this.console) return this;

        const name = properties.name ?? 'LOG';
        const theme = properties.theme ?? 'dodgerblue';
        const label = properties.label;
        const scope = properties.scope;
        const message = properties.message;

        const log: string[] = [
            `%c${name}${label ? `%c[${label}] ` : ''}${scope ? `%c${scope}: ` : ''}%c${message}`,
            `font-size: 15px; font-weight: 600; color: black; background: ${theme}; border-radius: 2px; padding-inline: 5px; margin-right: 6px; display: inline-flex;`,
        ];

        if (label) {
            log.push(
                'color: palegreen; font-weight: 600; margin-top: 2px; display: inline-flex;',
            );
        }

        if (scope) {
            log.push('color: cyan; font-weight: 600; margin-top: 2px; display: inline-flex;');
        }

        console.log(...log, 'font-weight: 600; margin-top: 2px; display: inline-flex;');

        return this;
    }

    public debug({ label, scope, message }: LoggerMessage): this {
        if (LogValue[this.logLevel] > LogValue[LogLevel.DEBUG]) return this;

        const count = this.store.debug.get(message) ?? 0;

        if (!count) {
            this.format({ name: '⚙ DEBUG', theme: '#d192e7', label, scope, message });
        }

        this.store.debug.set(message, count + 1);

        return this;
    }

    public info({ label, scope, message }: LoggerMessage): this {
        if (LogValue[this.logLevel] > LogValue[LogLevel.INFO]) return this;

        const count = this.store.info.get(message) ?? 0;

        if (!count) {
            this.format({ name: 'i INFO', theme: '#42a7f0', label, scope, message });
        }

        this.store.info.set(message, count + 1);

        return this;
    }

    public warn({ label, scope, message }: LoggerMessage): this {
        if (LogValue[this.logLevel] > LogValue[LogLevel.WARN]) return this;

        const count = this.store.warn.get(message) ?? 0;

        if (!count) {
            this.format({ name: '⚠ WARN', theme: '#ffd500', label, scope, message });
        }

        this.store.warn.set(message, count + 1);

        return this;
    }

    public error({ label, scope, message }: LoggerMessage): this {
        if (LogValue[this.logLevel] > LogValue[LogLevel.ERROR]) return this;

        const count = this.store.error.get(message) ?? 0;

        if (!count) {
            this.format({ name: '✖ ERROR', theme: '#ef5350', label, scope, message });
        }

        this.store.error.set(message, count + 1);

        return this;
    }

    public special({ label, scope, message }: LoggerMessage): this {
        if (LogValue[this.logLevel] == LogValue[LogLevel.NONE]) return this;

        const count = this.store.special.get(message) ?? 0;

        if (!count) {
            this.format({
                name: 'Ξ FORGE3D',
                theme: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
                label,
                scope,
                message,
            });
        }

        this.store.special.set(message, count + 1);

        return this;
    }

    public get objectClassName(): string {
        return 'Logger';
    }

    public label: string = '';
}

export const logger = new Logger(LogLevel.VERBOSE);
