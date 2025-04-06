import prettyMilliseconds from 'pretty-ms';
import prettyBytes from 'pretty-bytes';
import pc from 'picocolors';
import { mkdir } from 'node:fs/promises';

import { compileProject } from './compileProject.js';
import { generateDeclarations } from './generateDeclarations.js';
import { selectProjectFiles } from './selectProjectFiles.js';
import {
    printAsyncTask,
    printBarChart,
    printInfo,
    printSuccess,
    prettyfiyPath,
    getFilesSize,
} from './utils.js';

/**
 * @param {import('./types.d.ts').ProjectOptions} options
 */
export async function buildProject(options) {
    console.log();

    const projectDirectoryPretty = prettyfiyPath(options.projectDirectory);
    const outputDirectoryPretty = prettyfiyPath(options.outputDirectory);

    const [projectFiles, selectProjectFilesDuration] = await printAsyncTask(
        `Selecting project files from ${pc.yellow(projectDirectoryPretty)}`,
        async () => await selectProjectFiles(options.projectDirectory),
    );
    const projectSize = getFilesSize(projectFiles.map(file => file.code));
    printInfo(
        `Found ${pc.yellow(projectFiles.length)} file(s) of ${pc.yellow(prettyBytes(projectSize))}`,
    );

    const [, createOutputDirectoryDuration] = await printAsyncTask(
        `Creating output directory ${pc.yellow(outputDirectoryPretty)}`,
        async () => {
            await mkdir(options.outputDirectory, { recursive: true });
        },
    );

    const [compiledFiles, compileProjectDuration] = await printAsyncTask(
        `Compiling project files`,
        async () => await compileProject(projectFiles, options),
    );
    const compilationSize = getFilesSize(compiledFiles);
    printInfo(
        `Compiled into ${pc.yellow(prettyBytes(compilationSize))} of code`,
    );

    const [declarationFiles, generateDeclarationsDuration] =
        await printAsyncTask(
            `Generating declaration files`,
            async () => await generateDeclarations(projectFiles, options),
        );
    const declarationSize = getFilesSize(declarationFiles);
    printInfo(
        `Generated ${pc.yellow(prettyBytes(declarationSize))} of declarations`,
    );

    const totalDuration =
        selectProjectFilesDuration +
        createOutputDirectoryDuration +
        compileProjectDuration +
        generateDeclarationsDuration;

    const compilationRatio = compilationSize / projectSize;
    const compilationPercent = `${(compilationRatio * 100).toFixed(2)}%`;
    const declarationRatio = declarationSize / projectSize;
    const declarationPercent = `${(declarationRatio * 100).toFixed(2)}%`;

    console.log();
    printSuccess(
        `Build succeeded in ${pc.green(prettyMilliseconds(totalDuration))}`,
    );
    printInfo(
        `Build size: ${pc.yellow(prettyBytes(compilationSize))} + ${pc.blue(prettyBytes(declarationSize))} = ${pc.green(prettyBytes(compilationSize + declarationSize))} | Build files: ${pc.yellow(compiledFiles.length)} + ${pc.blue(declarationFiles.length)} = ${pc.green(compiledFiles.length + declarationFiles.length)}`,
    );
    printBarChart(
        `Minified (js)`,
        compilationRatio,
        compilationPercent.padStart(declarationPercent.length),
        pc.yellow,
    );
    printBarChart(
        'Declarations ',
        declarationRatio,
        declarationPercent.padStart(compilationPercent.length),
        pc.blue,
    );
    console.log();
}
