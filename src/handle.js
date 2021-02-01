export default async function* handle(generator, f) {
  let out = [];
  f.onData = (chunk) => out.push(chunk);
  f.onEnd = () => { };
  for await (let chunk of generator) {
    f.push(chunk, false);
    if (out.length) {
      yield* out;
      out = [];
    }
  }
  f.push([], true);
  if (out.length) { yield* out; }
}
