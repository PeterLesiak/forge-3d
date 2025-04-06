import * as ts from 'typescript';
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const baseCompilerOptions = getConfigCompilerOptions('../tsconfig.base.json');
/** @type {ts.CompilerOptions} */
const compilerPlugins = {
    plugins: [
        // @ts-ignore
        ...(baseCompilerOptions.plugins ?? []),
        {
            transform: 'typescript-transform-paths',
            afterDeclarations: true,
        },
    ],
};

/**
 * @param {import('./types.d.ts').ProjectFile[]} projectFiles
 * @param {import('./types.d.ts').ProjectOptions} options
 * @returns {Promise<string[]>}
 */
export async function generateDeclarations(projectFiles, options) {
    /** @type {ts.CompilerOptions} */
    const compilerOptions = {
        ...baseCompilerOptions,
        ...compilerPlugins,
        outDir: options.outputDirectory,
        paths: options.importPaths,
        declaration: true,
        emitDeclarationOnly: true,
        noEmit: false,
    };

    const host = ts.createCompilerHost(compilerOptions);

    /** @type {import('./types.d.ts').ProjectFile[]} */
    const declarationFiles = [];

    host.writeFile = (fileName, text) => {
        declarationFiles.push({ code: text, path: fileName });
    };

    const program = ts.createProgram({
        rootNames: projectFiles.map(file => file.path),
        options: compilerOptions,
        host,
    });
    program.emit();

    for (const { code, path } of declarationFiles) {
        await mkdir(dirname(path), { recursive: true });
        await writeFile(path, code);
    }

    return declarationFiles.map(file => file.code);
}

/**
 * @param {string} configPath
 */
function getConfigCompilerOptions(configPath) {
    const tsconfigPath = fileURLToPath(import.meta.resolve(configPath));

    const { config } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
    const { options } = ts.convertCompilerOptionsFromJson(
        config.compilerOptions,
        process.cwd(),
    );

    return options;
}
