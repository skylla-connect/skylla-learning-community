# pushid - Lexicographically ordered string IDs #

Modelled after https://gist.github.com/mikelehen/3596a30bd69384624c11 from
[Michael Lehenbauer](https://github.com/mikelehen) and an explanatory blog post is
[The 2^120 Ways to Ensure Unique Identifiers](https://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html).

This is close to what Firebase uses in their
[push IDs](https://firebase.google.com/docs/reference/js/firebase.database.Reference#push).

## Installation ##

[pushid](https://www.npmjs.com/package/pushid) can be installed from npm:

```sh
npm install pushid
```

## Synopsis ##

```js
var pushid = require('pushid')

console.log(pushid())
// -> "-KQ40rgB96epAE7LZH2W"

console.log(pushid())
// -> "-KQ42XiyWauJIUSNJZeg"
```

# Author #

Andrew Chilton:

* Website : [https://chilts.org/](https://chilts.org/)
* Email : [andychilton@gmail.com](mailto:andychilton@gmail.com)
* Twitter : [@andychilton](https://twitter.com/andychilton)
* GitHub : [chilts](https://github.com/chilts)

AppsAttic

* Website : [https://appsattic.com/](https://appsattic.com/)
* Email : [chilts@appsattic.com](mailto:chilts@appsattic.com)
* Twitter : [@AppsAtticLtd](https://twitter.com/AppsAtticLtd)
* GitHub : [appsattic](https://github.com/appsattic)

# License #

ISC.

(Ends)
