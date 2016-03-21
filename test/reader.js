// Test for reader.
'use strict';
// var csvReader = require('../lib');
// var reader = csvReader.fileReader;

function lineHandler(line){
   console.log(line); 
}

// console.log(csvReader);
// console.log(reader);

// var fileReader = reader.fileReader('test1.csv', lineHandler);

// fileReader();

var reader = require('../lib/reader');
console.log(reader);
console.log(reader.fileReader);

// var fileReader = reader.fileReader('test1.csv', lineHandler);
var fileReader = reader.fileReader('test1.csv', (line)=>{
    console.log(line);
});