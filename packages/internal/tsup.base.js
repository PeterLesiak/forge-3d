import { defineConfig } from 'tsup';

let metadatas = [];

/** @param {string} name */
export const makeConfig = name => {
    return defineConfig({
        name,
        entry: ['./src/**/*.ts'],

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
                    let totalSize = 0.0;

                    for (const { size } of writtenFiles) {
                        totalSize += size;
                    }

                    const mb = totalSize * 0.000001;

                    metadatas.push({ totalSize: mb.toFixed(3), count: writtenFiles.length });
                },
            },
        ],

        onSuccess() {
            const esm = metadatas[0];
            const cjs = metadatas[1];

            console.log(`ESM | ${esm.totalSize} MB [${esm.count} Files]`);
            console.log(`CJS | ${cjs.totalSize} MB [${cjs.count} Files]`);
            console.log(
                `BOTH | ${+esm.totalSize + +cjs.totalSize} MB [${esm.count + cjs.count} Files]`,
            );
        },
    });
};
