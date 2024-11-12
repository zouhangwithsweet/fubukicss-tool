import { defineConfig } from 'rolldown'

export default defineConfig({
  input: './plugin/index.ts',
  output: {
    format: 'esm',
    dir: './plugin/lib',
    minify: true,
  },
})
