@agen/gzip
===========

This package contains methods providing async generators deflating / inflating
(gzipping / gunzipping) binary input blocks:

* [deflate](#deflate-method) method returns an async generator compressing ("deflating") input blocks
* [inflate](#inflate-method) de-compresses ("inflates") binary blocks

This module uses the `pako` package (the MIT license) to inflate/deflate streams:
https://github.com/nodeca/pako.

`inflate` method
----------------

This method decompress (inflates) binary data retunred by the input async
generators.
This method is based on the `pako.Inflate` class.

Parameters:
* `options` - optional parameters (see the `pako.Inflate` class)

Example: get binary data from the specified URL:
```javascript

import { createReadStream } from 'fs';
import * as agen from '@agen/gzip';

const options = {}; // not required
const f = agen.inflate(options);

// Streams in NodeJS are also async generators providing binary blocks
const input = createReadStream('./myfile.gz');
for await (let chunk of f(input)) {
  console.log('*', chunk);
}

```

`deflate` method
----------------

This method returns an async generator compressing (deflating) binary blocks
comming from the input async generator (input stream).

This method is based on the `pako.Deflate` class.

Parameters:
* `options` - optional parameters (see the `pako.Deflate` class)

Example:
```javascript

import { createReadStream } from 'fs';
import { deflate } from '@agen/gzip';

const options = {};
const f = agen.deflate(options);

// Streams in NodeJS are also async generators providing binary blocks
let input = createReadStream('./myfile.pdf');
for await (let chunk of f(input)) {
  console.log('*', chunk);
}
```
