pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


/**
 * @title TokenRecover
 * @author Vittorio Minacori (https://github.com/vittominacori)
 * @dev Allow to recover any ERC20 sent into the contract for error
 */
contract TokenRecover is Ownable {

  /**
   * @dev Remember that only owner can call so be careful when use on contracts generated from other contracts.
   * @param _token address The token contract address
   * @param _amount Number of tokens to be sent
   */
  function recoverERC20(
    address _token,
    uint256 _amount
  )
  public
  onlyOwner
  {
    IERC20(_token).transfer(owner(), _amount);
  }
}
