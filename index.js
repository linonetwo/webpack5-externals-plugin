const ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers');
const ExternalModule = require('webpack/lib/ExternalModule');

class ExternalsPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const options = this.options;
    compiler.hooks.normalModuleFactory.tap('ExternalsPlugin', function (nmf) {
      nmf.hooks.resolve.tapAsync(
        {
          name: 'NormalModuleFactory',
          stage: 100,
        },
        function (module, callback) {
          if (ModuleFilenameHelpers.matchObject(options, module.createData.resource)) {
            const { context, dependencies } = module;
            const newModule = new ExternalModule(
              module.request,
              options.type || compiler.options.output.libraryTarget,
              module.createData.userRequest
            );
            callback(null, newModule);
          } else {
            callback(null);
          }
        }
      );
    });
  }
}

module.exports = ExternalsPlugin;
