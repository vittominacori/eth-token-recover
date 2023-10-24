const { shouldBehaveLikeERC20Recover } = require('./ERC20Recover.behavior');

function shouldBehaveLikeTokenRecover(owner, other) {
  shouldBehaveLikeERC20Recover(owner, other);
}

module.exports = {
  shouldBehaveLikeTokenRecover,
};
