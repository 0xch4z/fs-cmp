# fs-cmp

## Easily determine if a given set of paths point to the same file.

```
original_file
├── symlink
│  └── deep_symlink
```

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
