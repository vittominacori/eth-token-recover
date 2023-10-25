const { shouldBehaveLikeERC20Recover } = require('./ERC20Recover.behavior');
const { BN } = require('@openzeppelin/test-helpers');

const ERC20Recover = artifacts.require('$ERC20Recover');
const ERC20 = artifacts.require('$ERC20Mock');

contract('ERC20Recover', function (accounts) {
  const [receiver] = accounts;

  const amount = new BN(100);

  beforeEach(async function () {
    this.instance = await ERC20Recover.new();

    this.erc20ToRecover = await ERC20.new();
    await this.erc20ToRecover.$_mint(receiver, amount);

    await this.erc20ToRecover.transfer(this.instance.address, amount, { from: receiver });
  });

  shouldBehaveLikeERC20Recover(receiver, amount);
});
