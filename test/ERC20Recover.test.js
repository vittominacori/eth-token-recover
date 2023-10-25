const { shouldBehaveLikeERC20Recover } = require('./ERC20Recover.behavior');

const ERC20Recover = artifacts.require('$ERC20Recover');

contract('ERC20Recover', function (accounts) {
  const [owner, receiver] = accounts;

  beforeEach(async function () {
    this.instance = await ERC20Recover.new(owner);
  });

  shouldBehaveLikeERC20Recover(owner, receiver);
});
