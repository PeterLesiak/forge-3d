import { transform } from '@swc/core';
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, extname } from 'node:path';

/**
 * @param {import('./types.d.ts').ProjectFile[]} projectFiles
 * @param {import('./types.d.ts').ProjectOptions} options
 * @returns {Promise<string[]>}
 */
export async function compileProject(projectFiles, options) {
    const compiledFiles = [];

    for (const projectFile of projectFiles) {
        const output = await transform(projectFile.code, {
            jsc: {
                parser: {
                    syntax: 'typescript',
                },
                baseUrl: process.cwd(),
                paths: options.importPaths,
                target: 'es2015',
                minify: {
                    compress: true,
                    mangle: true,
                },
            },
            minify: true,
        });

        const outputPath = transformOutputPath(
            projectFile.path,
            options.projectDirectory,
            options.outputDirectory,
        );

        await mkdir(dirname(outputPath), { recursive: true });
        await writeFile(outputPath, output.code);

        compiledFiles.push(output.code);
    }

    return compiledFiles;
}

/**
 * @param {string} path
 * @param {string} projectDirectory
 * @param {string} outputDirectory
 */
export function transformOutputPath(path, projectDirectory, outputDirectory) {
    const outputPathWrongExt = `${outputDirectory}${path.substring(projectDirectory.length)}`;
    const pathExtension = extname(outputPathWrongExt);
    const outputPath = `${outputPathWrongExt.substring(0, outputPathWrongExt.length - pathExtension.length)}.js`;

    return outputPath;
}
