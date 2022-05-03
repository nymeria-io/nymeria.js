const https = require('https');

global.userAgent = 'nymeria.js/1.0.3';

module.exports = function (apiKey) {
  let request = (endpoint, body) => {
    if (!body) {
      body = {};
    }

    return new Promise((resolve, reject) => {
      let options = {
        hostname: 'www.nymeria.io',
        port: 443,
        path: `/api/v3/${endpoint}`,
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
          'Content-Type': 'application/json',
          'User-Agent': userAgent,
        },
      };

      const req = https.request(options, res => {
        var data = '';

        res.on('data', function (chunk) {
          data += chunk;
        });

        res.on('end', function () {
          resolve(JSON.parse(data));
        });
      });

      req.on('error', error => {
        reject(error);
      });

      req.write(JSON.stringify(body));
      req.end(); /* start the request */
    });
  };

  return {
    verify: function (email) {
      return request('verify', { email: email });
    },

    enrich: function (args) {
      if (Array.isArray(args)) {
        return request('bulk-enrich', { people: args });
      }

      return request('enrich', args);
    },

    isAuthenticated: function () {
      return request('check-authentication');
    },
  };
};
