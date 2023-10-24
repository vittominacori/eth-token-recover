// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {ERC20Recover} from "./ERC20Recover.sol";

/**
 * @title TokenRecover
 * @dev Allows token owner to recover any ERC20 sent into the contract.
 */
abstract contract TokenRecover is ERC20Recover {
    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address originalOwner) ERC20Recover(originalOwner) {}
}
