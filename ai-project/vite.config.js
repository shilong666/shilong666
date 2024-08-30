import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import postcssPxtoRem from 'postcss-pxtorem';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log('---env', env, mode);
  return defineConfig({
    plugins: [
      vue(),
      // jsx for vue
      vueJsx(),
      // svgicon
      createSvgIconsPlugin({
        // process.cwd()会返回一个nodejs进程的当前目录
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        symbolId: 'svg-icon-[dir]-[name]'
      })
    ],
    resolve: {
      alias: {
        // __dirname Node全局变量，标识被执行的js文件的目录
        '@': path.resolve(__dirname, './src')
      }
    },
    hostname: '127.0.0.1',
    port: 3000,
    // 是否自动在浏览器打开
    open: true,
    // 是否开启 https
    https: false,
    // 服务端渲染
    ssr: false,
    /**
     * 在生产中服务时的基本公共路径。
     * @default '/'
     */
    base: env.VITE_ROUTER_BASE || '/',
    /**
     * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
     * @default 'dist'
     */
    outDir: 'dist',
    build: {
      minify: 'terser', //  混淆器，terser构建后文件体积更小
      cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      reportCompressedSize: false, // 警用gzip压缩发小报告
      terserOptions: {
        compress: {
          drop_console: true, // 生产移除console
          drop_debugger: true // 生产移除debuggers
        },
        output: {
          // 去掉注释内容
          comments: true
        }
      },
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'chunks/[name].[hash].js',
          entryFileNames: 'js/[name].[hash].js',
          manualChunks(id) {
            // id为文件绝对路径
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          }
        }
      }
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        [env.VITE_BASE_API]: {
          // target: 'http://47.106.97.171/stage-api',
          target: 'http://47.106.22.239/stage-api',
          changeOrigin: true,
          rewrite: (path) => {
            const api = env.VITE_BASE_API;
            const _api = new RegExp(api, 'g');
            console.log('proxy url result', path.replace(_api, ''));
            return path.replace(_api, '');
          }
        }
      }
    }
  });
};
