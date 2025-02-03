const https = require("https");

/* used to identify the library with Nymeria's server */
global.userAgent = "nymeria.js/1.2.0";

module.exports = function(apiKey) {
  let request = (method, endpoint, payload) => {
    if (!payload) {
      payload = {};
    }

    return new Promise((resolve, reject) => {
      const accept = "application/json";

      let headers = {
        "X-Api-Key": apiKey,
        "User-Agent": userAgent,
      };

      headers["Accept"] = accept;

      if (method === "POST") {
        headers["Content-Type"] = accept;
      }

      let options = {
        protocol: "https:",
        hostname: "www.nymeria.io",
        port: 443,
        path: `/api/v4/${endpoint}`,
        method: method,
        headers: headers,
      };

      if (method !== "POST") {
        options.path =
          options.path + "?" + new URLSearchParams(payload).toString();
      }

      const req = https.request(options, (res) => {
        if (
          res.headers["content-type"] &&
          res.headers["content-type"] !== accept
        ) {
          reject({
            error: true,
            message: "Unknown response format.",
            developers:
              "It's likely the API was in maintenance mode or you hit your account's rate limit.",
          });

          return; /* bail out */
        }

        var data = "";

        res.on("data", function(chunk) {
          data += chunk;
        });

        res.on("end", function() {
          resolve(JSON.parse(data));
        });
      });

      req.on("error", (error) => {
        reject({
          error: true,
          message: error,
          developers:
            "An error happened while receiving data. Perhaps the network disconnected?",
        });
      });

      if (payload) {
        req.write(JSON.stringify(payload));
      }

      req.end();
    });
  };

  return {
    company: {
      enrich: (args) => {
        return request("GET", "company/enrich", args);
      },
      search: (args) => {
        return request("GET", "company/search", args);
      },
    },

    email: {
      verify: (email) => {
        return request("GET", "email/verify", { email: email });
      },
      bulk_verify: (args) => {
        return request("POST", "email/verify/bulk", { requests: args });
      },
    },

    person: {
      enrich: (args) => {
        return request("GET", "person/enrich", args);
      },
      bulk_enrich: (args) => {
        return request("POST", "person/enrich/bulk", { requests: args });
      },
      preview: (args) => {
        return request("GET", "person/enrich/preview", args);
      },
      retrieve: (id) => {
        return request("GET", `person/retrieve/${id}`, {});
      },
      bulk_retrieve: (args) => {
        return request("POST", "person/retrieve/bulk", { requests: args });
      },
      search: (args) => {
        return request("GET", "person/search", args);
      },
    },
  };
};
