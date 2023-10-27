// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {RecoverERC20} from "../recover/RecoverERC20.sol";

/**
 * @title TokenRecoverLegacy
 * @dev Allows the contract owner to recover any ERC20 token sent into the contract and send them to `owner()`.
 *
 * WARNING: The deployer address will automatically be set as contract owner.
 *
 * NOTE: this is a legacy version of `TokenRecover` that works as v4.x and earlier and MAY be removed in future releases.
 * We highly recommend to keep the code updated to use newer versions of the recover.
 */
abstract contract TokenRecoverLegacy is Ownable, RecoverERC20 {
    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() Ownable(_msgSender()) {}

    /**
     * @dev Recovers a `tokenAmount` of the ERC20 `tokenAddress` locked into this contract
     * and sends them to the `owner()` address.
     *
     * NOTE: restricting access to owner only. See `RecoverERC20::_recoverERC20`.
     *
     * @param tokenAddress The contract address of the token to recover.
     * @param tokenAmount Number of tokens to be recovered.
     */
    function recoverERC20(address tokenAddress, uint256 tokenAmount) public virtual onlyOwner {
        _recoverERC20(tokenAddress, owner(), tokenAmount);
    }
}
