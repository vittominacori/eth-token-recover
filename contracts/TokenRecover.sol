// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {RecoverERC20} from "./recover/RecoverERC20.sol";
import {RecoverERC721} from "./recover/RecoverERC721.sol";

/**
 * @title TokenRecover
 * @dev Allows the contract owner to recover any ERC20 or ERC721 token sent into the contract and send them to a receiver.
 */
abstract contract TokenRecover is Ownable, RecoverERC20, RecoverERC721 {
    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address originalOwner) Ownable(originalOwner) {}

    /**
     * @dev Recovers a `tokenAmount` of the ERC20 `tokenAddress` locked into this contract
     * and sends them to the `tokenReceiver` address.
     *
     * NOTE: restricting access to owner only. See `RecoverERC20::_recoverERC20`.
     *
     * @param tokenAddress The contract address of the token to recover.
     * @param tokenReceiver The address that will receive the recovered tokens.
     * @param tokenAmount Number of tokens to be recovered.
     */
    function recoverERC20(address tokenAddress, address tokenReceiver, uint256 tokenAmount) public virtual onlyOwner {
        _recoverERC20(tokenAddress, tokenReceiver, tokenAmount);
    }

    /**
     * @dev Recovers the `tokenId` of the ERC721 `tokenAddress` locked into this contract
     * and sends it to the `tokenReceiver` address.
     *
     * NOTE: restricting access to owner only. See `RecoverERC721::_recoverERC721`.
     *
     * @param tokenAddress The contract address of the token to recover.
     * @param tokenReceiver The address that will receive the recovered token.
     * @param tokenId The identifier for the NFT to be recovered.
     * @param data Additional data with no specified format.
     */
    function recoverERC721(
        address tokenAddress,
        address tokenReceiver,
        uint256 tokenId,
        bytes memory data
    ) public virtual onlyOwner {
        _recoverERC721(tokenAddress, tokenReceiver, tokenId, data);
    }
}
