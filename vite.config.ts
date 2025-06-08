import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const repo = 'molecule_playground';
const base = process.env.GITHUB_ACTIONS === 'true' ? `/${repo}/` : '/';

export default defineConfig({
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    base
});
