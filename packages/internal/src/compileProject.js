import { transformFile } from '@swc/core';
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, extname } from 'node:path';

/**
 * @param {string[]} projectFilePaths
 * @param {import('./types.d.ts').ProjectOptions} options
 */
export async function compileProject(projectFilePaths, options) {
    projectFilePaths.forEach(async filePath => {
        const output = await transformFile(filePath, {
            jsc: {
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
            filePath,
            options.projectDirectory,
            options.outputDirectory,
        );

        await mkdir(dirname(outputPath), { recursive: true });
        await writeFile(outputPath, output.code);
    });
}

/**
 * @param {string} filePath
 * @param {string} projectDirectory
 * @param {string} outputDirectory
 */
function transformOutputPath(filePath, projectDirectory, outputDirectory) {
    const invalidOutputPath = `${outputDirectory}${filePath.substring(projectDirectory.length)}`;
    const pathExtension = extname(invalidOutputPath);
    const outputPath = `${invalidOutputPath.substring(0, invalidOutputPath.length - pathExtension.length)}.js`;

    return outputPath;
}
