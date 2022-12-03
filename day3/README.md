# Learnings

- Seems like sometimes reading file lines gives an empty line even when the file doesn't have an ending line
  - Fixed by `.filter(line => line !== "")`
- `string.split()` is different than `string.split("")`.
