import commonjs from '@rollup/plugin-commonjs';
import visualizer from 'rollup-plugin-visualizer';
import pkg from './package.json';

export default [
  {
    input: './index.js',
    plugins: [commonjs(), visualizer()],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
];
