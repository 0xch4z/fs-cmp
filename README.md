# fs-cmp [![Build Status](https://travis-ci.org/charliekenney23/fs-cmp.svg?branch=master)](https://travis-ci.org/charliekenney23/fs-cmp) [![Greenkeeper badge](https://badges.greenkeeper.io/Charliekenney23/fs-cmp.svg)](https://greenkeeper.io/)

### Easily determine if a given set of paths point to the same file.

```typescript
import fsCmp from 'fs-cmp';

/**
 *
 * given:
 *   original_file
 *   └── symlink
 *       └── deep_symlink
 */
await fsCmp('original_file', 'symlink', 'deep_symlink'); // => true
```
