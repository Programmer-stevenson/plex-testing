import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        plexura: {
          'deep-blue': '#0A1A2F',
          midnight: '#142D4C',
          azure: '#007BFF',
          teal: '#00C2CB',
          white: '#EAEAEA',
          gray: '#A0A7B0',
          mint: '#3EE4A8',
        },
      },
    },
  },
  plugins: [],
};

export default config;
