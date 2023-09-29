// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {TokenRecover} from "../TokenRecover.sol";

/**
 * @title TRDeployerOwner
 * @dev TokenRecover contract with deployer set as initial owner.
 */
contract TRDeployerOwner is TokenRecover {
    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() TokenRecover(_msgSender()) {}
}
