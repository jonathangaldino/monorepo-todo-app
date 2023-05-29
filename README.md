# Todo App

Manage your todos in just one app.

## The app

This monorepo relies on having a GraphQL server (@apps/server package) where we can perform some CRUD operations on the Todo Resource.

### Packages

We have a couple of packages and I'll try to explain them.

- @apps/
  - server - A graphQL server API that allows CRUD operations.
- @packages/
  - tsconfig - typescript config files.
  - eslint-config-cuomst - eslint custom config.
  - shemas - graphql schema and types generations (is used by the server and can be used by a frontend app later)

## Motivation

- Play with GraphQL and learn the GraphQL Server Specification
- Learn the concepts of Monorepo (+ [Turborepo](https://turbo.build/repo/docs)).
- Use [Relay](https://relay.dev/docs/) for the frontend app
