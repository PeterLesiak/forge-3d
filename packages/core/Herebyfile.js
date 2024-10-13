import { build as internalBuild } from '@forge-3d/internal/build.js';
import { task } from 'hereby';

export const build = task({
    name: 'build',
    run: async () => {
        await internalBuild('./src');
    },
});
