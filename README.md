# Storacha website

![Storacha Network](./public/img/storacha-og-card.png)

## Contributing

Feel free to join in. All welcome. [Open an issue](https://github.com/storacha/storacha.network/issues)!

### Prerequisites

```bash
# install node LTS/Current
https://nodejs.org/en/download/

# enable corepack in node > v16.17
corepack enable

# install deps
pnpm i
```

### Run dev mode

To start in development mode locally run the following:

```bash
# serve with hot reload at localhost:3000
pnpm dev

```

### Build for production

The build environment will be detected and the appropriate server(less) transforms will be applied:

```bash
# build production site bundle
pnpm build

# launch a webserver to preview the site
pnpm preview
```

#### You can also build a static version with:

```bash
# build optimised static site bundle
pnpm generate
```

## Code style and linting
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [ESLint v9](https://eslint.org/)

## License

Dual-licensed under [MIT + Apache 2.0](./LICENSE.md)
