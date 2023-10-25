const { expect } = require('chai');

const { shouldBehaveLikeTokenRecover } = require('../TokenRecover.behavior');

const TRDeployerOwner = artifacts.require('$TRDeployerOwner');

contract('TRDeployerOwner', function (accounts) {
  const [owner, other] = accounts;

  describe('creating valid contract', function () {
    it('deployer should be owner', async function () {
      const tokenRecover = await TRDeployerOwner.new({ from: owner });

      expect(await tokenRecover.owner()).to.equal(owner);
    });
  });

  describe('once deployed', function () {
    beforeEach(async function () {
      this.instance = await TRDeployerOwner.new();
    });

    shouldBehaveLikeTokenRecover(owner, other);
  });
});
