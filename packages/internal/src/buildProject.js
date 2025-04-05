import { glob } from 'glob';
import { mkdir } from 'node:fs/promises';

import { compileProject } from './compileProject.js';
import { generateDeclarations } from './generateDeclarations.js';

/**
 * @param {import('./types.d.ts').ProjectOptions} options
 */
export async function buildProject(options) {
    const projectFilePaths = await selectProjectFiles(options.projectDirectory);

    await mkdir(options.outputDirectory, { recursive: true });

    await compileProject(projectFilePaths, options);
    await generateDeclarations(projectFilePaths, options);
}

/**
 * @param {string} directory
 */
async function selectProjectFiles(directory) {
    const filePaths = await glob(`${directory}/**/*.ts`);

    return filePaths.map(path => `./${path}`);
}
