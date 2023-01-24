# ETH Token Recover

[![NPM Package](https://img.shields.io/npm/v/eth-token-recover.svg?style=flat-square)](https://www.npmjs.org/package/eth-token-recover)
[![CI](https://github.com/vittominacori/eth-token-recover/actions/workflows/ci.yml/badge.svg)](https://github.com/vittominacori/eth-token-recover/actions/workflows/ci.yml)
[![Coverage Status](https://codecov.io/gh/vittominacori/eth-token-recover/graph/badge.svg)](https://codecov.io/gh/vittominacori/eth-token-recover)
[![MIT licensed](https://img.shields.io/github/license/vittominacori/eth-token-recover.svg)](https://github.com/vittominacori/eth-token-recover/blob/master/LICENSE)

TokenRecover allows the contract owner to recover any ERC20 token sent into the contract for error.

## Motivation

There are lots of tokens lost forever into Smart Contracts (see [OMG](https://etherscan.io/address/0xd26114cd6ee289accf82350c8d8487fedb8a0c07) token balances).
Each Ethereum contract is a potential token trap for ERC20 tokens. They can't be recovered so it means money losses for end users.

## Install

```bash
npm install eth-token-recover
```

## Usage

```solidity
pragma solidity ^0.8.0;

import "eth-token-recover/contracts/TokenRecover.sol";

contract MyContract is TokenRecover {
  // your stuff
}
```

## Code

This repo contains:

* [TokenRecover.sol](https://github.com/vittominacori/eth-token-recover/blob/master/contracts/TokenRecover.sol)

Contract has a `recoverERC20` function that transfers a `tokenAmount` amount of `tokenAddress` token to the contract owner.

```solidity
function recoverERC20(address tokenAddress, uint256 tokenAmount) public virtual onlyOwner;
```

Note: only owner can call the `recoverERC20` function so be careful when use on contracts generated from other contracts.

## Development

### Install dependencies

```bash
npm install
```

### Usage (using Hardhat)

Open the console

```bash
npm run console
```

#### Compile

```bash
npm run compile
```

#### Test

```bash
npm test
```

#### Code Coverage

```bash
npm run coverage
```

### Linter

Check Solidity files

```bash
npm run lint:sol
```

Check JS/TS files

```bash
npm run lint:js
```

Fix JS and Solidity files

```bash
npm run lint:fix
```

## License

Code released under the [MIT License](https://github.com/vittominacori/eth-token-recover/blob/master/LICENSE).
