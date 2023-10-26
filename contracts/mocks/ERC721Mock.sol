// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// mock class using ERC721
contract ERC721Mock is ERC721 {
    constructor() ERC721("TEST", "TEST") {}
}
