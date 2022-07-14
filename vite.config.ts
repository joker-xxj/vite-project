import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path, { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'

import AutoImport from 'unplugin-auto-import/vite'

import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import * as os from 'os'
import { theme } from './src/utils/setAntTheme'
import { wrapperEnv } from './src/utils/getEnv'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 获取本机IP地址
const getIpAddress = function () {
  const interfaces = os.networkInterfaces()
  for (const devName in interfaces) {
    if (Object.hasOwnProperty.call(interfaces, devName)) {
      const iface = interfaces[devName] || []
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
export default defineConfig(({ mode }:ConfigEnv):UserConfig => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  return {
    plugins: [
      vue(),
      vueJsx({
        // 配置选项
      }),
      Components({
        resolvers: [AntDesignVueResolver({ importStyle: 'less', resolveIcons: true })],
        dirs: ['src/components'],
        extensions: ['vue'],
        dts: 'src/types/components.d.ts'
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
        dts: 'src/types/auto-import.d.ts',
        eslintrc: {
          enabled: true
        }
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: 'true; @import (reference) "@/assets/styles/variables.less";',
            ...theme
          },
          javascriptEnabled: true
        }
      }
    },
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    server: {
      proxy: {
        // // 选项写法
        '/ueagle': {
          target: `http://${getIpAddress()}:80`,
          changeOrigin: true
        }
      },
      host: getIpAddress() || '127.0.0.1' || 'localhost',
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true
    }
  }
})
