const { shouldBehaveLikeTokenRecover } = require('./TokenRecover.behaviour');

const TokenRecover = artifacts.require('$TokenRecover');

contract('TokenRecover', function ([owner, other]) {
  beforeEach(async function () {
    this.instance = await TokenRecover.new(owner);
  });

  shouldBehaveLikeTokenRecover([owner, other]);
});
