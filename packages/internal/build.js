import { build as esbuild } from 'esbuild';
import { tsconfigPathsPlugin } from 'esbuild-plugin-tsconfig-paths';
import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';

import { rimraf } from 'rimraf';

export const build = async () => {
    /** @type {import('esbuild').BuildOptions} */
    const config = {
        entryPoints: ['./src/**/*.ts'],
        outdir: 'build',

        minify: true,
        bundle: true,
        format: 'esm',

        plugins: [
            esbuildPluginFilePathExtensions({ esmExtension: 'js' }),
            tsconfigPathsPlugin({ tsconfig: 'tsconfig.build.json' }),
        ],
    };

    await rimraf('build');

    const result = await esbuild(config);

    return result;
};
