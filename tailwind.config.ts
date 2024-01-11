import type { Config } from 'tailwindcss';
import flowbite from 'flowbite/plugin';
const colors = require('tailwindcss/colors');
const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/flowbite-react/lib/**/*.js',
		'./src/lib/*.{js,jsx,ts,tsx,vue}'
	],

	mode: 'jit',
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '900px',
			xl: '1440px'
		},

		colors: {
			primaryBgLight: colors.sky[700],
			primaryBgDark: colors.gray[900],
			navbarBgDark: colors.gray[800],
			navbarBgLight: colors.sky[600],
			formBgLight: colors.gray[50],
			formBgDark: colors.gray[700],
			borderLight: colors.gray[200],
			borderDark: colors.sky[500],
			buttonDark: colors.gray[600],
			buttonHover: colors.gray[400]
		},
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif']
		},
		extend: {
			spacing: {
				128: '32rem',
				144: '36rem'
			},
			borderRadius: {
				'4xl': '2rem'
			}
		}
	},
	plugins: [flowbite]
};
export default config;
