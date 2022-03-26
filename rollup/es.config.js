import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from 'rollup-plugin-terser';

export default {
  input: './esm/index.js',
  plugins: [
    nodeResolve(),
    commonjs(),
    terser()
  ],
  output: {
    esModule: false,
    file: './min.js',
    format: 'module'
  }
};
