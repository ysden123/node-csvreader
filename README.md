# node-csvreader
CSV file reader for NodeJS

## Usage

var csvReader = require('csv-reader');

function recordHandler(data){
  console.log(data[0],data[1]);
}

csvReader
  .read(csvFileName, recordHandler)
  .then(() => {
    rowCount.should.equal(rowAmount);
    done();
  })
  .catch(err => {
    done(err);
  });
## Dependencies
CSVReader uses package csv (https://github.com/wdavidw/node-csv)
