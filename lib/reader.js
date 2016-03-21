// File reader
'use strict';

function fileReader(fileName, lineHandler) {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(fileName)
    });

    return lineReader.on('line', (line) => {
        lineHandler(line);
    });
}

module.exports.fileReader = fileReader;