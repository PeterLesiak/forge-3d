import { glob } from 'glob';

/**
 * Finds file paths recursively in a specified directory
 * @param {string} dir relative path to directory
 * @returns {Promise<string[]>} Array of file paths, relative to `dir`
 */
export async function readFilePaths(dir) {
    const contents = await glob(`${dir}/**`, { nodir: true });

    return contents.map(path => `./${path}`);
}
