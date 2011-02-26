/*
  This test exercises JSInflate.inflateStream using node and writestreams. While the compressed data needs to be kept in memory, the uncompressed data is streamed out to a file.
*/

var fs = require('fs');
var JSInflate = require('./../../js-inflate')
  , assert = require('assert');

console.log(JSInflate);

testInflateStream = function() {
  uncompressedBlob = fs.readFileSync(__dirname + "/fixtures/uncompressed.bin", "binary");
  compressedBlob = fs.readFileSync(__dirname + "/fixtures/compressed.bin", "binary");

  var outputFile = '/tmp/test_data';

  JSInflate.inflateStream(compressedBlob, outputFile, function(bytesWritten) {
    assert.equal(bytesWritten, 4299);
    fs.readFile(outputFile, function (err, data) {
      if (err) throw err;
      assert.equal(data, uncompressedBlob);
      fs.unlink(outputFile, function(ulErr) {
         if (ulErr) throw ulErr;
         console.log("test complete");
      })
    });
  });
}

testInflateStream();