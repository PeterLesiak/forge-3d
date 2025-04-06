import { glob } from 'glob';
import { readFile } from 'node:fs/promises';

/**
 * @param {string} directory
 * @returns {Promise<import('./types.d.ts').ProjectFile[]>}
 */
export async function selectProjectFiles(directory) {
    const paths = await glob(`${directory}/**/*.ts`, { dotRelative: true });
    const projectFiles = [];

    for (const path of paths) {
        if (isDTSFile(path)) continue;

        const code = await readFile(path, { encoding: 'utf-8' });

        projectFiles.push({ code, path });
    }

    return projectFiles;
}

/**
 * @param {string} path
 */
export function isDTSFile(path) {
    return /\.d\.ts$/.test(path);
}
