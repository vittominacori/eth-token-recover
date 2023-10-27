const { BN } = require('@openzeppelin/test-helpers');
const { expectRevertCustomError } = require('../helpers/customError');

const { expect } = require('chai');

const { shouldBehaveLikeRecoverERC20 } = require('../recover/RecoverERC20.behavior');

const { shouldBehaveLikeOwnable } = require('../access/Ownable.behavior');

const ERC20 = artifacts.require('$ERC20Mock');

function shouldBehaveLikeTokenRecoverLegacy(owner, anotherAccount) {
  const amount = new BN(100);

  beforeEach(async function () {
    this.erc20ToRecover = await ERC20.new();
    await this.erc20ToRecover.$_mint(owner, amount);
    await this.erc20ToRecover.transfer(this.instance.address, amount, { from: owner });
  });

  shouldBehaveLikeRecoverERC20(owner, amount);

  describe('TokenRecoverLegacy behavior', function () {
    describe('recoverERC20', function () {
      describe('if owner is calling', function () {
        it('should recover any ERC20', async function () {
          expect(await this.erc20ToRecover.balanceOf(this.instance.address)).to.be.bignumber.equal(amount);
          expect(await this.erc20ToRecover.balanceOf(owner)).to.be.bignumber.equal('0');

          await this.instance.recoverERC20(this.erc20ToRecover.address, amount, { from: owner });

          expect(await this.erc20ToRecover.balanceOf(this.instance.address)).to.be.bignumber.equal('0');
          expect(await this.erc20ToRecover.balanceOf(owner)).to.be.bignumber.equal(amount);
        });
      });

      describe('if non-owners are calling', function () {
        it('reverts', async function () {
          await expectRevertCustomError(
            this.instance.recoverERC20(this.erc20ToRecover.address, amount, { from: anotherAccount }),
            'OwnableUnauthorizedAccount',
            [anotherAccount],
          );
        });
      });
    });

    context('testing ownership', function () {
      shouldBehaveLikeOwnable(owner, anotherAccount);
    });
  });
}

module.exports = {
  shouldBehaveLikeTokenRecoverLegacy,
};
