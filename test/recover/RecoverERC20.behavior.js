const { expect } = require('chai');

function shouldBehaveLikeRecoverERC20(receiver, amount) {
  context('like a RecoverERC20', function () {
    describe('_recoverERC20', function () {
      it('transfer the ERC20 tokens to receiver', async function () {
        expect(await this.erc20ToRecover.balanceOf(this.instance.address)).to.be.bignumber.equal(amount);
        expect(await this.erc20ToRecover.balanceOf(receiver)).to.be.bignumber.equal('0');

        await this.instance.$_recoverERC20(this.erc20ToRecover.address, receiver, amount);

        expect(await this.erc20ToRecover.balanceOf(this.instance.address)).to.be.bignumber.equal('0');
        expect(await this.erc20ToRecover.balanceOf(receiver)).to.be.bignumber.equal(amount);
      });
    });
  });
}

module.exports = {
  shouldBehaveLikeRecoverERC20,
};
