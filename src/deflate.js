import pako from './pako.js';
import handle from './handle.js';

export default function deflate(options = {}) {
  return async function* (it) {
    yield* handle(it, new pako.Deflate(options));
  }
}