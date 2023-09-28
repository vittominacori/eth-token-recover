// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TokenRecover
 * @dev Allows token owner to recover any ERC20 sent into the contract.
 */
contract TokenRecover is Ownable {
    /**
     * @dev Recover ERC20 tokens stuck into this contract and send to owner address.
     * NOTE: Remember that only owner can call so be careful when use on contracts generated from other contracts.
     * @param tokenAddress The token contract address to recover.
     * @param tokenAmount Number of tokens to be recovered.
     */
    function recoverERC20(address tokenAddress, uint256 tokenAmount) public virtual onlyOwner {
        // slither-disable-next-line unchecked-transfer
        IERC20(tokenAddress).transfer(owner(), tokenAmount);
    }
}
