const { shouldBehaveLikeERC20Recover } = require('./behaviors/ERC20Recover.behavior');

const TokenRecover = artifacts.require('$ERC20Recover');

contract('ERC20Recover', function (accounts) {
  const [owner, other] = accounts;

  beforeEach(async function () {
    this.instance = await TokenRecover.new(owner);
  });

  shouldBehaveLikeERC20Recover(owner, other);
});
