// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NFTRecover
 * @dev Allows token owner to recover any ERC721 or ERC1155 sent into the contract.
 */
abstract contract NFTRecover is Ownable {
    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address originalOwner) Ownable(originalOwner) {}

    /**
     * @dev Recover ERC721 tokens stuck into this contract and send to owner address.
     * @param tokenAddress The token contract address to recover.
     * @param tokenId The identifier for the NFT to be recovered.
     */
    function recoverERC721(address tokenAddress, uint256 tokenId) public virtual onlyOwner {
        IERC721(tokenAddress).transferFrom(address(this), owner(), tokenId);
    }
}
