import { build as esbuild } from 'esbuild';
import { tsconfigPathsPlugin } from 'esbuild-plugin-tsconfig-paths';

import { rimraf } from 'rimraf';

/**
 * @typedef configuration
 * @prop {string} entryDir
 * @prop {string} outdir
 */

/**
 * @param {configuration} params
 */
export const build = async ({ entryDir = 'src', outdir = 'build' } = {}) => {
    const config = {
        entryPoints: [`./${entryDir}/**/*.ts`],
        outdir,

        minify: true,
        format: 'esm',

        plugins: [tsconfigPathsPlugin({ tsconfig: 'tsconfig.build.json' })],
    };

    await rimraf(outdir);

    const result = await esbuild(config);

    return result;
};
