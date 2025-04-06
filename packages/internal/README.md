# forge-3d/internal

## [*private package*]

---

## Exports

<!-- prettier-ignore -->
- [***@forge-3d/internal***](./index.js)
- [***@forge-3d/internal/types***](./src/types.d.ts)
- [***@forge-3d/internal/tsconfig***](./tsconfig.base.json)

---

## Documentation API

```ts
// @forge-3d/internal/types
export type ProjectOptions = {
    projectDirectory: string;
    outputDirectory: string;
    importPaths: Record<string, string[]>;
};

// @forge-3d/internal
export async function buildProject(options: ProjectOptions): Promise<void>;
export async function cleanProject(outputDirectory: string): Promise<void>;
```
