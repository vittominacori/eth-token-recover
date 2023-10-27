# Solidity API

## ERC20Recover

_Allows the contract owner to recover any ERC20 token sent into the contract and send them to a receiver._

### constructor

```solidity
constructor(address originalOwner) internal
```

_Initializes the contract setting the address provided by the deployer as the initial owner._

### recoverERC20

```solidity
function recoverERC20(address tokenAddress, address tokenReceiver, uint256 tokenAmount) public virtual
```

_Recovers a `tokenAmount` of the ERC20 `tokenAddress` locked into this contract
and sends them to the `tokenReceiver` address.

NOTE: restricting access to owner only. See `RecoverERC20::_recoverERC20`._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAddress | address | The contract address of the token to recover. |
| tokenReceiver | address | The address that will receive the recovered tokens. |
| tokenAmount | uint256 | Number of tokens to be recovered. |

## ERC721Recover

_Allows the contract owner to recover any ERC721 token sent into the contract and send them to a receiver._

### constructor

```solidity
constructor(address originalOwner) internal
```

_Initializes the contract setting the address provided by the deployer as the initial owner._

### recoverERC721

```solidity
function recoverERC721(address tokenAddress, address tokenReceiver, uint256 tokenId, bytes data) public virtual
```

_Recovers the `tokenId` of the ERC721 `tokenAddress` locked into this contract
and sends it to the `tokenReceiver` address.

NOTE: restricting access to owner only. See `RecoverERC721::_recoverERC721`._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAddress | address | The contract address of the token to recover. |
| tokenReceiver | address | The address that will receive the recovered token. |
| tokenId | uint256 | The identifier for the NFT to be recovered. |
| data | bytes | Additional data with no specified format. |

## TokenRecover

_Allows the contract owner to recover any ERC20 or ERC721 token sent into the contract and send them to a receiver._

### constructor

```solidity
constructor(address originalOwner) internal
```

_Initializes the contract setting the address provided by the deployer as the initial owner._

### recoverERC20

```solidity
function recoverERC20(address tokenAddress, address tokenReceiver, uint256 tokenAmount) public virtual
```

_Recovers a `tokenAmount` of the ERC20 `tokenAddress` locked into this contract
and sends them to the `tokenReceiver` address.

NOTE: restricting access to owner only. See `RecoverERC20::_recoverERC20`._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAddress | address | The contract address of the token to recover. |
| tokenReceiver | address | The address that will receive the recovered tokens. |
| tokenAmount | uint256 | Number of tokens to be recovered. |

### recoverERC721

```solidity
function recoverERC721(address tokenAddress, address tokenReceiver, uint256 tokenId, bytes data) public virtual
```

_Recovers the `tokenId` of the ERC721 `tokenAddress` locked into this contract
and sends it to the `tokenReceiver` address.

NOTE: restricting access to owner only. See `RecoverERC721::_recoverERC721`._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAddress | address | The contract address of the token to recover. |
| tokenReceiver | address | The address that will receive the recovered token. |
| tokenId | uint256 | The identifier for the NFT to be recovered. |
| data | bytes | Additional data with no specified format. |

## TokenRecoverLegacy

_Allows the contract owner to recover any ERC20 token sent into the contract and send them to `owner()`.

WARNING: The deployer address will automatically be set as contract owner.

NOTE: this is a legacy version of Token Recover that works as v4.x and earlier and MAY be removed in future releases.
We highly recommend to update your code to use newer versions of the recover._

### constructor

```solidity
constructor() internal
```

_Initializes the contract setting the deployer as the initial owner._

### recoverERC20

```solidity
function recoverERC20(address tokenAddress, uint256 tokenAmount) public virtual
```

_Recovers a `tokenAmount` of the ERC20 `tokenAddress` locked into this contract
and sends them to the `owner()` address.

NOTE: restricting access to owner only. See `RecoverERC20::_recoverERC20`._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAddress | address | The contract address of the token to recover. |
| tokenAmount | uint256 | Number of tokens to be recovered. |

## RecoverERC20

_Allows to recover any ERC20 token sent into the contract and send them to a receiver._

### _recoverERC20

```solidity
function _recoverERC20(address tokenAddress, address tokenReceiver, uint256 tokenAmount) internal virtual
```

_Recovers a `tokenAmount` of the ERC20 `tokenAddress` locked into this contract
and sends them to the `tokenReceiver` address.

WARNING: it allows everyone to recover tokens. Access controls MUST be defined in derived contracts._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAddress | address | The contract address of the token to recover. |
| tokenReceiver | address | The address that will receive the recovered tokens. |
| tokenAmount | uint256 | Number of tokens to be recovered. |

## RecoverERC721

_Allows to recover any ERC721 token sent into the contract and send them to a receiver._

### _recoverERC721

```solidity
function _recoverERC721(address tokenAddress, address tokenReceiver, uint256 tokenId, bytes data) internal virtual
```

_Recovers the `tokenId` of the ERC721 `tokenAddress` locked into this contract
and sends it to the `tokenReceiver` address.

WARNING: it allows everyone to recover tokens. Access controls MUST be defined in derived contracts._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAddress | address | The contract address of the token to recover. |
| tokenReceiver | address | The address that will receive the recovered token. |
| tokenId | uint256 | The identifier for the NFT to be recovered. |
| data | bytes | Additional data with no specified format. |

