# ETH Token Recover

[![NPM Package](https://img.shields.io/npm/v/eth-token-recover.svg?style=flat-square)](https://www.npmjs.org/package/eth-token-recover)
[![CI](https://github.com/vittominacori/eth-token-recover/actions/workflows/ci.yml/badge.svg)](https://github.com/vittominacori/eth-token-recover/actions/workflows/ci.yml)
[![Coverage Status](https://codecov.io/gh/vittominacori/eth-token-recover/graph/badge.svg)](https://codecov.io/gh/vittominacori/eth-token-recover)
[![MIT licensed](https://img.shields.io/github/license/vittominacori/eth-token-recover.svg)](https://github.com/vittominacori/eth-token-recover/blob/master/LICENSE)

TokenRecover allows to recover any ERC-20 or NFT (ERC-721) token sent into the contract and sends them to a receiver.

There are lots of tokens lost forever into Smart Contracts (see [OMG](https://etherscan.io/address/0xd26114cd6ee289accf82350c8d8487fedb8a0c07) token balances).
Each Ethereum contract, as well as any EVM compatible contract, is a potential token trap for ERC-20 or ERC-721 tokens. 
They can't be recovered, so it means money losses for end users.

By using TokenRecover, any smart contract can offer users a robust solution for reclaiming mistakenly or erroneously sent tokens, enhancing the overall user experience and confidence in the decentralized ecosystem.

## Install

```bash
npm install eth-token-recover
```

## Recovers

The `recover` contracts define internal methods that can be used in derived contracts.

### RecoverERC20

[RecoverERC20.sol](https://github.com/vittominacori/eth-token-recover/blob/master/contracts/recover/RecoverERC20.sol)

Allows to recover any ERC-20 token sent into the contract and sends them to a receiver.

> [!WARNING]
> It allows everyone to recover tokens. Access controls MUST be defined in derived contracts.

```solidity
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

abstract contract RecoverERC20 {
    function _recoverERC20(address tokenAddress, address tokenReceiver, uint256 tokenAmount) internal virtual {
        IERC20(tokenAddress).transfer(tokenReceiver, tokenAmount);
    }
}
```

### RecoverERC721

[RecoverERC721.sol](https://github.com/vittominacori/eth-token-recover/blob/master/contracts/recover/RecoverERC721.sol)

Allows to recover any ERC-721 token sent into the contract and sends them to a receiver.

> [!WARNING]
> It allows everyone to recover tokens. Access controls MUST be defined in derived contracts.

```solidity
pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

abstract contract RecoverERC721 {
    function _recoverERC721(address tokenAddress, address tokenReceiver, uint256 tokenId, bytes memory data) internal virtual {
        IERC721(tokenAddress).safeTransferFrom(address(this), tokenReceiver, tokenId, data);
    }
}
```

## Usage

The below contracts define high level code that can be inherited as is or extended to cover desired behaviors.

### ERC20Recover

[ERC20Recover.sol](https://github.com/vittominacori/eth-token-recover/blob/master/contracts/ERC20Recover.sol)

Allows the contract owner to recover any ERC-20 token sent into the contract and sends them to a receiver.

> [!IMPORTANT]
> This contract is `Ownable` and restricts access to recover method to owner only.

#### Use ERC20Recover

```solidity
pragma solidity ^0.8.20;

import {ERC20Recover} from "eth-token-recover/contracts/ERC20Recover.sol";

contract MyContract is ERC20Recover {
    constructor(address initialOwner) ERC20Recover(initialOwner) {
        // your stuff
    }
    
    // your stuff
}
```

### ERC721Recover

[ERC721Recover.sol](https://github.com/vittominacori/eth-token-recover/blob/master/contracts/ERC721Recover.sol)

Allows the contract owner to recover any ERC-721 token sent into the contract and sends them to a receiver.

> [!IMPORTANT]
> This contract is `Ownable` and restricts access to recover method to owner only.

#### Use ERC721Recover

```solidity
pragma solidity ^0.8.20;

import {ERC721Recover} from "eth-token-recover/contracts/ERC721Recover.sol";

contract MyContract is ERC721Recover {
    constructor(address initialOwner) ERC721Recover(initialOwner) {
        // your stuff
    }
    
    // your stuff
}
```

### TokenRecover

[TokenRecover.sol](https://github.com/vittominacori/eth-token-recover/blob/master/contracts/TokenRecover.sol)

Allows the contract owner to recover any ERC-20 or ERC-721 token sent into the contract and sends them to a receiver.

> [!IMPORTANT]
> This contract is `Ownable` and restricts access to recover methods to owner only.

#### Use TokenRecover

```solidity
pragma solidity ^0.8.20;

import {TokenRecover} from "eth-token-recover/contracts/TokenRecover.sol";

contract MyContract is TokenRecover {
    constructor(address initialOwner) TokenRecover(initialOwner) {
        // your stuff
    }
    
    // your stuff
}
```

## Examples

Contracts can be extended to add custom logic (e.g. to add custom roles or rules).

### Add rules to high level

```solidity
pragma solidity ^0.8.20;

import {TokenRecover} from "eth-token-recover/contracts/TokenRecover.sol";
import {MyDefinedRules} from "./MyDefinedRules.sol";

contract MyContract is TokenRecover, MyDefinedRules {
    constructor(address initialOwner) TokenRecover(initialOwner) {
        // your stuff
    }
    
    // your stuff

    function recoverERC20(address tokenAddress, address tokenReceiver, uint256 tokenAmount) public virtual override alsoMyRule {
        // your stuff
        
        super.recoverERC20(tokenAddress, tokenReceiver, tokenAmount);

        // your stuff
    }
}
```

### Add rules to low level

```solidity
pragma solidity ^0.8.20;

import {RecoverERC20} from "eth-token-recover/contracts/recover/RecoverERC20.sol";
import {MyDefinedRules} from "./MyDefinedRules.sol";

contract MyContract is RecoverERC20, MyDefinedRules {
    // your stuff

    function myRecoverERC20(address tokenAddress, address tokenReceiver, uint256 tokenAmount) public virtual onlyMyRule {
        // your stuff
        
        _recoverERC20(tokenAddress, tokenReceiver, tokenAmount);

        // your stuff
    }
}
```

## Migrating from 4.x

> [!WARNING]
> The `TokenRecover` constructor now requires an `initialOwner` parameter, making the ownership initialization explicit.

A contract inheriting from `TokenRecover` needs to be updated in the following way.

```diff
pragma solidity ^0.8.20;

import {TokenRecover} from "eth-token-recover/contracts/TokenRecover.sol";

contract MyContract is TokenRecover {
+   constructor(address initialOwner) TokenRecover(initialOwner) {
+       // your stuff
+   }
    
    // your stuff
}
```

> [!WARNING]
> The v4.x (and earlier) `TokenRecover::recoverERC20` method has been updated to accept the `tokenReceiver` address, the address that will receive the recovered token.
>
> ```diff
> -function recoverERC20(address tokenAddress, uint256 tokenAmount) public virtual onlyOwner
> +function recoverERC20(address tokenAddress, address tokenReceiver, uint256 tokenAmount) public virtual onlyOwner
> ```

Check the [Backwards Compatibility](#backwards-compatibility) section for additional details.

## Backwards Compatibility

A backward compatible (legacy) version is available in the `legacy` folder.

`TokenRecoverLegacy` contract will:

* implicitly set the deployer as contract owner
* send recovered tokens to owner instead of providing an explicit receiver 

To use `TokenRecoverLegacy`, a contract inheriting from `TokenRecover` needs to be updated in the following way

```diff
pragma solidity ^0.8.20;

-import {TokenRecover} from "eth-token-recover/contracts/TokenRecover.sol";
+import {TokenRecoverLegacy} from "eth-token-recover/contracts/legacy/TokenRecoverLegacy.sol";

-contract MyContract is TokenRecover {    
+contract MyContract is TokenRecoverLegacy {    
    // your stuff
}
```

> [!CAUTION]
> `TokenRecoverLegacy` is a legacy version of `TokenRecover` that works as v4.x and earlier and MAY be removed in future releases. 
> 
> We highly recommend to keep the code updated to use newer versions of the recover.

## Documentation

* [Solidity API](https://github.com/vittominacori/eth-token-recover/blob/master/docs/index.md)

## Code Analysis

* [Control Flow](https://github.com/vittominacori/eth-token-recover/tree/master/analysis/control-flow)
* [Description Table](https://github.com/vittominacori/eth-token-recover/tree/master/analysis/description-table)
* [Inheritance Tree](https://github.com/vittominacori/eth-token-recover/tree/master/analysis/inheritance-tree)
* [UML](https://github.com/vittominacori/eth-token-recover/tree/master/analysis/uml)

## Development

### Install dependencies

```bash
npm install
```

### Compile

```bash
npm run compile
```

### Test

```bash
npm test
```

### Code Coverage

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
