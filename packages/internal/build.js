import { build as tsup } from 'tsup';

/** @param {number} bytes */
const formatMegaBytes = (bytes, decimals = 3) => {
    const MEGA_BYTES = 1024 * 1024;

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
        format: ['esm', 'cjs'],
        minify: true,
        target: 'es2015',

        clean: true,
        outDir: 'build',

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
