const { constants, expectEvent } = require('@openzeppelin/test-helpers');
const { expectRevertCustomError } = require('../helpers/customError');

const { expect } = require('chai');

function shouldBehaveLikeOwnable(owner, other) {
  describe('like an Ownable', function () {
    it('has an owner', async function () {
      expect(await this.instance.owner()).to.equal(owner);
    });

    describe('transfer ownership', function () {
      it('changes owner after transfer', async function () {
        const receipt = await this.instance.transferOwnership(other, { from: owner });
        expectEvent(receipt, 'OwnershipTransferred');

        expect(await this.instance.owner()).to.equal(other);
      });

      it('prevents non-owners from transferring', async function () {
        await expectRevertCustomError(
          this.instance.transferOwnership(other, { from: other }),
          'OwnableUnauthorizedAccount',
          [other],
        );
      });

      it('guards ownership against stuck state', async function () {
        await expectRevertCustomError(
          this.instance.transferOwnership(constants.ZERO_ADDRESS, { from: owner }),
          'OwnableInvalidOwner',
          [constants.ZERO_ADDRESS],
        );
      });
    });

    describe('renounce ownership', function () {
      it('loses ownership after renouncement', async function () {
        const receipt = await this.instance.renounceOwnership({ from: owner });
        expectEvent(receipt, 'OwnershipTransferred');

        expect(await this.instance.owner()).to.equal(constants.ZERO_ADDRESS);
      });

      it('prevents non-owners from renouncement', async function () {
        await expectRevertCustomError(this.instance.renounceOwnership({ from: other }), 'OwnableUnauthorizedAccount', [
          other,
        ]);
      });

      it('allows to recover access using the internal _transferOwnership', async function () {
        await this.instance.renounceOwnership({ from: owner });
        const receipt = await this.instance.$_transferOwnership(other);
        expectEvent(receipt, 'OwnershipTransferred');

        expect(await this.instance.owner()).to.equal(other);
      });
    });
  });
}

module.exports = {
  shouldBehaveLikeOwnable,
};
