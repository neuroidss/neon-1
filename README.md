# Neon

Neon is a multi-blockchain wallet for interacting with the Arcade ecosystem. It will include desktop, web and mobile versions.

* [Project board](https://github.com/ArcadeCity/neon/projects/1)

### Planned features

* Full-featured Bitcoin & Lightning wallet
* Buy/sell, trade, or stake Arcade Tokens (ARCD)
* Visual data browser for the entire Arcade network: view channels, transactions, and guild policies with their resulting revenue flows
* Run a Bitcoin, Lightning, and/or Ethereum node, including a toolkit for guild treasuries to earn fees on Lightning transactions [desktop only]

### Technical highlights

* React [web]
* React Native [mobile]
* Electron [desktop]
* GraphQL via Apollo
* TypeScript
* MobX / mobx-state-tree
* storybook
* cypress
* jest

### Project structure

We use the monorepo pattern with [Lerna](https://github.com/lerna/lerna#readme) and [Yarn Workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/), aiming roughly for the project structure described [here](https://medium.com/trabe/monorepo-setup-with-lerna-and-yarn-workspaces-5d747d7c0e91).

### Installing

`git clone git@github.com:ArcadeCity/neon.git`

`cd neon`

`yarn install`

`cd desktop` (or other app folder)

`yarn start`

### License

All code in this repository is licensed under the [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.md). The [quick summary](https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3)):

> You may copy, distribute and modify the software as long as you track changes/dates in source files. Any modifications to or software including (via compiler) GPL-licensed code must also be made available under the GPL along with build & install instructions.
