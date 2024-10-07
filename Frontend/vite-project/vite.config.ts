import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'keys/privatekey.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'keys/certificate.pem')),
    },
    port: 5174, // Ensure this matches your desired port
  },
})



