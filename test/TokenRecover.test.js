const { shouldBehaveLikeTokenRecover } = require('./TokenRecover.behaviour');

const TokenRecover = artifacts.require('$TokenRecover');

contract('TokenRecover', function (accounts) {
  const [owner, other] = accounts;

  beforeEach(async function () {
    this.instance = await TokenRecover.new(owner);
  });

  shouldBehaveLikeTokenRecover(owner, other);
});
