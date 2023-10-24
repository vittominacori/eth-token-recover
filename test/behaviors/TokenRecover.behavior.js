const { shouldBehaveLikeERC20Recover } = require('./ERC20Recover.behavior');

function shouldBehaveLikeTokenRecover(owner, other) {
  context('as a TokenRecover', function () {
    shouldBehaveLikeERC20Recover(owner, other);
  });
}

module.exports = {
  shouldBehaveLikeTokenRecover,
};
