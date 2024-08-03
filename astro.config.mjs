import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: 'https://devdanielch.github.io',
  base: '/feriados-brasil',
  output: "hybrid",
  integrations: [tailwind(), icon()]
});