import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteComponents, { AntDesignVueResolver } from 'vite-plugin-components'

import { defineConfig, UserConfigExport } from 'vite'
import path from 'path'
import { loadEnv } from 'vite'
import { createProxy } from './build/vite/proxy'
import { wrapperEnv } from './build/utils'
// 解析文件夹
function pathResolve(dir) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default ({ mode }): UserConfigExport => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const { VITE_PORT, VITE_PROXY } = wrapperEnv(env)
  return defineConfig({
    resolve: {
      alias: [
        {
          find: '@',
          replacement: pathResolve('src'),
        },
        {
          find: '#',
          replacement: pathResolve('types'),
        },
      ],
    },
    server: {
      host: true,
      port: VITE_PORT || 3000,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
    },
    plugins: [
      vue(),
      vueJsx(),
      viteComponents({
        globalComponentsDeclaration: pathResolve('./types/components.d.ts'),
        customComponentResolvers: [AntDesignVueResolver()],
      }),
    ],
  })
}
