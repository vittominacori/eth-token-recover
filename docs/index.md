# Solidity API

## ERC20Recover

_Allows token owner to recover any ERC20 sent into the contract and send to a receiver._

### constructor

```solidity
constructor(address originalOwner) internal
```

_Initializes the contract setting the address provided by the deployer as the initial owner._

### recoverERC20

```solidity
function recoverERC20(address tokenAddress, address tokenReceiver, uint256 tokenAmount) external virtual
```

_Recover a `tokenAmount` of the `tokenAddress` ERC20 stuck into this contract
and send to `tokenReceiver` address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAddress | address | The token contract address to recover. |
| tokenReceiver | address | The address who will receive the recovered tokens. |
| tokenAmount | uint256 | Number of tokens to be recovered. |

## ERC721Recover

_Allows token owner to recover any ERC721 sent into the contract and send to a receiver._

### constructor

```solidity
constructor(address originalOwner) internal
```

_Initializes the contract setting the address provided by the deployer as the initial owner._

### recoverERC721

```solidity
function recoverERC721(address tokenAddress, address tokenReceiver, uint256 tokenId, bytes data) external virtual
```

_Recover the `tokenId` of the `tokenAddress` ERC721 stuck into this contract
and send to `tokenReceiver` address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAddress | address | The token contract address to recover. |
| tokenReceiver | address | The address who will receive the recovered token. |
| tokenId | uint256 | The identifier for the NFT to be recovered. |
| data | bytes | Additional data with no specified format. |

## TokenRecover

_Allows token owner to recover any ERC20 or ERC721 sent into the contract and send to a receiver._

### constructor

```solidity
constructor(address originalOwner) internal
```

_Initializes the contract setting the address provided by the deployer as the initial owner._

### recoverERC20

```solidity
function recoverERC20(address tokenAddress, address tokenReceiver, uint256 tokenAmount) external virtual
```

_Recover a `tokenAmount` of the `tokenAddress` ERC20 stuck into this contract
and send to `tokenReceiver` address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAddress | address | The token contract address to recover. |
| tokenReceiver | address | The address who will receive the recovered tokens. |
| tokenAmount | uint256 | Number of tokens to be recovered. |

### recoverERC721

```solidity
function recoverERC721(address tokenAddress, address tokenReceiver, uint256 tokenId, bytes data) external virtual
```

_Recover the `tokenId` of the `tokenAddress` ERC721 stuck into this contract
and send to `tokenReceiver` address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAddress | address | The token contract address to recover. |
| tokenReceiver | address | The address who will receive the recovered token. |
| tokenId | uint256 | The identifier for the NFT to be recovered. |
| data | bytes | Additional data with no specified format. |

## RecoverERC20

_Allows to recover any ERC20 sent into the contract and send to a receiver._

### _recoverERC20

```solidity
function _recoverERC20(address tokenAddress, address tokenReceiver, uint256 tokenAmount) internal virtual
```

_Recover a `tokenAmount` of the `tokenAddress` ERC20 stuck into this contract
and send to `tokenReceiver` address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAddress | address | The token contract address to recover. |
| tokenReceiver | address | The address who will receive the recovered tokens. |
| tokenAmount | uint256 | Number of tokens to be recovered. |

## RecoverERC721

_Allows to recover any ERC721 sent into the contract and send to a receiver._

### _recoverERC721

```solidity
function _recoverERC721(address tokenAddress, address tokenReceiver, uint256 tokenId, bytes data) internal virtual
```

_Recover the `tokenId` of the `tokenAddress` ERC721 stuck into this contract
and send to `tokenReceiver` address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAddress | address | The token contract address to recover. |
| tokenReceiver | address | The address who will receive the recovered token. |
| tokenId | uint256 | The identifier for the NFT to be recovered. |
| data | bytes | Additional data with no specified format. |

