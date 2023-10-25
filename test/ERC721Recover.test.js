const { shouldBehaveLikeERC721Recover } = require('./ERC721Recover.behavior');

const ERC721Recover = artifacts.require('$ERC721Recover');

contract('ERC721Recover', function (accounts) {
  const [owner, receiver] = accounts;

  beforeEach(async function () {
    this.instance = await ERC721Recover.new(owner);
  });

  shouldBehaveLikeERC721Recover(owner, receiver);
});
