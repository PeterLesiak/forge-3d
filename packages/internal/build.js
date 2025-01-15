import { build } from 'tsup';

import { readFilePaths } from './utils.js';

/**
 * @typedef {object} ProjectOptions
 * @property {string} [inDir]
 * @property {string} [outDir]
 */

/**
 * Builds the project
 * @param {ProjectOptions} options
 */
export async function buildProject(options = {}) {
    const inDir = options.inDir ?? './src';
    const outDir = options.outDir ?? './build';

    const filePaths = await readFilePaths(inDir);

    await build({
        entry: filePaths,
        clean: true,
        sourcemap: true,
        outDir,

        dts: true,
        format: 'esm',
        minify: true,
        platform: 'browser',
        target: 'es2015',
    });
}
