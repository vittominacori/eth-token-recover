pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// mock class using ERC20
contract ERC20Mock is ERC20 {

    constructor(address initialAccount, uint256 initialBalance) public {
        _mint(initialAccount, initialBalance);
    }
}
