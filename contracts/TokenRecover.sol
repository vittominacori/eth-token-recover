// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {ERC20Recover} from "./recover/ERC20Recover.sol";

/**
 * @title TokenRecover
 * @dev Allows token owner to recover any ERC20 sent into the contract.
 */
abstract contract TokenRecover is Ownable, ERC20Recover {
    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address originalOwner) Ownable(originalOwner) {}

    /**
     * @dev Recover a `tokenAmount` of the `tokenAddress` ERC20 stuck into this contract
     * and send to `tokenReceiver` address.
     * @param tokenAddress The token contract address to recover.
     * @param tokenReceiver The address who will receive the recovered tokens.
     * @param tokenAmount Number of tokens to be recovered.
     */
    function recoverERC20(address tokenAddress, address tokenReceiver, uint256 tokenAmount) external virtual onlyOwner {
        _recoverERC20(tokenAddress, tokenReceiver, tokenAmount);
    }
}
