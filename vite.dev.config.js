import { defineConfig, loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert'
// import react from '@vitejs/plugin-react'
// import svgr from 'vite-plugin-svgr';
import { fileURLToPath } from 'url' ;


const proxy = (host, path) => ({
  [path]: {
    target: `${host}${path}`,
    changeOrigin: true,
    secure: false,
    autoRewrite: true,
    rewrite: (p) => p.replace(new RegExp(`^${path}/?`), ''),
  },
})


export default defineConfig(async ({mode}) => {
  const env = loadEnv(mode, '.');
  const {VITE_USER_PANEL: user_panel} = env;
  console.log('vite config env is', env);
  return {
    server: {
      https: true,
      proxy:{
        ...proxy(user_panel, '/app'),
        ...proxy(user_panel, '/api'),
        ...proxy(user_panel, '/adm'),
      }
    },
    plugins: [
      mkcert(),
      // react({
      //   babel: { plugins: ['jotai/babel/plugin-react-refresh']}
      // }),
      // svgr(),
    ],
    resolve: {
      alias: {
        '#root': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
