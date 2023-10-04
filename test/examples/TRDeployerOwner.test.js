const { expect } = require('chai');

const { shouldBehaveLikeTokenRecover } = require('../TokenRecover.behaviour');

const TokenRecover = artifacts.require('$TRDeployerOwner');

contract('TRDeployerOwner', function (accounts) {
  const [owner, other] = accounts;

  describe('creating valid contract', function () {
    it('deployer should be owner', async function () {
      const tokenRecover = await TokenRecover.new({ from: owner });

      expect(await tokenRecover.owner()).to.equal(owner);
    });
  });

  describe('once deployed', function () {
    beforeEach(async function () {
      this.instance = await TokenRecover.new();
    });

    shouldBehaveLikeTokenRecover(owner, other);
  });
});
