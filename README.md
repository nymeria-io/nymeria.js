Nymeria
=======

[![NPM Version](https://img.shields.io/npm/v/@nymeria/nymeria-js?style=flat-square)](https://www.npmjs.com/package/@nymeria/nymeria-js)

The official npm package to interact with the Nymeria service and API.

Nymeria makes it easy to enrich data with contact information such as email
addresses, phone numbers and social links. The npm package wraps Nymeria's [public
API](https://www.nymeria.io/developers) so you don't have to.

![Nymeria makes finding contact details a breeze.](https://www.nymeria.io/assets/images/marquee.png)

Authentication
--------------

```javascript
  let nymeria = require('@nymeria/nymeria-js');

  let client = nymeria('API_KEY');

  client.isAuthenticated().then((resp) => {
      console.log(resp);
  });
```

Verification
------------

```javascript
  let nymeria = require('@nymeria/nymeria-js');

  let client = nymeria('API_KEY');

  client.verify('bill@microsoft.com').then((resp) => {
      console.log('It is good to use!');
  });
```

Enrichment
----------

```javascript
  let nymeria = require('@nymeria/nymeria-js');

  let client = nymeria('API_KEY');

  client.enrich({ url: 'github.com/nymeriaio'}).then((resp) => {
      console.log(resp.data.emails);
      console.log(resp.data.social);
  });
```

Bulk Enrichment
---------------

```javascript
  let nymeria = require('@nymeria/nymeria-js');

  let client = nymeria('API_KEY');

  client.enrich([{ url: 'github.com/nymeriaio' }, { url: 'linkedin.com/in/wozniaksteve' }]).then((resp) => {
      console.log(resp.data.emails);
      console.log(resp.data.social);
  });
```

License
-------

[MIT](LICENSE)
