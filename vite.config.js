import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({       
//  plugins: [react()],
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'My App',
      short_name: 'App',
      start_url: '/index.html',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#333333',
      icons: [
        {
          src: 'vite.svg',
          sizes: '192x192',
          type: 'image/svg'
        },
        {
          src: 'vite.svg',
          sizes: '512x512',
          type: 'image/svg'
        }
      ]
    }
  })],
})