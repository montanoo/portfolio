// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

// ↓ Update this to your real production domain
const SITE = 'https://montano.me';

export default defineConfig({
    site: SITE,
    output: 'static',
    trailingSlash: 'always',
    integrations: [
        icon(),
        sitemap(),
    ],
    vite: {
        plugins: [tailwindcss()]
    }
});
