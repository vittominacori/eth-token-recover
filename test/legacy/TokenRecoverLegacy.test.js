const { shouldBehaveLikeTokenRecoverLegacy } = require('./TokenRecoverLegacy.behavior');

const TokenRecoverLegacy = artifacts.require('$TokenRecoverLegacy');

contract('TokenRecoverLegacy', function (accounts) {
  const [owner, anotherAccount] = accounts;

  describe('once deployed', function () {
    beforeEach(async function () {
      this.instance = await TokenRecoverLegacy.new();
    });

    it('deployer should be owner', async function () {
      expect(await this.instance.owner()).to.equal(owner);
    });

    shouldBehaveLikeTokenRecoverLegacy(owner, anotherAccount);
  });
});
