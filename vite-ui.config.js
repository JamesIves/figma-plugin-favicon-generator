import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import {viteSingleFile} from 'vite-plugin-singlefile'

export default defineConfig(async () => {
  return {
    plugins: [react(), viteSingleFile()],
    build: {
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, 'src/ui/ui.html')
        }
      }
    }
  }
})
