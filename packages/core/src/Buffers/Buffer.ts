import type { ObserverFunction } from '@/Observer';

import type { IntegerBuffer } from './IntegerBuffer';
import type { Integer2Buffer } from './Integer2Buffer';
import type { Integer3Buffer } from './Integer3Buffer';
import type { Integer4Buffer } from './Integer4Buffer';
import type { UIntegerBuffer } from './UIntegerBuffer';
import type { UInteger2Buffer } from './UInteger2Buffer';
import type { UInteger3Buffer } from './UInteger3Buffer';
import type { UInteger4Buffer } from './UInteger4Buffer';
import type { FloatBuffer } from './FloatBuffer';
import type { Float2Buffer } from './Float2Buffer';
import type { Float3Buffer } from './Float3Buffer';
import type { Float4Buffer } from './Float4Buffer';

export type Buffer =
    | IntegerBuffer
    | Integer2Buffer
    | Integer3Buffer
    | Integer4Buffer
    | UIntegerBuffer
    | UInteger2Buffer
    | UInteger3Buffer
    | UInteger4Buffer
    | FloatBuffer
    | Float2Buffer
    | Float3Buffer
    | Float4Buffer;

export type OnBufferUpdate<T extends Buffer = Buffer> = ObserverFunction<{
    dispatcher: T;
    previous: T;
}>;
