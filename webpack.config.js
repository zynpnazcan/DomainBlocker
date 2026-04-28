const { share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  name: 'domain-logs-mfe',
  filename: "remoteEntry.js",
  exposes: {
   './LogsComponent': './src/app/logs/logs.component.ts',
  },
  shared: share({
    "@angular/core": { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    "@angular/common": { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    "@angular/common/http": { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    "@angular/router": { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    "@ngx-translate/core": { singleton: true, strictVersion: false, requiredVersion: false }, 
    "@ngx-translate/http-loader": { singleton: true, strictVersion: false, requiredVersion: false }
  }),
});

module.exports = {
  ...mfConfig,
  output: {
    ...mfConfig.output,
    publicPath: 'http://localhost:4203/'
  }
};