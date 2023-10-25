const { shouldBehaveLikeERC20Recover } = require('./ERC20Recover.behavior');
const { shouldBehaveLikeNFTRecover } = require('./NFTRecover.behavior');

function shouldBehaveLikeTokenRecover(owner, other) {
  context('as a TokenRecover', function () {
    shouldBehaveLikeERC20Recover(owner, other);
    shouldBehaveLikeNFTRecover(owner, other);
  });
}

module.exports = {
  shouldBehaveLikeTokenRecover,
};
