const { constants } = require('@openzeppelin/test-helpers');
const { expectRevertCustomError } = require('./helpers/customError');

const { shouldBehaveLikeERC721Recover } = require('./ERC721Recover.behavior');

const ERC721Recover = artifacts.require('$ERC721Recover');

contract('ERC721Recover', function (accounts) {
  const [owner, receiver] = accounts;

  describe('creating valid contract', function () {
    it('rejects zero address for owner', async function () {
      await expectRevertCustomError(ERC721Recover.new(constants.ZERO_ADDRESS), 'OwnableInvalidOwner', [
        constants.ZERO_ADDRESS,
      ]);
    });
  });

  describe('once deployed', function () {
    beforeEach(async function () {
      this.instance = await ERC721Recover.new(owner);
    });

    shouldBehaveLikeERC721Recover(owner, receiver);
  });
});
