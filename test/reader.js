// Test for reader.
'use strict';

var csvReader = require('..');
var should = require('chai').should();
var path = require('path');
var util = require('util');
var fs = require('fs');
var os = require('os');

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

    describe('csvReader', function() {
        it('Should read and parse file', function(done) {
            let rowCount = 0;

            csvReader
                .read(csvFileName, (record) => {
                    record.should.have.length(columnAmount);
                    ++rowCount;
                })
                .then(() => {
                    rowCount.should.equal(rowAmount);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });

        it('Should skip 5 rows', function(done) {
            let rowCount = 0;

            csvReader
                .read(csvFileName, (record) => {
                    record.should.have.length(columnAmount);
                    ++rowCount;
                }, { skip: 5 })
                .then(() => {
                    rowCount.should.equal(rowAmount - 5);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });

        it('Should process header line', function(done) {
            let rowCount = 0;
            let headerColCount = 0;
            let options = {
                hasHeaders: true,
                headerRecordHandler: (data) => {
                    headerColCount = data.length;
                }
            };

            csvReader
                .read(csvFileName, (record) => {
                    record.should.have.length(columnAmount);
                    ++rowCount;
                }, options)
                .then(() => {
                    rowCount.should.equal(rowAmount - 1);
                    headerColCount.should.equal(columnAmount);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });

        it('Should process header line and skip', function(done) {
            let rowCount = 0;
            let headerColCount = 0;
            let options = {
                skip: 5,
                hasHeaders: true,
                headerRecordHandler: (data) => {
                    headerColCount = data.length;
                }
            };

            csvReader
                .read(csvFileName, (record) => {
                    record.should.have.length(columnAmount);
                    ++rowCount;
                }, options)
                .then(() => {
                    rowCount.should.equal(rowAmount - 5 - 1);
                    headerColCount.should.equal(columnAmount);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    });
});