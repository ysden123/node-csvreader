// Test for reader.
'use strict';

var csvReader = require('..');
var should = require('chai').should();
var path = require('path');
var util = require('util');
var fs = require('fs');
var os = require('os');

describe('reader', function() {
    let csvFileName1 = path.join(os.tmpdir(), 'test1.csv');
    let csvFileName2 = path.join(os.tmpdir(), 'test2.csv');
    let rowAmount = 10;
    let columnAmount = 5;

    // Create CSV file for tests.
    before(function() {
        function createTestFile(csvFileName, delimiter) {
            if (fs.existsSync(csvFileName)) {
                fs.unlinkSync(csvFileName);
            }
            var output = fs.createWriteStream(csvFileName);
            for (let r = 1; r <= rowAmount; ++r) {
                let buf = '';
                for (let c = 1; c <= columnAmount; ++c) {
                    if (c > 1)
                        buf += delimiter;
                    buf += '"';
                    buf += util.format('column %d%d', r, c);
                    buf += '"';
                }
                buf += '\n';
                output.write(buf);
            }
            output.end();
        }
        createTestFile(csvFileName1, ',');
        createTestFile(csvFileName2, '\t');
    });

    after(function() {
        if (fs.existsSync(csvFileName1)) {
            fs.unlinkSync(csvFileName1);
        }
        if (fs.existsSync(csvFileName2)) {
            fs.unlinkSync(csvFileName2);
        }
    });

    describe('csvReader', function() {
        it('Should read and parse file', function(done) {
            let rowCount = 0;

            csvReader
                .read(csvFileName1, (record) => {
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
                .read(csvFileName1, (record) => {
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
                .read(csvFileName1, (record) => {
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
                .read(csvFileName1, (record) => {
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

        it('Should read and parse file (tab)', function(done) {
            let rowCount = 0;
            let options = {
                parseOptions: {
                    delimiter: '\t'
                }
            };

            csvReader
                .read(csvFileName2, (record) => {
                    record.should.have.length(columnAmount);
                    ++rowCount;
                }, options)
                .then(() => {
                    rowCount.should.equal(rowAmount);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });

        it('Should skip 5 rows (tab)', function(done) {
            let rowCount = 0;
            let options = {
                skip: 5,
                parseOptions: {
                    delimiter: '\t'
                }
            };

            csvReader
                .read(csvFileName2, (record) => {
                    record.should.have.length(columnAmount);
                    ++rowCount;
                }, options)
                .then(() => {
                    rowCount.should.equal(rowAmount - 5);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });

        it('Should process header line (tab)', function(done) {
            let rowCount = 0;
            let headerColCount = 0;
            let options = {
                hasHeaders: true,
                headerRecordHandler: (data) => {
                    headerColCount = data.length;
                },
                parseOptions: {
                    delimiter: '\t'
                }
            };

            csvReader
                .read(csvFileName2, (record) => {
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

        it('Should process header line and skip (tab)', function(done) {
            let rowCount = 0;
            let headerColCount = 0;
            let options = {
                skip: 5,
                hasHeaders: true,
                headerRecordHandler: (data) => {
                    headerColCount = data.length;
                },
                parseOptions: {
                    delimiter: '\t'
                }
            };

            csvReader
                .read(csvFileName2, (record) => {
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