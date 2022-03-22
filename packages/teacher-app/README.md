# Create New Module

- copy module-template to packages/[module-name]
- update `packages/[module-name]/package.json`

```
{
"name": "[module-name]",
...
}
```

- update `packages/[module-name]/moduleFederation.config.js `

```
...
module.exports = {
  name: "[module-name]",
...

```

# Run Module as Standalone Application

```
lerna run start --scope=[module-name]

```
