const { shouldBehaveLikeNFTRecover } = require('./behaviors/NFTRecover.behavior');

const TokenRecover = artifacts.require('$NFTRecover');

contract('NFTRecover', function (accounts) {
  const [owner, other] = accounts;

  beforeEach(async function () {
    this.instance = await TokenRecover.new(owner);
  });

  shouldBehaveLikeNFTRecover(owner, other);
});
