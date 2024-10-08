import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../../Backend/keys/privatekey.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../../Backend/keys/certificate.pem')),
    } as { key: Buffer; cert: Buffer },
    port: 5173,
    // Optional: set host to '0.0.0.0' if you want to access it over the local network
    // host: '0.0.0.0',
  },
});
