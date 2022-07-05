import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import * as os from 'os'
import { theme } from './src/utils/setAntTheme'

// 获取本机IP地址
const getIpAddress = function () {
  const interfaces = os.networkInterfaces()
  for (const devName in interfaces) {
    if (Object.hasOwnProperty.call(interfaces, devName)) {
      const iface = interfaces[devName]
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i]
        if (
          alias.family === 'IPv4' &&
          alias.address !== '127.0.0.1' &&
          !alias.internal
        ) {
          return alias.address
        }
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      // 配置选项
      cache: false // 禁用eslint缓存
    }),
    vueJsx({
      // 配置选项
    }),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: 'less' })],
      dirs: ['src/components'],
      extensions: ['vue'],
      dts: 'src/types/components.d.ts'
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n'],
      dts: 'src/types/auto-import.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      },
      less: {
        modifyVars: {
          ...theme
        },
        javascriptEnabled: true
      }
    }
  },
  server: {
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    host: getIpAddress() || '127.0.0.1' || 'localhost',
    port: 3000
  }
})
