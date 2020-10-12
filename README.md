# skylla-learning-community
Scale up the code quality standard across African young developers and make a meaningful impact on helping young people to learn coding 24/7 anywhere in Africa. 

Folder Structure
================

Please note
------------

Typically we will follow this folder structure to guide us.

Motivations
-----------

- Clear feature ownership
- Module usage predictibility (refactoring, maintainence, you know
  what's shared, what's not, prevents accidental regressions,
  avoids huge directories of not-actually-reusable modules, etc)
- CI runs only the tests that matter (future)
- Code splitting (future)

How it works
------------

The file structure maps directly to the route hierarchy, which maps
directly to the UI hierarchy.

It's inverted from the model that we've used in other systems. If we
consider all folders being either a "generic" or a "feature" folder, we
only have one "feature" folder but many "generic" folders.

Examples of "feature" folders:

server
- static
- index.py

client
- Admin
- Users
- Live support

Examples of "generic" folders:

- components
- helpers
- stores
- actions

Given this route config:

```js
var routes = (
  <Route name="App">
    <Route name="Admin">
      <Route name="Users"/>
      <Route name="Reports"/>
    </Route>
    <Route name="Course">
      <Route name="Assignments"/>
    </Route>
  </Route>
);
```

We would now set up our directories like this:

```
server
├── static
│   └── static
│   └── asset-manifest.json
│   └── index.html
│   └── manifest.json
│   └── service-worker.js
|   ... etc.
├── index.py

```
client
└── src
    └── App
        └── screens
            ├── Admin
            │   └── Dashboard
            │       ├── Reports
            │       └── Users
            |       └── Interviews
            |       └── Hire
            |       └── Announcements
            └── Module
            |   └── screens
            |       └── Assessments
            |       └── Quiz & Tests
            |       └── Sessions
            |       └── Class
            └── Support
            |   └── screens
            |       └── General
            |       └── Product & Services
            |       └── Purchase
            |       └── Code & Debug
            └── Cart
                └── screens
                    └── Module
                    └── Purchase
                    └── Confirm
