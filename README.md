# ETH Token Recover

[![NPM Package](https://img.shields.io/npm/v/@vittominacori/eth-token-recover.svg?style=flat-square)](https://www.npmjs.org/package/@vittominacori/eth-token-recover)
[![Build Status](https://travis-ci.org/vittominacori/eth-token-recover.svg?branch=master)](https://travis-ci.org/vittominacori/eth-token-recover)
[![Coverage Status](https://coveralls.io/repos/github/vittominacori/eth-token-recover/badge.svg?branch=master)](https://coveralls.io/github/vittominacori/eth-token-recover?branch=master)
[![MIT licensed](https://img.shields.io/github/license/vittominacori/eth-token-recover.svg)](https://github.com/vittominacori/eth-token-recover/blob/master/LICENSE)

TokenRecover allows the contract owner to recover any ERC20 token sent into the contract for error.

## Motivation

There are lots of tokens lost forever into Smart Contracts (see [OMG](https://etherscan.io/address/0xd26114cd6ee289accf82350c8d8487fedb8a0c07) token balances).
Each Ethereum contract is a potential token trap for ERC20 tokens. They can't be recovered so it means money losses for end users.

## Install

```bash
npm install @vittominacori/eth-token-recover
```

## Usage

```solidity
pragma solidity ^0.5.15;

import "@vittominacori/eth-token-recover/contracts/TokenRecover.sol";

contract MyContract is TokenRecover {
  // your stuff
}
```

## Code

This repo contains:

* [TokenRecover.sol](https://github.com/vittominacori/eth-token-recover/blob/master/contracts/TokenRecover.sol)

Contract has a `recoverERC20` function that transfers a `tokenAmount` amount of `tokenAddress` token to the contract owner.

```solidity
function recoverERC20(address tokenAddress, uint256 tokenAmount) public onlyOwner;
```

Note: only owner can call the `recoverERC20` function so be careful when use on contracts generated from other contracts.

## Development

### Install dependencies

```bash
npm install
```

### Linter

Use Solhint

```bash
npm run lint:sol
```

Use ESLint

```bash
npm run lint:js
```

Use Eslint and fix

```bash
npm run lint:fix
```

### Usage (using Truffle)

Open the Truffle console

```bash
npm run console
```

#### Compile

```bash
npm run compile
```

#### Test

```bash
npm run test
```

### Usage (using Buidler)

Open the Buidler console

```bash
npm run buidler:console
```

#### Compile

```bash
npm run buidler:compile
```

#### Test

```bash
npm run buidler:test
```

## License

Code released under the [MIT License](https://github.com/vittominacori/eth-token-recover/blob/master/LICENSE).
