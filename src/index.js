const https = require('https');

/* used to identify the library with Nymeria's server */
global.userAgent = 'nymeria.js/1.0.5';

module.exports = function (apiKey) {
  let request = (endpoint, body, method) => {
    if (!method) {
      method = 'POST';
    }

    if (!body) {
      body = {};
    }

    return new Promise((resolve, reject) => {
      let options = {
        hostname: 'www.nymeria.io',
        port: 443,
        path: `/api/v3/${endpoint}`,
        method: method,
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

      req.end();
    });
  };

  return {
    /* works on single email addresses at the moment */
    verify: function (email) {
      return request('verify', { email: email });
    },

    /* handles single enrichment and bulk enrichment seamlessly */
    enrich: function (args) {
      if (Array.isArray(args)) {
        return request('bulk-enrich', { people: args });
      }

      return request('enrich', args);
    },

    isAuthenticated: function () {
      return request('check-authentication');
    },

    people: function (query) {
      return request('people', query, 'GET');
    },

    reveal: function (uuids) {
      return request('people', { uuids: uuids });
    },
  };
};
