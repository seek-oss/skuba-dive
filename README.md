# 🤿🌊

![GitHub Release](https://github.com/seek-oss/skuba-dive/workflows/Release/badge.svg?branch=master)
![GitHub Validate](https://github.com/seek-oss/skuba-dive/workflows/Validate/badge.svg?branch=master)
[![Node.js version](https://img.shields.io/badge/node-%3E%3D%2012-brightgreen)](https://nodejs.org/en/)
[![npm package](https://img.shields.io/npm/v/skuba-dive)](https://www.npmjs.com/package/skuba-dive)
[![Powered by skuba](https://img.shields.io/badge/🤿%20skuba-powered-009DC4)](https://github.com/seek-oss/skuba)

Minimal runtime for [`skuba`](https://github.com/seek-oss/skuba).

## Table of contents

- [API reference](#api-reference)
  - [Env](#env)
  - [Register](#register)
- [Design](#design)
- [Development](#development)

## API reference

### Env

Functions for reading values out of environment variables.

For example, in your `/src/config.ts`:

```typescript
import { Env } from 'skuba-dive';

const ENVIRONMENTS = ['dev', 'prod'] as const;

export type Environment = typeof ENVIRONMENTS[number];

export const environment = Env.oneOf(ENVIRONMENTS)('ENVIRONMENT');
// 'dev' | 'prod'

export const port = Env.nonNegativeInteger('PORT', { default: undefined });
// number | undefined
```

Each function will throw if its environment variable is not set and `opts.default` is not provided.

### Register

Runtime hook for:

- Import paths relative to `/src`
- Stack traces that map back to your `.ts` sources

Make a side-effectful import at the top of your entry point, e.g. `/src/app.ts`:

```typescript
import 'skuba-dive/register';

import { config } from 'src/config';

export = new Koa();
```

The hook must be imported from a module that sits directly under `/src` for module resolution to work correctly.

## Design

`skuba-dive` packages up:

- General application boilerplate that doesn't justify a standalone module
- Runtime functionality that complements `skuba`

See `skuba`'s [goals] and [non-goals] for more information.

[goals]: https://github.com/seek-oss/skuba#goals
[non-goals]: https://github.com/seek-oss/skuba#non-goals

## Development

### Prerequisites

- Node.js 12+
- Yarn 1.x

```shell
yarn install
```

### Lint

```shell
# fix
yarn format

# check
yarn lint
```

### Test

```shell
yarn test
```

### Build

```shell
yarn build
```
