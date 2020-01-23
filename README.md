# gratitude-server

Express Server for a Gratitude Journal website.

## Installation

To install this program, fork or clone this repository and run the command:

```
npm i
```

This should install the dependencies.

## How To Use

To run the server, use the code:

```
npm start
```

### Routes

The following routes are defined for this server:

#### Entries

Gratitude journal entries

* GET entries/
* GET entries/:id
* POST entries/
* DELETE entries/:id
* PUT entries/:id


### Tests

The testing framework used for this backend is `Mocha`, with `Chai`.

To run all the tests, use the code:

```
npm test
```