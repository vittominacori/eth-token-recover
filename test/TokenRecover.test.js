const { constants } = require('@openzeppelin/test-helpers');
const { expectRevertCustomError } = require('./helpers/customError');

const { shouldBehaveLikeTokenRecover } = require('./TokenRecover.behavior');

const TokenRecover = artifacts.require('$TokenRecover');

contract('TokenRecover', function (accounts) {
  const [owner, receiver] = accounts;

  describe('creating valid contract', function () {
    it('rejects zero address for owner', async function () {
      await expectRevertCustomError(TokenRecover.new(constants.ZERO_ADDRESS), 'OwnableInvalidOwner', [
        constants.ZERO_ADDRESS,
      ]);
    });
  });

  describe('once deployed', function () {
    beforeEach(async function () {
      this.instance = await TokenRecover.new(owner);
    });

    shouldBehaveLikeTokenRecover(owner, receiver);
  });
});
