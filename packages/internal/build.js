import { build as esbuild } from 'esbuild';
import { tsconfigPathsPlugin } from 'esbuild-plugin-tsconfig-paths';
import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';

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
    /** @type {import('esbuild').BuildOptions} */
    const config = {
        entryPoints: [`./${entryDir}/**/*.ts`],
        outdir,

        minify: true,
        bundle: true,
        format: 'esm',

        plugins: [
            esbuildPluginFilePathExtensions({ esmExtension: 'js' }),
            tsconfigPathsPlugin({ tsconfig: 'tsconfig.build.json' }),
        ],
    };

    await rimraf(outdir);

    const result = await esbuild(config);

    return result;
};
