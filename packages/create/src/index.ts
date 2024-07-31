import { Preprocessor } from '@forge-3d/core/Shaders/Preprocessor';

const input = `\
#define FOO

#ifndef FOO
    no_1
#else
    yes_1
#endif

#undef FOO
#define FOO 50

#if defined(FOO) && FOO == 5 * 10
    yes_2
#else
    no_2
#endif

#if 2 == 2 + 2
    no_3_1
#elseif 1 - 1 || 1 + 1
    #if !defined(FOO)
        no_3_1_1
    #else
        yes_3
#else
    no_3_2
#endif`;

const preprocessor = new Preprocessor();
preprocessor.process(input);

console.log(preprocessor.processed);
