const { shouldBehaveLikeTokenRecover } = require('./TokenRecover.behaviour');

const TokenRecover = artifacts.require('TokenRecover');

contract('TokenRecover', function ([owner, thirdParty]) {
  beforeEach(async function () {
    this.instance = await TokenRecover.new({ from: owner });
  });

  shouldBehaveLikeTokenRecover([owner, thirdParty]);
});
