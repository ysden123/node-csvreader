// Test for reader.
'use strict';

var csvReader = require('..');
var should = require('chai').should();
var path = require('path');
var util = require('util');
var fs = require('fs');
var os = require('os');
// var expect = require('chai').expect;

// var fileReader = csvReader.reader('./data/test1.csv', (record) => {
//     console.log(record);
// });

// console.log();

// var fileReaderWithSkip = csvReader.reader('test1.csv', (record) => {
//     console.log(record);
// }, {skip: 5});

// describe('reader', function() {
//     it('should be string', function(){
//        var s  ='123';
//        expect(s).to.be.string;
//     });
// });

describe('reader', function() {
    let csvFileName;
    let rowAmount = 10;
    let columnAmount = 5;

    // Create CSV file for tests.
    before(function() {
        csvFileName = path.join(os.tmpdir(), 'test.csv');
        if (fs.existsSync(csvFileName)) {
            fs.unlinkSync(csvFileName);
        }
        var output = fs.createWriteStream(csvFileName);
        for (let r = 1; r <= rowAmount; ++r) {
            let buf = '';
            for (let c = 1; c <= columnAmount; ++c) {
                if (c > 1)
                    buf += ',';
                buf += '"';
                buf += util.format('column %d%d', r, c);
                buf += '"';
            }
            buf += '\n';
            output.write(buf);
        }
        output.end();
        console.log(csvFileName);
    });

    after(function() {
        if (fs.existsSync(csvFileName)) {
            fs.unlinkSync(csvFileName);
        }
    });

    describe('read', function() {
        it('Should read and parse file', function() {
            let rowCount = 0;
            csvReader.read(csvFileName, (record) => {
                record.should.have.length(columnAmount);
                ++rowCount;
                console.log('==> rowCount = %d, rowAmount = %d', rowCount, rowAmount);
            });
            // rowCount.should.equal(rowAmount);
            console.log('==> rowCount = %d, rowAmount = %d', rowCount, rowAmount);
        });
    });
});