# Packges

- @forge-3d/core
- @forge-3d/create
- @forge-3d/internal _(private package)_

## Basic commands

> [!IMPORTANT]
> Make sure you installed [pnpm](https://pnpm.io/) to modify & run packages in this monorepo

To run a package script type the following command:

```sh
pnpm --filter <package_name> <script>

# for example
pnpm --filter @forge-3d/core build
```

To add a dependency type the following command:

```sh
pnpm --filter <package_name> add <dependency>

# for example
pnpm --filter @forge-3d/core add lodash
```
