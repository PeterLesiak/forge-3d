import { build as tsup } from 'tsup';

const MEGA_BYTES = 1024 * 1024;

/** @param {number} bytes */
const formatMegaBytes = (bytes, decimals = 3) => {
    const mb = bytes / MEGA_BYTES;

    return `${mb.toFixed(decimals)} MB`;
};

/** @param {string} source */
export const build = async source => {
    let totalSize = 0;
    let totalFiles = 0;

    /** @type {import('tsup').Options} */
    const configuration = {
        entry: [`${source}/**/*.ts`],

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
    console.log(`[🗂️  FILES]: ${totalFiles}`);
    console.log(`[💾  SIZE]: ${formatMegaBytes(totalSize)}`);
    console.log();
};
