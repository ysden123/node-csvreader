// Test for reader.
'use strict';

var csvReader = require('..');

var fileReader = csvReader.reader('test1.csv', (record) => {
    console.log(record);
});