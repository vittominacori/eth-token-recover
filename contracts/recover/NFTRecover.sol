// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title NFTRecover
 * @dev Allows to recover any ERC721 or ERC1155 sent into the contract and send to a receiver.
 */
abstract contract NFTRecover {
    /**
     * @dev Recover the `tokenId` of the `tokenAddress` ERC721 stuck into this contract
     * and send to `tokenReceiver` address.
     * @param tokenAddress The token contract address to recover.
     * @param tokenReceiver The address who will receive the recovered token.
     * @param tokenId The identifier for the NFT to be recovered.
     * @param data Additional data with no specified format.
     */
    function _recoverERC721(
        address tokenAddress,
        address tokenReceiver,
        uint256 tokenId,
        bytes memory data
    ) internal virtual {
        IERC721(tokenAddress).safeTransferFrom(address(this), tokenReceiver, tokenId, data);
    }
}
