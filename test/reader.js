// Test for reader.
'use strict';

var csvReader = require('..');

var fileReader = csvReader.fileReader('test1.csv', (line) => {
    console.log(line);
});