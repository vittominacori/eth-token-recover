const shouldFail = require('openzeppelin-solidity/test/helpers/shouldFail');

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

const ERC20Mock = artifacts.require('ERC20Mock');

function shouldBehaveLikeTokenRecover ([owner, thirdParty]) {
  describe('recoverERC20', function () {
    const amount = 100;

    beforeEach(async function () {
      this.anotherERC20 = await ERC20Mock.new(this.instance.address, amount, { from: owner });
    });

    describe('if owner is calling', function () {
      it('should recover any ERC20', async function () {
        (await this.anotherERC20.balanceOf(this.instance.address)).should.be.bignumber.equal(amount);
        (await this.anotherERC20.balanceOf(owner)).should.be.bignumber.equal(0);

        await this.instance.recoverERC20(this.anotherERC20.address, amount, { from: owner });

        (await this.anotherERC20.balanceOf(this.instance.address)).should.be.bignumber.equal(0);
        (await this.anotherERC20.balanceOf(owner)).should.be.bignumber.equal(amount);
      });
    });

    describe('if third party is calling', function () {
      it('reverts', async function () {
        await shouldFail.reverting(
          this.instance.recoverERC20(this.anotherERC20.address, amount, { from: thirdParty })
        );
      });
    });
  });
}

module.exports = {
  shouldBehaveLikeTokenRecover,
};
