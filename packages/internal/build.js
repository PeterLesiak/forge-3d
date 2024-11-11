import { build as tsup } from 'tsup';

import { getTsFiles, formatMegaBytes } from './utils.js';

/** @param {string} directory */
export const build = async directory => {
    let totalSize = 0;
    let totalFiles = 0;

    const entry = await getTsFiles(directory);

    /** @type {import('tsup').Options} */
    const configuration = {
        entry,

        dts: true,
        format: 'esm',
        minify: true,
        platform: 'browser',
        target: 'es2015',

        clean: true,
        outDir: './build',

        plugins: [
            {
                name: 'build-analyzer',
                buildEnd({ writtenFiles }) {
                    totalSize += writtenFiles.reduce((acc, val) => acc + val.size, 0);

                    totalFiles += writtenFiles.length;
                },
            },
        ],
    };

    await tsup(configuration);

    console.log();
    console.log(`[📦️ FILES]: ${totalFiles}`);
    console.log(`[💾  SIZE]: ${formatMegaBytes(totalSize)}`);
    console.log();
};
