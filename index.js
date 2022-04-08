const https = require('https');

module.exports = function (apiKey) {
  return {
    verify: function (email, callback) {
      let options = {
        hostname: 'www.nymeria.io',
        port: 443,
        path: `/api/v3/verify`,
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
          'Content-Type': 'application/json',
          'User-Agent': 'nymeria.js/1.0.1',
        },
      };

      const req = https.request(options, res => {
        var data = '';

        res.on('data', function (chunk) {
          data += chunk;
        });

        res.on('end', function () {
          callback(JSON.parse(data), null);
        });
      });

      req.on('error', error => {
        callback(null, error);
      });

      req.write(JSON.stringify({ email: email }));
      req.end(); /* start the request */
    },

    enrich: function (args, callback) {
      if (Array.isArray(args)) {
        let options = {
          hostname: 'www.nymeria.io',
          port: 443,
          path: `/api/v3/bulk-enrich`,
          method: 'POST',
          headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json',
            'User-Agent': 'nymeria.js/1.0.1',
          },
        };

        const req = https.request(options, res => {
          var data = '';

          res.on('data', function (chunk) {
            data += chunk;
          });

          res.on('end', function () {
            callback(JSON.parse(data), null);
          });
        });

        req.on('error', error => {
          callback(null, error);
        });

        req.write(JSON.stringify({ people: args }));
        req.end(); /* start the request */

        return /* bail */;
      }

      let options = {
        hostname: 'www.nymeria.io',
        port: 443,
        path: `/api/v3/enrich`,
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
          'Content-Type': 'application/json',
          'User-Agent': 'nymeria.js/1.0.1',
        },
      };

      const req = https.request(options, res => {
        var data = '';

        res.on('data', function (chunk) {
          data += chunk;
        });

        res.on('end', function () {
          callback(JSON.parse(data), null);
        });
      });

      req.on('error', error => {
        callback(null, error);
      });

      req.write(JSON.stringify(args));
      req.end(); /* start the request */
    },

    isAuthenticated: function (callback) {
      let options = {
        hostname: 'www.nymeria.io',
        port: 443,
        path: `/api/v3/check-authentication`,
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
          'User-Agent': 'nymeria.js/1.0.1',
        },
      };

      const req = https.request(options, res => {
        var data = '';

        res.on('data', function (chunk) {
          data += chunk;
        });

        res.on('end', function () {
          callback(JSON.parse(data), null);
        });
      });

      req.on('error', error => {
        callback(null, error);
      });

      req.end(); /* start the request */
    },
  };
};
