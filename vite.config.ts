import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
	console.log('⚓ ' + mode)
	return {
		root: './src',
		publicDir: '../public',
		base: mode === 'development' ? '/' : '/smooth-scrollbar/',
		build: {
			rollupOptions: {
				input: {
					home: path.resolve(__dirname, './src/index.html'),
					vertical: path.resolve(__dirname, './src/vertical/index.html'),
					horizontal: path.resolve(__dirname, './src/horizontal/index.html'),
				},
			},
			outDir: '../dist',
			emptyOutDir: true,
		},
		server: {
			host: true,
		},
	}
})
