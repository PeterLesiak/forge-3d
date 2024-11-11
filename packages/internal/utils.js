import { readdir } from 'node:fs/promises';

const MEGA_BYTES = 1024 * 1024;

/** @param {number} bytes */
export const formatMegaBytes = (bytes, decimals = 3) => {
    const mb = bytes / MEGA_BYTES;

    return `${mb.toFixed(decimals)} MB`;
};

/** @param {string} directory */
export const getTsFiles = async directory => {
    const filesAndDirs = await readdir(directory, { recursive: true });

    const tsAndDts = filesAndDirs.filter(path => /.?(\.ts)$/.test(path));

    const tsFiles = tsAndDts.filter(path => !/.?(\.d\.ts)$/.test(path));

    return tsFiles.map(file => `${directory}/${file}`);
};
