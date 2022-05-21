Nymeria
=======

[![NPM Version](https://img.shields.io/npm/v/@nymeria/nymeria-js?style=flat-square)](https://www.npmjs.com/package/@nymeria/nymeria-js)

The official npm package to interact with the Nymeria service and API. Nymeria
works in the browser and in Node itself. This package can be used to verify
email addresses and enrich profiles in bulk or one at a time.

Nymeria makes it easy to enrich data with contact information such as email
addresses, phone numbers and social links. The npm package wraps Nymeria's [public
API](https://www.nymeria.io/developers) so you don't have to.

![Nymeria makes finding contact details a breeze.](https://www.nymeria.io/assets/images/marquee.png)

Browser
-------

You can leverage unpkg to use Nymeria in the browser. Simply include the
browser compatible script:

```html
<script src="https://unpkg.com/@nymeria/nymeria-js@1.0.3/dist/index.js"></script>
```

You can then use Nymeria within your webpage, electron app, etc. For example:

```javascript
let client = nymeria('ny_apikey');

client.isAuthenticated().then(function () {
  console.log('OK!'); /* api key is valid */
});

client.enrich({ url: 'github.com/nymeriaio' }).then(function (resp) {
  if (resp.status === 'success') {
    console.log(resp.data.bio);
    console.log(resp.data.emails);
    console.log(resp.data.phone_numbers);
    console.log(resp.data.social);
  }
});

client.verify('bill@microsoft.com').then(function (resp) {
  if (resp.status === 'success') {
    if (resp.result === 'valid') {
      console.log('Email is valid!');
    }
  }
});
```

Node
----

```javascript
let nymeria = require('@nymeria/nymeria-js');

let client = nymeria('ny_apikey');

client.isAuthenticated().then(function () {
  console.log('OK!'); /* api key is valid */
});

client.enrich({ url: 'github.com/nymeriaio' }).then(function (resp) {
  if (resp.status === 'success') {
    console.log(resp.data.bio);
    console.log(resp.data.emails);
    console.log(resp.data.phone_numbers);
    console.log(resp.data.social);
  }
});

client.verify('bill@microsoft.com').then(function (resp) {
  if (resp.status === 'success') {
    if (resp.result === 'valid') {
      console.log('Email is valid!');
    }
  }
});
```

Enrichment
----------

You can enrich profiles using a number of different parameters:

1. `url` (address of a person's social media profile, like LinkedIn, Twitter, Facebook or Github)
2. `email` (a person's email address)
3. `identifier` (a numeric identifier, such as a LinkedIn member ID `lid:12345` or a Facebook ID `fid:12345`)

You can specify more than one parameter for each enrichment lookup. For
example,

```javascript
let nymeria = require('@nymeria/nymeria-js');

let client = nymeria('ny_apikey');

client.enrich({ url: 'github.com/nymeriaio', email: 'someone@nymeria.io', identifier: 'fid:12345' }).then(function (resp) {
  if (resp.status === 'success') {
    console.log(resp.data.bio);
    console.log(resp.data.emails);
    console.log(resp.data.phone_numbers);
    console.log(resp.data.social);
  }
});
```

Enrichments can be made in bulk. You can simply pass multiple look up objects
to `enrich`. For example:

```javascript
let nymeria = require('@nymeria/nymeria-js');

let client = nymeria('ny_apikey');

client.enrich([{ url: 'github.com/nymeriaio' }, { email: 'steve@woz.org' }, { identifier: 'fid:12345' }]).then((resp) => {
  if (resp.status === 'success') {
    resp.data.forEach((match) => {
      console.log(match.result.bio);
      console.log(match.result.emails);
      console.log(match.result.phone_numbers);
      console.log(match.result.social);
    });
  }
});
```

### Search for People

You can query Nymeria's people database for people that match a certain
criteria. You can view previews for each person and "unlock" the complete
profile.

Currently, you can query using any of the following parameters:

1. `q` a raw query which will match keywords in a person's name, title, skills,
   etc.
2. `first_name`
3. `last_name`
4. `title`
5. `company`
6. `skills` a comma separated list of skills.
7. `location` city, state, country, etc.
8. `country` matches country only.

```javascript
let nymeria = require('@nymeria/nymeria-js');

let client = nymeria('ny_apikey');

client.people({ q: 'Ruby on Rails' }).then(preview => {
  let uuids = [];

  preview.data.forEach(person => {
      uuids.push(person.uuid);
  });

  client.reveal(uuids).then(person => {
    if (person.status === 'success') {
      person.data.forEach((match) => {
        console.log(match.result.bio);
        console.log(match.result.emails);
        console.log(match.result.phone_numbers);
        console.log(match.result.social);
      });
    }
  });
});
```

License
-------

[MIT](LICENSE)
