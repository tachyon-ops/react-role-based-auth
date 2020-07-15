// const path = require('path');
// const pak = require('./package.json');

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['react-app'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            // For development, we want to alias the library to the source
            // [pak.name]: path.join(__dirname, '..', pak.source),
            'react-rb-auth': __dirname + '/src/lib',
          },
        },
      ],
    ],
  };
};
