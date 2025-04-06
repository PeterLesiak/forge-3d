import pc from 'picocolors';
import { rm } from 'node:fs/promises';

import { printAsyncTask, prettyfiyPath } from './utils.js';

/**
 * @param {string} outputDirectory
 */
export async function cleanProject(outputDirectory) {
    console.log();

    const outputDirectoryPretty = prettyfiyPath(outputDirectory);

    await printAsyncTask(
        `Cleaning up ${pc.yellow(outputDirectoryPretty)}`,
        async () => {
            await rm(outputDirectory, { recursive: true, force: true });
        },
    );

    console.log();
}
