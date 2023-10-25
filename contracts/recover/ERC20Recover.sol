// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title ERC20Recover
 * @dev Allows to recover any ERC20 sent into the contract and send to a receiver.
 */
abstract contract ERC20Recover {
    /**
     * @dev Recover a `tokenAmount` of the `tokenAddress` ERC20 stuck into this contract
     * and send to `tokenReceiver` address.
     * @param tokenAddress The token contract address to recover.
     * @param tokenReceiver The address who will receive the recovered tokens.
     * @param tokenAmount Number of tokens to be recovered.
     */
    function _recoverERC20(address tokenAddress, address tokenReceiver, uint256 tokenAmount) internal virtual {
        // slither-disable-next-line unchecked-transfer
        IERC20(tokenAddress).transfer(tokenReceiver, tokenAmount);
    }
}
