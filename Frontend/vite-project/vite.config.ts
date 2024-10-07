import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../../Backend/keys/privatekey.pem')),  // Adjust the path if necessary
      cert: fs.readFileSync(path.resolve(__dirname, '../../Backend/keys/certificate.pem')),  // Adjust the path if necessary
    } as { key: Buffer; cert: Buffer },  // Specify the type explicitly
    port: 5173, // Ensure this matches your desired port
  },
});
