// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title RecoverERC721
 * @dev Allows to recover any ERC20 sent into the contract and send them to a receiver.
 */
abstract contract RecoverERC721 {
    /**
     * @dev Recovers the `tokenId` of the ERC721 `tokenAddress` locked into this contract
     * and sends it to the `tokenReceiver` address.
     *
     * WARNING: it allows everyone to recover tokens. Access controls MUST be defined in derived contracts.
     *
     * @param tokenAddress The contract address of the token to recover.
     * @param tokenReceiver The address that will receive the recovered token.
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
