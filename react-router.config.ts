import type { Config } from '@react-router/dev/config';

// GitHub Pages deployment requires a specific basename
export const basename =
    process.env.GITHUB_ACTIONS === 'true' ? '/molecule_playground/' : '/';

export default {
    // Config options...
    // Server-side render by default, to enable SPA mode set this to `false`
    ssr: false,
    prerender: true,
    basename
} satisfies Config;
