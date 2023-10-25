const { BN } = require('@openzeppelin/test-helpers');
const { expectRevertCustomError } = require('../helpers/customError');

const { expect } = require('chai');

const { shouldBehaveLikeOwnable } = require('../access/Ownable.behavior');

const ERC721 = artifacts.require('$ERC721Mock');

function shouldBehaveLikeNFTRecover(owner, other) {
  context('as a NFTRecover', function () {
    describe('recoverERC721', function () {
      const tokenId = new BN('5042');

      beforeEach(async function () {
        this.erc721ToRecover = await ERC721.new();
        await this.erc721ToRecover.$_mint(owner, tokenId);

        await this.erc721ToRecover.transferFrom(owner, this.instance.address, tokenId, { from: owner });
      });

      describe('if owner is calling', function () {
        it('should recover any ERC721', async function () {
          expect(await this.erc721ToRecover.ownerOf(tokenId)).to.be.equal(this.instance.address);

          expect(await this.erc721ToRecover.balanceOf(this.instance.address)).to.be.bignumber.equal('1');
          expect(await this.erc721ToRecover.balanceOf(owner)).to.be.bignumber.equal('0');

          await this.instance.recoverERC721(this.erc721ToRecover.address, tokenId, { from: owner });

          expect(await this.erc721ToRecover.ownerOf(tokenId)).to.be.equal(owner);

          expect(await this.erc721ToRecover.balanceOf(this.instance.address)).to.be.bignumber.equal('0');
          expect(await this.erc721ToRecover.balanceOf(owner)).to.be.bignumber.equal('1');
        });
      });

      describe('if non-owners are calling', function () {
        it('reverts', async function () {
          await expectRevertCustomError(
            this.instance.recoverERC721(this.erc721ToRecover.address, tokenId, { from: other }),
            'OwnableUnauthorizedAccount',
            [other],
          );
        });
      });
    });

    context('testing ownership', function () {
      shouldBehaveLikeOwnable(owner, other);
    });
  });
}

module.exports = {
  shouldBehaveLikeNFTRecover,
};
