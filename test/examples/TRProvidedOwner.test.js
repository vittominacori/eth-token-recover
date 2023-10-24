const { constants } = require('@openzeppelin/test-helpers');
const { expectRevertCustomError } = require('../helpers/customError');

const { shouldBehaveLikeTokenRecover } = require('../behaviors/TokenRecover.behavior');

const TokenRecover = artifacts.require('$TRProvidedOwner');

contract('TRProvidedOwner', function (accounts) {
  const [owner, other] = accounts;

  describe('creating valid contract', function () {
    it('rejects zero address for initialOwner', async function () {
      await expectRevertCustomError(TokenRecover.new(constants.ZERO_ADDRESS, { from: owner }), 'OwnableInvalidOwner', [
        constants.ZERO_ADDRESS,
      ]);
    });
  });

  describe('once deployed', function () {
    beforeEach(async function () {
      this.instance = await TokenRecover.new(owner);
    });

    shouldBehaveLikeTokenRecover(owner, other);
  });
});
