const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  name: 'mfe1',
  filename: 'remoteEntry.js', 
  exposes: {
    './Component': './src/app/domain-adder/domain-adder.component.ts',
  },
 shared: {
  ...shareAll({ 
    singleton: true, 
    strictVersion: false, 
    requiredVersion: false 
  }),
  "@ngx-translate/core": { singleton: false },
  "@ngx-translate/http-loader": { singleton: false },
  "@angular/core": { singleton: true, strictVersion: false },
  "@angular/common": { singleton: true, strictVersion: false },
  "@angular/platform-browser": { singleton: true, strictVersion: false },
  "@angular/router": { singleton: true, strictVersion: false },
  "@angular/forms": { singleton: true, strictVersion: false },
},
});

module.exports = {
  ...mfConfig,
  output: {
    uniqueName: "mfe1",
    publicPath: "http://localhost:4201/", 
    scriptType: "text/javascript",
  },
  devServer: {
    port: 4201,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};