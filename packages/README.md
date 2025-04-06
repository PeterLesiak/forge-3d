# Packages

- [**@forge-3d/core**](./core/)
- [**@forge-3d/internal**](./internal/) (**_private package_**)

## Managing dependencies

```sh
# Adds dependency from a registry (workspace root)
pnpm add -D jquery
# Adds dependency from a registry (for signgle package)
pnpm --filter @forge-3d/core add -D jquery
# Adds dependency from a workspace (for signgle package)
pnpm --filter @forge-3d/core add -D --workspce @forge-3d/internal

# Running scripts
pnpm --filter @forge-3d/core run build
# or shorter
pnpm --filter @forge-3d/core build
```
