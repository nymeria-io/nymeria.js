# Nymeria

[![NPM Version](https://img.shields.io/npm/v/@nymeria/nymeria-js?style=flat-square)](https://www.npmjs.com/package/@nymeria/nymeria-js)

The official npm package to interact with the Nymeria's service. Nymeria
works in the browser and in Node itself. This package can be used to verify
email addresses, enrich profiles with contact information such as email
addresses, phone numbers and social links.

The npm package wraps Nymeria's [public API](https://www.nymeria.io/developers) so you don't have to.

![Nymeria makes finding contact details a breeze.](https://www.nymeria.io/assets/images/marquee.png)

## Browser

You can leverage unpkg to use Nymeria in the browser. This method should be
used with caution. Do not expose your Nymeria API key to end users. Use this
method if the environment is in your control or you have a secure method of
transferring the API key to your client.

### Installation

```html
<script src="https://unpkg.com/@nymeria/nymeria-js@latest/dist/index.js"></script>
```

### Usage

You can then use Nymeria within your webpage, browser plugin, electron app, etc. For example:

```javascript
let client = nymeria('YOUR API KEY GOES HERE');

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

client.verify('dev@nymeria.io').then(function (resp) {
  if (resp.status === 'success') {
    if (resp.result === 'valid') {
      console.log('Email is valid!');
    }
  }
});
```

## Node

All actions that interact with the Nymeria service assume an API key has been
set and will fail if a key hasn't been set. A key only needs to be set once and
can be set at the start of your program.

If you want to check a key's validity you can use the isAuthenticated
function to verify the validity of a key that has been set. If no error is
returned then the API key is valid.

### Installation

```bash
$ npm install nymeria@latest
```

### Usage

```javascript
let nymeria = require('@nymeria/nymeria-js');

let client = nymeria('YOUR API KEY GOES HERE');

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

## Verifying an Email Address

You can verify the deliverability of an email address using Nymeria's service.
The response will contain a result and tags.

The result will either be "valid" or "invalid". The tags will give you
additional details regarding the email address. For example, the tags will tell
you if the mail server connection was successful, if the domain's DNS records
are set up to send and receive email, etc.

## Enriching Profiles

You can enrich profiles using a number of different parameters:

1. `url` (address of a person's social media profile, like LinkedIn, Twitter, Facebook or Github)
2. `email` (a person's email address)
3. `identifier` (a numeric identifier, such as a LinkedIn member ID `lid:12345` or a Facebook ID `fid:12345`)

You can specify more than one parameter for each enrichment lookup. For
example,

```javascript
let nymeria = require('@nymeria/nymeria-js');

let client = nymeria('YOUR API KEY GOES HERE');

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

let client = nymeria('YOUR API KEY GOES HERE');

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

At this time, Nymeria supports look ups for the following sites:

1. LinkedIn
1. Facebook
1. Twitter
1. GitHub

Please note, if using LinkedIn urls provide the public profile
LinkedIn url.

Two other common parameters are filter and require. If you wish
to filter out professional emails (only receive personal
emails) you can do so by specifying "professional-emails"
as the filter parameter.

The require parameter works by requiring certain kinds of data.
For example, you can request an enrichment but only receive a
result if the profile contains a phone number (or an email,
personal email, professional email, etc). The following are
all valid requirements:

1. "email"
1. "phone"
1. "professional-email"
1. "personal-email"

You can specify multiple requirements by using
a comma between each requirement. For example
you can require a phone and personal email
with: "phone,personal-email" as the require
parameter.

## Searching for People

```javascript
let nymeria = require('@nymeria/nymeria-js');

let client = nymeria('YOUR API KEY GOES HERE');

client.people({ q: 'Ruby on Rails' }).then(preview => {
  let uuids = [];

  preview.data.forEach(person => {
      uuids.push(person.uuid);
  });

  client.reveal(uuids).then(person => {
    if (person.status === 'success') {
      person.data.forEach((match) => {
        console.log(match.bio);
        console.log(match.emails);
        console.log(match.phone_numbers);
        console.log(match.social);
      });
    }
  });
});
```

You can perform searches using Nymeria's database of people. The search works
using two functions:

1. `people` which performs a search and returns a preview of each person.
1. `reveal` which takes uuids of people and returns complete profiles.

Note, using people does not consume any credits but using reveal will
consume credit for each profile that is revealed.

The object parameter enables you to specify your search criteria. In
particular, you can specify:

1. `q` for general keyword matching text.
1. `location` to match a specific city or country.
1. `company` to match a current company.
1. `title` to match current titles.
1. `has_email` if you only want to find people that have email addresses.
1. `has_phone` if you only want to find people that has phone numbers.
1. `skills` if you are looking to match specific skills.

By default, 10 people will be returned for
each page of search results. You can
specify the page as part of your object if
you want to access additional pages of
people.

You can filter the search results and if
you want to reveal the complete details you
can do so by sending the uuids via reveal.
Please note, credit will be consumed for
each person that is revealed.

License
-------

[MIT](LICENSE)
