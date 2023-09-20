const { BN, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const { shouldBehaveLikeOwnable } = require('./access/Ownable.behavior');

const ERC20Mock = artifacts.require('ERC20Mock');

function shouldBehaveLikeTokenRecover ([owner, thirdParty]) {
  describe('recoverERC20', function () {
    const amount = new BN(100);

    const name = 'TEST';
    const symbol = 'TEST';

    beforeEach(async function () {
      this.anotherERC20 = await ERC20Mock.new(name, symbol, this.instance.address, amount, { from: owner });
    });

    describe('if owner is calling', function () {
      it('should recover any ERC20', async function () {
        expect(await this.anotherERC20.balanceOf(this.instance.address)).to.be.bignumber.equal(amount);
        expect(await this.anotherERC20.balanceOf(owner)).to.be.bignumber.equal(new BN(0));

        await this.instance.recoverERC20(this.anotherERC20.address, amount, { from: owner });

        expect(await this.anotherERC20.balanceOf(this.instance.address)).to.be.bignumber.equal(new BN(0));
        expect(await this.anotherERC20.balanceOf(owner)).to.be.bignumber.equal(amount);
      });
    });

    describe('if third party is calling', function () {
      it('reverts', async function () {
        await expectRevert(
          this.instance.recoverERC20(this.anotherERC20.address, amount, { from: thirdParty }),
          'Ownable: caller is not the owner',
        );
      });
    });
  });

  context('testing ownership', function () {
    beforeEach(async function () {
      this.ownable = this.instance;
    });

    shouldBehaveLikeOwnable(owner, [thirdParty]);
  });
}

module.exports = {
  shouldBehaveLikeTokenRecover,
};
