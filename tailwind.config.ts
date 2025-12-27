import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      colors: {
        primary: {
          DEFAULT: '#1A1A1A',
          light: '#2C2C2C',
          muted: '#4A4A4A',
        },
        accent: {
          purple: '#6B4CE6',
          'purple-light': '#E8E0FF',
        },
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(180deg, #FFE5E5 0%, #F5E6FF 15%, #FFFFFF 35%)',
      },
    },
  },
  plugins: [],
};

export default config;

