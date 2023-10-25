const { BN } = require('@openzeppelin/test-helpers');
const { expectRevertCustomError } = require('./helpers/customError');

const { expect } = require('chai');

const { shouldBehaveLikeRecoverERC721 } = require('./recover/RecoverERC721.behavior');

const { shouldBehaveLikeOwnable } = require('./access/Ownable.behavior');

const ERC721 = artifacts.require('$ERC721Mock');

function shouldBehaveLikeERC721Recover(owner, receiver) {
  const tokenId = new BN('5042');
  const data = '0x42';

  beforeEach(async function () {
    this.erc721ToRecover = await ERC721.new();
    await this.erc721ToRecover.$_mint(owner, tokenId);
    await this.erc721ToRecover.transferFrom(owner, this.instance.address, tokenId, { from: owner });
  });

  shouldBehaveLikeRecoverERC721(receiver, tokenId);

  describe('ERC721Recover behavior', function () {
    describe('recoverERC721', function () {
      describe('if owner is calling', function () {
        it('should recover any ERC721', async function () {
          expect(await this.erc721ToRecover.ownerOf(tokenId)).to.be.equal(this.instance.address);

          expect(await this.erc721ToRecover.balanceOf(this.instance.address)).to.be.bignumber.equal('1');
          expect(await this.erc721ToRecover.balanceOf(receiver)).to.be.bignumber.equal('0');

          await this.instance.recoverERC721(this.erc721ToRecover.address, receiver, tokenId, data, { from: owner });

          expect(await this.erc721ToRecover.ownerOf(tokenId)).to.be.equal(receiver);

          expect(await this.erc721ToRecover.balanceOf(this.instance.address)).to.be.bignumber.equal('0');
          expect(await this.erc721ToRecover.balanceOf(receiver)).to.be.bignumber.equal('1');
        });
      });

      describe('if non-owners are calling', function () {
        it('reverts', async function () {
          await expectRevertCustomError(
            this.instance.recoverERC721(this.erc721ToRecover.address, receiver, tokenId, data, { from: receiver }),
            'OwnableUnauthorizedAccount',
            [receiver],
          );
        });
      });
    });

    context('testing ownership', function () {
      shouldBehaveLikeOwnable(owner, receiver);
    });
  });
}

module.exports = {
  shouldBehaveLikeERC721Recover,
};
