import pako from './pako.js';
import handle from './handle.js';

export default function inflate(options = {}) {
  return async function*(it) {
    yield* handle(it, new pako.Inflate(options));
  }
}
