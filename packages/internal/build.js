import { build as tsup } from 'tsup';

const MEGA_BYTES = 1024 * 1024;

/** @param {number} bytes */
const formatMegaBytes = (bytes, decimals = 3) => {

    const mb = bytes / MEGA_BYTES;

    return `${mb.toFixed(decimals)} MB`;
};

export const build = async () => {
    let totalSize = 0;
    let totalFiles = 0;

    /** @type {import('tsup').Options} */
    const config = {
        entry: ['./src/**/*.ts'],

        dts: true,
        format: 'esm',
        minify: true,
        target: 'es2015',

        clean: true,
        outDir: 'build',
        sourcemap: true,

        plugins: [
            {
                name: 'filesize-metadata',
                buildEnd({ writtenFiles }) {
                    for (const { size } of writtenFiles) totalSize += size;

                    totalFiles += writtenFiles.length;
                },
            },
        ],
    };

    await tsup(config);

    console.log(`\n[⚡️SIZE ]: ${formatMegaBytes(totalSize)}`);
    console.log(`[⚡️FILES]: ${totalFiles}`);
};
