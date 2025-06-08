import type { Config } from '@react-router/dev/config';

export const basename =
    process.env.GITHUB_ACTIONS === 'true' ? '/molecule_playground/' : '/';

export default {
    // Config options...
    // Server-side render by default, to enable SPA mode set this to `false`
    ssr: false,
    prerender: true,
    basename
} satisfies Config;
