# tokenize-html

streaming html tokenizer.

Like [html-tokenize](https://github.com/substack/html-tokenize) but uses forgiving [htmlparser2](https://github.com/fb55/htmlparser2) underneath.

# example

``` js
var fs = require('fs');
var tokenize = require('tokenize-html');
var through = require('through2');

fs.createReadStream(__dirname + '/table.html')
  .pipe(tokenize())
  .pipe(through.obj(function (row, enc, next) {
    console.log(row);
    next();
  }))
;
```

this html:

``` html
<table cols=3>
  <tbody>blah blah blah</tbody>
  <tr><td>there</td></tr>
  <tr><td>it</td></tr>
  <tr><td bgcolor="blue">is</td></tr>
</table>
```

generates this output:

```
[ 'open', 'table', { cols: '3' } ]
[ 'text', '\n  ' ]
[ 'open', 'tbody', {} ]
[ 'text', 'blah blah blah' ]
[ 'close', 'tbody' ]
[ 'text', '\n  ' ]
[ 'open', 'tr', {} ]
[ 'open', 'td', {} ]
[ 'text', 'there' ]
[ 'close', 'td' ]
[ 'close', 'tr' ]
[ 'text', '\n  ' ]
[ 'open', 'tr', {} ]
[ 'open', 'td', {} ]
[ 'text', 'it' ]
[ 'close', 'td' ]
[ 'close', 'tr' ]
[ 'text', '\n  ' ]
[ 'open', 'tr', {} ]
[ 'open', 'td', { bgcolor: 'blue' } ]
[ 'text', 'is' ]
[ 'close', 'td' ]
[ 'close', 'tr' ]
[ 'text', '\n' ]
[ 'close', 'table' ]
[ 'text', '\n' ]
```

# api

## var t = tokenize()

Returns a transform stream that takes html input and produces rows of output.

The output rows are of the form:

* `[ name, tag|text [, attrs] ]`

The types of names are:

* open
* close
* text

# license

mit