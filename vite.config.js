import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
	root: path.resolve(__dirname, 'src'),
	publicDir: path.resolve(__dirname, 'assets'),
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@fonts': path.resolve(__dirname, 'assets/fonts')
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

