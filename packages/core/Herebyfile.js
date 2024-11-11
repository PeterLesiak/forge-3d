import { task } from 'hereby';

import { build as internalBuild } from '@forge-3d/internal/build.js';

export const build = task({
    name: 'build',
    run: async () => {
        await internalBuild('./src');
    },
});
