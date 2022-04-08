Nymeria
=======

The official npm package to interact with the Nymeria service and API.

Nymeria makes it easy to enrich data with contact information such as email
addresses, phone numbers and social links. The npm package wraps Nymeria's [public
API](https://www.nymeria.io/developers) so you don't have to.

Authentication
--------------

```javascript
  let nymeria = require('@nymeria/nymeria-js');

  let client = nymeria('API_KEY');

  client.isAuthenticated( (resp, error) => {
      if (error === null) {
        console.log(resp);
      }
  });
```

Verification
------------

```javascript
  let nymeria = require('@nymeria/nymeria-js');

  let client = nymeria('API_KEY');

  client.verify( 'bill@microsoft.com', (resp, error) => {
      if (error === null) {
        console.log(resp.status);
      }
  });
```

Enrichment
----------

```javascript
  let nymeria = require('@nymeria/nymeria-js');

  let client = nymeria('API_KEY');

  client.enrich( { url: 'github.com/nymeriaio' }, (resp, error) => {
      if (error === null) {
        console.log(resp.data.emails);
        console.log(resp.data.social);
      }
  });
```

Bulk Enrichment
---------------

```javascript
  let nymeria = require('@nymeria/nymeria-js');

  let client = nymeria('API_KEY');

  client.enrich( [{ url: 'github.com/nymeriaio' }, { url: 'github.com/dhh' } ], (resp, error) => {
      if (error === null) {
        console.log(resp.data.emails);
        console.log(resp.data.social);
      }
  });
```

License
-------

[MIT](LICENSE)
