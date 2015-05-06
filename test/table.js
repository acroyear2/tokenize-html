var fs = require('fs');
var tokenize = require('..');
var through = require('through2');
var test = require('tap').test;

var expected = require(__dirname + '/expected.json');

test('table', function (t) {
  t.plan(expected.length);
  fs.createReadStream(__dirname + '/table.html')
    .pipe(tokenize())
    .pipe(through.obj(function (row, enc, cb) {
      var exp = expected.shift();
      t.deepEqual(row, exp);
      cb();
    }));
});