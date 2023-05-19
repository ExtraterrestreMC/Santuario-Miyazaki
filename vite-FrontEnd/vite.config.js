import { defineConfig } from 'vite'
import fs from 'fs';
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
// import cercrt from fs.readFileSync('./SantuarioMiyazki.es+1.pem')
// import cerKey from fs.readFileSync('./SantuarioMiyazki.es+1-key.pem')

// https://vitejs.dev/config/
export default defineConfig({
    /**
     * Modificacion para Vite Para HTTPS
     */
    build: {
        chunkSizeWarningLimit: 1024,
    },
    server: {
        https: {
            key: fs.readFileSync('./certificadosSSL/www.SatuarioMiyazaki.com+2-key.pem'),
            cert: fs.readFileSync('./certificadosSSL/www.SatuarioMiyazaki.com+2.pem'),
            ca: fs.readFileSync("./certificadosSSL/rootCA.pem")
        }

    },

    plugins: [react()],
})