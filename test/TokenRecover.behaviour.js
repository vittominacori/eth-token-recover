const { assertRevert } = require('./helpers/assertRevert');

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

const BasicTokenMock = artifacts.require('BasicTokenMock');

function shouldBehaveLikeTokenRecover ([owner, thirdParty]) {
  describe('recoverERC20', function () {
    const tokenAmount = new BigNumber(1000);

    beforeEach(async function () {
      this.anotherERC20 = await BasicTokenMock.new(this.instance.address, tokenAmount, { from: owner });
    });

    describe('if owner is calling', function () {
      it('should safe transfer any ERC20 sent for error into the contract', async function () {
        const contractPre = await this.anotherERC20.balanceOf(this.instance.address);
        contractPre.should.be.bignumber.equal(tokenAmount);
        const ownerPre = await this.anotherERC20.balanceOf(owner);
        ownerPre.should.be.bignumber.equal(0);

        await this.instance.recoverERC20(this.anotherERC20.address, tokenAmount, { from: owner });

        const contractPost = await this.anotherERC20.balanceOf(this.instance.address);
        contractPost.should.be.bignumber.equal(0);
        const ownerPost = await this.anotherERC20.balanceOf(owner);
        ownerPost.should.be.bignumber.equal(tokenAmount);
      });
    });

    describe('if third party is calling', function () {
      it('reverts', async function () {
        await assertRevert(
          this.instance.recoverERC20(this.anotherERC20.address, tokenAmount, { from: thirdParty })
        );
      });
    });
  });
}

module.exports = {
  shouldBehaveLikeTokenRecover,
};
