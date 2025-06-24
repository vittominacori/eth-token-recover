function shouldBehaveLikeRecoverERC721(receiver, tokenId) {
  const data = '0x42';

  context('like an RecoverERC721', function () {
    describe('_recoverERC721', function () {
      it('transfer the ERC721 token to receiver', async function () {
        expect(await this.erc721ToRecover.ownerOf(tokenId)).to.be.equal(this.instance.address);

        expect(await this.erc721ToRecover.balanceOf(this.instance.address)).to.be.bignumber.equal('1');
        expect(await this.erc721ToRecover.balanceOf(receiver)).to.be.bignumber.equal('0');

        await this.instance.$_recoverERC721(this.erc721ToRecover.address, receiver, tokenId, data);

        expect(await this.erc721ToRecover.ownerOf(tokenId)).to.be.equal(receiver);

        expect(await this.erc721ToRecover.balanceOf(this.instance.address)).to.be.bignumber.equal('0');
        expect(await this.erc721ToRecover.balanceOf(receiver)).to.be.bignumber.equal('1');
      });
    });
  });
}

module.exports = {
  shouldBehaveLikeRecoverERC721,
};
