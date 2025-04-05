import { task } from 'hereby';

import { buildProject, cleanProject } from '@forge-3d/internal';

const projectDirectory = './src';
const outputDirectory = './build';
const importPaths = { '@/*': ['./src/*'] };

export const clean = task({
    name: 'clean',
    description: 'Cleans the build directory',
    run: async () => {
        await cleanProject(outputDirectory);
    },
});

export const build = task({
    name: 'build',
    description: 'Builds the project',
    dependencies: [clean],
    run: async () => {
        await buildProject({ projectDirectory, outputDirectory, importPaths });
    },
});
