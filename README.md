# node-csvreader
CSV file reader for NodeJS

## Installation

### From command line, npm

> npm install csvreader

### From command line, GitHub
Specific version:
> npm install https://github.com/ysden123/node-csvreader.git#v0.0.1  --save

Last version:
> npm install https://github.com/ysden123/node-csvreader.git  --save

### Dependencies in the package.json file

Specific version:
> "csvreader": "git+https://github.com/ysden123/node-csvreader.git#v0.0.1"

Last version:
> "csvreader": "git+https://github.com/ysden123/node-csvreader.git"

## Usage

Function `read` has arguments:
- csvFileName - the name of the CSV file
- recordHandler - function with 1 argument - array of record items
- options - optional, specifies addition requirements.

Object `options` has properties (all properties are optional):
- skip - specifies number of lines to skip
- hasHeaders - true, if CSV file has headers; false, if CSV file has not headers. If true, then line with headers will be ignored
- headerRecordHandler - function with 1 argument - array of header items
- parseOptions - object, specifies options for parser, see (http://csv.adaltas.com/parse/)

### Read all lines, no headers

```javascript
var csvReader = require('csvreader');

function recordHandler(data){
  console.log(data[0],data[1]);
}

csvReader
  .read(csvFileName, recordHandler)
  .then(() => {
    console.log('Done!');
  })
  .catch(err => {
    console.error(err);
  });
```

### Skip 5 lines, no headers

```javascript
var csvReader = require('csvreader');

function recordHandler(data){
  console.log(data[0],data[1]);
}

var options = {
  skip: 5
};

csvReader
  .read(csvFileName, recordHandler, options)
  .then(() => {
    console.log('Done!');
  })
  .catch(err => {
    console.error(err);
  });
```

### Read all lines, 1st line is headers, handle headers

```javascript
var csvReader = require('csvreader');

function recordHandler(data){
  console.log(data[0],data[1]);
}

function headerLineHandler(data){
  console.log(data[0],data[1]);
}

var options = {
  skip: 5,
  hasHeaders: true,
  headerRecordHandler: headerLineHandler
};

csvReader
  .read(csvFileName, recordHandler, options)
  .then(() => {
    console.log('Done!');
  })
  .catch(err => {
    console.error(err);
  });
```

### Read all lines, no headers, delimiter is tabulator

```javascript
var csvReader = require('csvreader');

function recordHandler(data){
  console.log(data[0],data[1]);
}

var options = {
    parseOptions: {
        delimiter: '\t'
    }
}

csvReader
  .read(csvFileName, recordHandler)
  .then(() => {
    console.log('Done!');
  }, options)
  .catch(err => {
    console.error(err);
  });
```

## Change log
### V1.0.0
Parse options were added.

## Dependencies
CSVReader uses package csv (https://github.com/wdavidw/node-csv)
