# atm-branch-finder 

[![Build Status](https://circleci.com/gh/ricardoschullerSL/atm-branch-finder.svg?style=shield)](https://circleci.com/gh/ricardoschullerSL/atm-branch-finder.svg?style=shield)
[![codecov](https://codecov.io/gh/ricardoschullerSL/atm-branch-finder/branch/master/graph/badge.svg)](https://codecov.io/gh/ricardoschullerSL/atm-branch-finder)


Implementation of Open Banking API

To get started, clone the repository to a folder:
```bash
git clone https://github.com/ricardoschullerSL/atm-branch-finder.git

npm install
```

To run hot loading webpack-dev-server (used to change CSS): 
```bash
npm run dev
```

To run regular server:
```bash
webpack && node server
```

 (it is possible modify your `etc/hosts` file to add a psuedonym for localhost: 'mockserver.com' so your browser will keep different set of permissions for this app only)
 

Then go to `https://localhost:8080` (or `https://mockserver.com:8080` if you've added it to `etc/hosts`) 

Note that this app includes a self-signed certificate in the server/ssl folder. Do not use this in production, this is just for running it locally so you can share your location with the app.

To run the tests:
```bash
npm run test
```
To update code coverage files:
```bash
nyc report --reporter=lcov > coverage.lcov
```
or 
```bash
npm run cov
```

To run the linter:
```bash
npm run lint
```

Still in early stages of development. 

### License

[MIT](/LICENSE.md)

