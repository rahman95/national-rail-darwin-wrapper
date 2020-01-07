# TS National Rail Wrapper

[![npm version](https://img.shields.io/npm/v/ts-national-rail-wrapper.svg?style=flat-square)](https://www.npmjs.org/package/ts-national-rail-wrapper)
[![npm downloads](https://img.shields.io/npm/dm/ts-national-rail-wrapper.svg?style=flat-square)](http://npm-stat.com/charts.html?package=ts-national-rail-wrapper)

✨Typescript promise based wrapper for National Rail SOAP API.

## Prerequisite

- Yarn 🧶

## Usage

- Apply for an `API_KEY` to be used with the API from [National Rail](http://realtime.nationalrail.co.uk/OpenLDBWSRegistration/)
- Require package using Yarn
- Use it 🚀

Yarn:
```
yarn add ts-national-rail-wrapper
```

Example Usage:
```js
const { NationalRailWrapper } = require("ts-national-rail-wrapper")

const apiKey = "****-****-****-****"
const nationalRail = new NationalRailWrapper(apiKey)

...

const results = await nationalRail.getDepartures({ station: "LDS", count: 5 })
```

## Methods

### getDepartures - Retrieve Departures for Station

```js
const options = { station: "LDS", count: 5 }
const results = await nationalRail.getDepartures(options)
```

### getArrivals - Retrieve Arrivals for Station

```js
const options = { station: "LDS", count: 5 }
const results = await nationalRail.getArrivals(options)
```

### getAll - Retrieve Both Departures and Arrivals for Station

```js
const options = { station: "LDS", count: 10 }
const results = await nationalRail.getAll(options)
```

### getServiceDetails - Retrieve Details about a certain Rail Service

```js
const options = { serviceId: "RAIL_SERVICE_001" }
const results = await nationalRail.getServiceDetails(options)
```

## Tests 

Currently tests will use the actual National Rail API to make calls and test data returned, this works but can cause the tests to be flaky due to the ever changing nature of data.

In an ideal situation these API results should be mocked to have the same behaviour all the time, this is a possible improvement I could make.

Tests make use of the `dotenv` lib which will look for an apiKey set in the `.env` file, please make sure that exists before running test

Once thats all set up run `yarn test` to start test suite

 ---
 <p align="center">
    🚂🚃🚃🚃🚃🚃✨
 </p>