import { rm } from 'node:fs/promises';

/**
 * @param {string} outputDirectory
 */
export async function cleanProject(outputDirectory) {
    await rm(outputDirectory, { recursive: true, force: true });
}
