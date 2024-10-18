// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title RecoverERC20
 * @dev Allows to recover any ERC-20 token sent into the contract and sends them to a receiver.
 */
abstract contract RecoverERC20 {
    /**
     * @dev Recovers a `tokenAmount` of the ERC-20 `tokenAddress` locked into this contract
     * and sends them to the `tokenReceiver` address.
     *
     * WARNING: it allows everyone to recover tokens. Access controls MUST be defined in derived contracts.
     *
     * @param tokenAddress The contract address of the token to recover.
     * @param tokenReceiver The address that will receive the recovered tokens.
     * @param tokenAmount Number of tokens to be recovered.
     */
    function _recoverERC20(address tokenAddress, address tokenReceiver, uint256 tokenAmount) internal virtual {
        // slither-disable-next-line unchecked-transfer
        IERC20(tokenAddress).transfer(tokenReceiver, tokenAmount);
    }
}
