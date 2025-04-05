import * as ts from 'typescript';
import { fileURLToPath } from 'node:url';

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
 * @param {string[]} projectFilePaths
 * @param {import('./types.d.ts').ProjectOptions} options
 */
export async function generateDeclarations(projectFilePaths, options) {
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

    const program = ts.createProgram({
        rootNames: projectFilePaths,
        options: compilerOptions,
        host,
    });
    program.emit();
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
