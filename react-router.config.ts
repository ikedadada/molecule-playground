import type { Config } from '@react-router/dev/config';

// GitHub Pages deployment requires a specific basename
export const basename =
    process.env.GITHUB_ACTIONS === 'true' ? '/molecule_playground/' : '/';

export default {
    // Config options...
    // Server-side rendering is optional; set to `true` to enable SSR
    ssr: false,
    prerender: true,
    basename
} satisfies Config;
