# node-csvreader
CSV file reader for NodeJS

## Usage

Function `read` has arguments:
- csvFileName - the name of the CSV file
- recordHandler - function with 1 argument - array of record items
- options - optional, specifies addition requirements.

Object `options` has attributes (all attributes are optional):
- skip - specifies number of lines to skip
- hasHeaders - true, if CSV file has headers; false, if CSV file has not headers. If true, then line with headers will be ignored
- headerRecordHandler - function with 1 argument - array of header items

### Read all lines, no headers

```javascript
var csvReader = require('csv-reader');

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
var csvReader = require('csv-reader');

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
var csvReader = require('csv-reader');

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
## Dependencies
CSVReader uses package csv (https://github.com/wdavidw/node-csv)
