# atm-branch-finder 

[![Build Status](https://circleci.com/gh/ricardoschullerSL/atm-branch-finder.svg?style=shield)](https://circleci.com/gh/ricardoschullerSL/atm-branch-finder.svg?style=shield)
[![codecov](https://codecov.io/gh/ricardoschullerSL/atm-branch-finder/branch/master/graph/badge.svg)](https://codecov.io/gh/ricardoschullerSL/atm-branch-finder)


Implementation of Open Banking API

To get started, clone the repository to a folder:
```bash
git clone https://github.com/ricardoschullerSL/atm-branch-finder.git

npm install
```

To run hot loading webpack-dev-server: 
```bash
npm run dev
```

To run regular server:
```bash
webpack
node server
```

Then open localhost:8080



To run the tests:
```bash
npm run test
```
To update code coverage files:
```bash
nyc report --reporter=lcov > coverage.lcov
```

Still in early stages of development. 

### License

[MIT](/LICENSE.md)