```

Next, each of these screens has an `index.js` file, which is the file
that handles the entry into the screen, also known as a "Route Handler"
in react router. Its very much like a `Route` in Ember. We'll also have
some top-level application bootstrapping stuff at the root, like
`config/routes.js`.

```
client
├── config
│   └── routes.js
├── src
│   └── App
│       ├── screens
│       │   ├── Admin
│       │   │   ├── Dashboard
│       │   │   │   ├── Reports
│       │   │   │   │   └── index.js
│       │   │   │   └── Users
│       │   │   │   │   └── index.js
|       |   |   |   └── Interviews
|       |   |   |       └── index.js
|       |   |   |   └── Hire
|       |   |   |       └── index.js
|       |   |   |   └── Announcements
|       |   |   |       └── index.js
│       │   │   └── index.js
│       │   └── Module
│       │   |   ├── screen 
│       │   |   │   └── Assignments
│       │   |   │   |   └── index.js
│       │   |   │   └── Quiz & Tests
│       │   |   │   |   └── index.js
│       │   |   │   └── Sessions
│       │   |   │   |   └── index.js
│       │   |   │   └── Class
│       │   |   │       └── index.js
│       │   |   └── index.js
│       │   └── Support
│       │   |   ├── screen 
│       │   |   │   └── General
│       │   |   │   |   └── index.js
│       │   |   │   └── Product & Services
│       │   |   │   |   └── index.js
│       │   |   │   └── Purchase
│       │   |   │   |   └── index.js
│       │   |   │   └── Code & Debug
│       │   |   │       └── index.js
│       │   |   └── index.js
│       │   └── Cart
│       │       ├── screen 
│       │       │   └── Module
│       │       │   |   └── index.js
│       │       │   └── Purchase
│       │       │   |   └── index.js
│       │       │   └── Confirm
│       │       │      └── index.js
│       │       └── index.js
│       └── index.js
└── index.js
```

With this structure, each screen has its own directory to hold its
modules. In other words, we've introduced "scope" into our application
file structure.

Each will probably have a `components` directory.

```
client
├── config
│   └── routes.js
├── src
│   └── App
│       ├── components
│       ├── screens
│       │   ├── Admin
│       │   │   ├── components
│       │   │   ├── screens
│       │   │   │   ├── Reports
│       │   │   │   │   ├── components
│       │   │   │   │   └── index.js
│       │   │   │   └── Users
│       │   │   │   │   ├── components  
│       │   │   │   |   └── index.js
│       │   │   │   └── Interviews
│       │   │   │   |   ├── components
│       │   │   │   |   └── index.js
│       │   │   │   └── Hire
│       │   │   │       ├── components
│       │   │   │       └── index.js
|       |   |   |   └── Announcements
│       │   │   │       ├── components
|       |   |   |       └── index.js
│       │   │   └── index.js
│       │   └── Module
│       │   |   ├── components
│       │   |   ├── screens
│       │   |   │   └── Assignments
│       │   |   │   |   ├── components
│       │   |   │   |   └── index.js
│       │   |   │   └── Quiz & Tests
│       │   |   │   |   ├── components
│       │   |   │   |   └── index.js
│       │   |   │   └── Sessions
│       │   |   │   |   ├── components
│       │   |   │   |   └── index.js
│       │   |   │   └── Class
│       │   |   │       ├── components
│       │   |   │       └── index.js
│       │   |   └── index.js
│       │   └── Support
│       │   |   ├── components
│       │   |   ├── screens
│       │   |   │   └── General
│       │   |   │   |   ├── components
│       │   |   │   |   └── index.js
│       │   |   │   └── Product & Services
│       │   |   │   |   ├── components
│       │   |   │   |   └── index.js
│       │   |   │   └── Purchase
│       │   |   │   |   ├── components
│       │   |   │   |   └── index.js
│       │   |   │   └── Code & Debug
│       │   |   │       ├── components
│       │   |   │       └── index.js
│       │   |   └── index.js
│       │   └── Cart
│       │       ├── components
│       │       ├── screens
│       │       │   └── Module
│       │       │   |   ├── components
│       │       │   |   └── index.js
│       │       │   └── Purchase
│       │       │   |   ├── components
│       │       │   |   └── index.js
│       │       │   └── Confirm
│       │       │   |   ├── components
│       │       │   |   └── index.js
│       │       └── index.js
│       └── index.js
└── index.js
```

These components are used *only in the current screen*, not even the
child screens. So what about when you've got some shared components
between screens?

### Shared Modules

Every screen also has a "shared" generic directory. If its children
share any components with each other or the parent, we put the shared
code in "shared". Here is our growing app with some new shared, and not
shared modules.

```
client
├── config
│   └── routes.js
├── src
│   └── App
│       ├── components
│       ├── screens
│       │   ├── Admin
│       │   │   ├── components
│       │   │   ├── screens
│       │   │   │   ├── Reports
│       │   │   │   │   ├── components
│       │   │   │   │   ├── stores
│       │   │   │   │   │   └── ReportsStore.js
│       │   │   │   │   └── index.js
│       │   │   │   └── Users
│       │   │   │   |   ├── components
│       │   │   │   |   └── index.js
│       │   │   │   └── Interviews
│       │   │   │   |   ├── components
│       │   │   │   |   └── index.js
│       │   │   │   └── Hire
│       │   │   │   |   ├── components
│       │   │   │   |   └── index.js
|       |   |   |   └── Announcements
│       │   │   │       ├── components
|       |   |   |       └── index.js
│       │   │   ├── shared
│       │   │   │   └── stores
│       │   │   │       ├── AccountStore.js
│       │   │   │       └── UserStore.js
│       │   │   └── index.js
│       │   └── Module
│       │   |   ├── components
│       │   |   ├── screens
│       │   |   │   └── Assignments
│       │   |   │   |   ├── components
│       │   |   │   |   └── index.js
│       │   |   │   └── Quiz & Tests
│       │   |  │   |   ├── components
│       │   |  │   |   └── index.js
│       │   |  │   └── Sessions
│       │   |  │   |   ├── components
│       │   |  │   |   └── index.js
│       │   |  │   └── Class
│       │   |  │       ├── components
│       │   |  │       └── index.js
│       │   |  └── index.js
│       │   └── Support
│       │   |   ├── components
│       │   |   ├── screens
│       │   |   │   └── General
│       │   |   │   |   ├── components
│       │   |   │   |   └── index.js
│       │   |   │   └── Product & Services
│       │   |   │   |   ├── components
│       │   |   │   |   └── index.js
│       │   |   │   └── Purchase
│       │   |   │   |   ├── components
│       │   |   │   |   └── index.js
│       │   |   │   └── Code & Debug
│       │   |   │       ├── components
│       │   |   │       └── index.js
│       │   |   └── index.js
│       │   └── Cart
│       │       ├── components
│       │       ├── screens
│       │       │   └── Module
│       │       │   |   ├── components
│       │       │   |   └── index.js
│       │       │   └── Purchase
│       │       │   |   ├── components
│       │       │   |   └── index.js
│       │       │   └── Confirm
│       │       │   |   ├── components
│       │       │   |   └── index.js
│       │       └── index.js
│       ├── shared
│       │   └── components
│       │       ├── Avatar.js
│       │       └── Icon.js
│       └── index.js
├── shared
│   └── util
│       └── createStore.js
└── index.js
```

Note `Admin/shared`; `Reports` and `Users` can both access the shared
stores. Additionally, every screen in the app can use `Avatar.js` and `Icon.js`.

We put shared components in the nearest `shared` directory possible and
move it toward the root as needed.

### Shared module resolution

The way modules in CommonJS are resolved is pretty straightforward in
practice: its all relative from the current file.

There is one piece of "magic" in the way modules resolve. When you do a
non-relative require like `require('moment')` the resolver will first
try to find it in `node_modules/moment`. If its not there, it will look
in `../node_modules/moment`, and on up the tree until it finds it.

We've made it so that `shared` resolves the same way with webpack
`modulesDirectories`. This way you don't have to
`require('../../../../../../../../../../shared/Avatar')` you can simply
do `require('components/Avatar')` no matter where you are.

### Tests

Tests live next to the modules they test. Tests for
`shared/util/createStore.js` live in `shared/util/__tests__/createStore.test.js`.

Now our app has a bunch of `__tests__` directories:

```
client
├── __tests__
├── config
│   └── routes.js
├── src
│   └── App
│       ├── components
│       │   ├── __tests__
│       │   │   └── AppView.test.js
│       │   └── AppView.js

... etc.

├── shared
│   └── util
│       ├── __tests__
│       │   └── createStore.test.js
│       └── createStore.js
└── index.js
```

### Why "Screens"?

The other option is "views", which has become a lot like "controller".
What does it even mean? Screen seems pretty intuitive to me to mean "a
specific screen in the app" and not something that is shared. It has the
added benefit that there's no such thing as an "MSC" yet, so the word
"screen" causes people to ask "what's a screen?" instead of assuming
they know what a "view" is supposed to be.


# Setup


* locate the project folder: 
`cd skylla-learning-community`

* Locate the client folder:
`cd client`

* Install node packages and dependencies: 
`npm install`

* Run tests
`npm test`

* In the server folder, run;
`cd server`

NOTE: 
If you get into a situation where npm install found some vulnerabilities that needs to be fixed.
run;
`npm audit fix`

* Start server and the client application

`python index.py`

Point your browser to `http://127.0.0.1:5000/`

## Important: 

Make sure your running `python index.py` in the project folder where there is the server (index.py) serving our client, not in the client folder.

- And to see the changes, run `npm run build`, then restart the server.
