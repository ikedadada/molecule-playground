import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { basename } from './react-router.config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
    const plugins = [tailwindcss(), tsconfigPaths()];
    // Only include React Router plugin during regular builds; Vitest
    // sets the VITEST environment variable and doesn't need routing.
    if (!process.env.VITEST) {
        plugins.unshift(reactRouter());
    }
    return {
        plugins,
        base: basename,
        test: {
            environment: 'jsdom',
            globals: true,
            setupFiles: ['./vitest.setup.ts'],
            alias: {
                '@': path.resolve(__dirname, 'app')
            }
        }
    };
});
