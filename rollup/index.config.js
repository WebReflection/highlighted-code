import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './esm/index.js',
  plugins: [
    nodeResolve(),
    commonjs()
  ],
  output: {
    esModule: false,
    file: './index.js',
    format: 'module'
  }
};
