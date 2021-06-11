import tape from "tape-await";
import * as agen from '../dist/esm/agen-gzip-esm.js';

testData(['']);
testData(['a']);
testData(['Hello, world']);
testData(['Hello', ',', 'world']);
testData(generateStrings(1, 10, 100));
testData(generateStrings(10, 10, 100));
testData(generateStrings(100, 10, 100));
testData(generateStrings(500, 10, 100));
testData(generateStrings(1000, 10, 100));
testData(generateStrings(1000, 10, 1024));
testData(generateStrings(1000, 10, 10 * 1024));

function testData(data) {
  const len = data.reduce((sum, block) => sum += block.length, 0);
  tape(`deflate/inflate: should be able to pack/unpack ${len} bytes`, async function(t) {
    // this.timeout(30000);
    let gen = data;
    gen = toBuffers(gen);
    gen = agen.deflate()(gen);
    gen = agen.inflate()(gen);
    gen = toBuffers(gen);
    const test = await read(gen);
    const control = await read(data);
    t.equal(test.length, control.length);
    t.deepEqual(test, control);
  });

  async function* toBuffers(data) {
    for await (let block of data) {
      yield Buffer.from(block);
    }
  }

  async function read(gen) {
    let result = '';
    for await (let block of gen) {
      result += block.toString();
    }
    return result;
  }
}

function generateStrings(count, minLen, maxLen) {
  const result = [];
  for (let i = 0; i < count; i++) {
    const len = Math.min(minLen + Math.round(Math.random() * (maxLen - minLen)), maxLen);
    result.push(generateString(len));
  }
  return result;

  function generateString(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result + '\n';
  }
}
