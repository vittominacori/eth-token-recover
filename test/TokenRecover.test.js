const { shouldBehaveLikeTokenRecover } = require('./TokenRecover.behavior');

const TokenRecover = artifacts.require('$TokenRecover');

contract('TokenRecover', function (accounts) {
  const [owner, receiver] = accounts;

  beforeEach(async function () {
    this.instance = await TokenRecover.new(owner);
  });

  shouldBehaveLikeTokenRecover(owner, receiver);
});
