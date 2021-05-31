declare module 'webpack5-externals-plugin' {
  export default class ExternalsPlugin {
    constructor(options: {
      type?: 'var' | 'this' | 'commonjs' | 'commonjs2' | 'amd' | 'umd';
      test?: string | RegExp;
      include?: string | RegExp;
      exclude?: string | RegExp;
    });
  }
}
