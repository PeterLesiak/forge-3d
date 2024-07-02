import { build as tsup } from 'tsup';

/** @param {number} bytes */
const formatMegaBytes = (bytes, decimals = 2) => {
    const MEGA_BYTES = 1024 * 1024;

    const mb = (1 / MEGA_BYTES) * bytes;

    return `${mb.toFixed(decimals)} MB`;
};

/** @param {{name?: string, entry?: string}} params */
export const build = async ({ name = '@forge-3d/unknown', entry = 'src' } = {}) => {
    /** @type {{totalSize: number, files: number}[]} */
    const tracker = [];

    /** @type {import('tsup').Options} */
    const config = {
        name,
        entry: [`./${entry}/**/*.ts`],

        dts: true,
        format: ['esm', 'cjs'],
        minify: true,
        target: 'es2015',

        clean: true,
        outDir: 'build',

        plugins: [
            {
                name: 'filesize-tracker',
                buildEnd({ writtenFiles }) {
                    const totalSize = writtenFiles
                        .map(val => val.size)
                        .reduce((acc, val) => acc + val);

                    const files = writtenFiles.length;

                    tracker.push({ totalSize, files });
                },
            },
        ],
    };

    await tsup(config);

    /**
     * @param {string} name
     * @param {number} totalSize
     * @param {number} files
     * */
    const log = (name, totalSize, files) => {
        console.log(`[${name}] ${formatMegaBytes(totalSize)} | ${files} Files`);
    };

    console.log('\n[--NAME--] [-SIZE-] [-FILES-]\n');
    log('ESModule', tracker[0].totalSize, tracker[0].files);
    log('CommonJS', tracker[1].totalSize, tracker[1].files);
};
