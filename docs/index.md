# Solidity API

## ERC20Recover

_Allows token owner to recover any ERC20 sent into the contract._

### constructor

```solidity
constructor(address originalOwner) internal
```

_Initializes the contract setting the address provided by the deployer as the initial owner._

### recoverERC20

```solidity
function recoverERC20(address tokenAddress, uint256 tokenAmount) public virtual
```

_Recover ERC20 tokens stuck into this contract and send to owner address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAddress | address | The token contract address to recover. |
| tokenAmount | uint256 | Number of tokens to be recovered. |

## TokenRecover

_Allows token owner to recover any ERC20 sent into the contract._

### constructor

```solidity
constructor(address originalOwner) internal
```

_Initializes the contract setting the address provided by the deployer as the initial owner._

