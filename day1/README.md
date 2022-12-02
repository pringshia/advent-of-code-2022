# Learnings

- `await Deno.readTextFile()` is how to read contents from a file in Deno.
- `deno run` requires the `--allow-read` flag for local file access, seems like a great built-in security consideration, i.e. principle of least privilege.
- VSCode out-of-the-box doesn't like Deno syntax, probably need to install an extension?
- `array.splice().pop()` is very different than `array.splice(); array.pop()`.
  - `splice()` returns an array so easy to miss this, and pop on that array instead of `array`.
