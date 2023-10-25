// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {RecoverERC721} from "./recover/RecoverERC721.sol";

/**
 * @title ERC721Recover
 * @dev Allows token owner to recover any ERC721 sent into the contract and send them to a receiver.
 */
abstract contract ERC721Recover is Ownable, RecoverERC721 {
    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address originalOwner) Ownable(originalOwner) {}

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
    ) external virtual onlyOwner {
        _recoverERC721(tokenAddress, tokenReceiver, tokenId, data);
    }
}
