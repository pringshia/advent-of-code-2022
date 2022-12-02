# Learnings

- `await Deno.readTextFile()` is how to read contents from a file in deno
- VSCode out-of-the-box doesn't like Deno syntax, probably need to install an extension?
- `array.splice().pop()` is very different than `array.splice(); array.pop()`.
  - `splice()` returns an array so easy to miss this, and pop on that array instead of `array`.
