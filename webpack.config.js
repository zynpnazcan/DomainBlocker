const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'domain-blocker-shell',
  remotes: {
    "mfe1": "http://localhost:4201/remoteEntry.js", 
    "mfe2": "http://localhost:4202/remoteEntry.js", 
    "mfe3": "http://localhost:4203/remoteEntry.js",
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: false, requiredVersion: 'auto' }),
    "@ngx-translate/core": { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    "@ngx-translate/http-loader": { singleton: true, strictVersion: false, requiredVersion: 'auto' }
  },
});
module.exports.output = {
  publicPath: "auto",
  scriptType: "text/javascript" 
};