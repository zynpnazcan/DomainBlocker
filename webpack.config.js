const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  name: 'mfe2',
  filename: 'remoteEntry.js',
  exposes: {
   
    './Component': './src/app/domain-list/domain-list.component.ts',
  },

  shared: {
  ...shareAll({ 
    singleton: true, 
    strictVersion: false, 
    requiredVersion: false 
  }),
  "@angular/core": { singleton: true, strictVersion: false },
  "@ngx-translate/core": { singleton: true },
  "@ngx-translate/http-loader": { singleton: true },
  "@angular/common": { singleton: true, strictVersion: false },
  "@angular/platform-browser": { singleton: true, strictVersion: false },
  "@angular/router": { singleton: true, strictVersion: false },
  "@angular/forms": { singleton: true, strictVersion: false },
},
});


module.exports = {
  ...mfConfig,
  output: {
    uniqueName: "mfe2",
    publicPath: "http://localhost:4202/", 
    scriptType: "text/javascript",
  },
  devServer: {
    port: 4202,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};