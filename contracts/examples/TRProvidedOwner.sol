// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {TokenRecover} from "../TokenRecover.sol";

/**
 * @title TRProvidedOwner
 * @dev TokenRecover contract with owner provided during construction.
 */
contract TRProvidedOwner is TokenRecover {
    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address originalOwner) TokenRecover(originalOwner) {}
}
