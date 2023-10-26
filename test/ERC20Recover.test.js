const { constants } = require('@openzeppelin/test-helpers');
const { expectRevertCustomError } = require('./helpers/customError');

const { shouldBehaveLikeERC20Recover } = require('./ERC20Recover.behavior');

const ERC20Recover = artifacts.require('$ERC20Recover');

contract('ERC20Recover', function (accounts) {
  const [owner, receiver] = accounts;

  describe('creating valid contract', function () {
    it('rejects zero address for owner', async function () {
      await expectRevertCustomError(ERC20Recover.new(constants.ZERO_ADDRESS), 'OwnableInvalidOwner', [
        constants.ZERO_ADDRESS,
      ]);
    });
  });

  describe('once deployed', function () {
    beforeEach(async function () {
      this.instance = await ERC20Recover.new(owner);
    });

    shouldBehaveLikeERC20Recover(owner, receiver);
  });
});
