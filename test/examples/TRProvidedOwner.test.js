const { constants } = require('@openzeppelin/test-helpers');
const { expectRevertCustomError } = require('../helpers/customError');

const { shouldBehaveLikeTokenRecover } = require('../TokenRecover.behavior');
const { expect } = require('chai');

const TRProvidedOwner = artifacts.require('$TRProvidedOwner');

contract('TRProvidedOwner', function (accounts) {
  const [owner, other] = accounts;

  describe('creating valid contract', function () {
    it('rejects zero address for initialOwner', async function () {
      await expectRevertCustomError(
        TRProvidedOwner.new(constants.ZERO_ADDRESS, { from: owner }),
        'OwnableInvalidOwner',
        [constants.ZERO_ADDRESS],
      );
    });

    it('provided address should be owner', async function () {
      const tokenRecover = await TRProvidedOwner.new(owner, { from: owner });

      expect(await tokenRecover.owner()).to.equal(owner);
    });
  });

  describe('once deployed', function () {
    beforeEach(async function () {
      this.instance = await TRProvidedOwner.new(owner);
    });

    shouldBehaveLikeTokenRecover(owner, other);
  });
});
