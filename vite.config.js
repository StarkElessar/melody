import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
	root: path.resolve(__dirname, 'src'),
	base: './',
	publicDir: path.resolve(__dirname, 'public'),
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@fonts': path.resolve(__dirname, 'public/fonts')
		}
	},
	build: {
		outDir: path.resolve(__dirname, 'dist'),
		emptyOutDir: true,
		rollupOptions: {
			input: path.resolve(__dirname, 'src/index.html')
		}
	}
});
