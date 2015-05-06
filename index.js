var through = require('through2');
var Parser = require('htmlparser2');

module.exports = function () {
  var s = new Parser.WritableStream({
    onopentag: function () {
      tr.push(['open'].concat(Array.prototype.slice.apply(arguments)));
    },
    onclosetag: function (value) {
      tr.push(['close', value]);
    },
    ontext: function (value) {
      tr.push(['text', value]);
    }
  });
  var tr = through.obj(function (row, enc, cb) {
    s.write(row.toString(), enc, cb);
  });
  return tr;
};