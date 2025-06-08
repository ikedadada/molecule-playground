import type { Config } from '@react-router/dev/config';

export default {
    // Config options...
    // Server-side render by default, to enable SPA mode set this to `false`
    ssr: false,
    prerender: true,
    basename:
        process.env.GITHUB_ACTIONS === 'true' ? '/molecule_playground/' : '/'
} satisfies Config;
