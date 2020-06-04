# 🤿🌊

[![Buildkite pipeline](https://badge.buildkite.com/89449e4e608f5cb803a591a69693f6626f3a91129f014c58f9.svg?branch=master)](https://buildkite.com/seek/skuba-dive)
[![npm package](https://img.shields.io/badge/npm-%40seek%2Fskuba--dive-cc3534.svg)](https://www.npmjs.com/package/@seek/skuba-dive)
[![Slack channel](https://img.shields.io/badge/slack-%23indirect--apply-3f0f3f.svg)](https://slack.com/app_redirect?team=T02P37LGR&channel=indirect-apply)
[![GitHub repos](https://img.shields.io/badge/users-@SEEK--Jobs-0d3880.svg)](https://github.com/search?q=filename%3Apackage.json+org%3ASEEK-Jobs+-repo%3ASEEK-Jobs%2Fskuba-dive+%22%40seek%2Fskuba-dive%22&type=Code)
[![Upkeep](https://img.shields.io/badge/users-Upkeep-61d3b1.svg)](https://upkeep.ssod.skinfra.xyz/package#?name=@seek/skuba-dive)

Minimal runtime for [`skuba`](https://github.com/SEEK-Jobs/skuba).

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
import { Env } from '@seek/skuba-dive';

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
import '@seek/skuba-dive/register';

import { config } from 'src/config';

export = new Koa();
```

The hook must be imported from a module that sits directly under `/src` for module resolution to work correctly.

## Design

`skuba-dive` packages up:

- General application boilerplate that doesn't justify a standalone module
- Runtime functionality that complements `skuba`

See `skuba`'s [goals](https://github.com/SEEK-Jobs/skuba#goals) and [non-goals](https://github.com/SEEK-Jobs/skuba#non-goals) for more information.

## Development

### Prerequisites

- Node.js 12
- npm read token for `@seek` packages

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
