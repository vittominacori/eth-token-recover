const { BN } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { expectRevertCustomError } = require('./helpers/customError');

const { shouldBehaveLikeERC20Recover } = require('./recover/ERC20Recover.behavior');
const { shouldBehaveLikeNFTRecover } = require('./recover/NFTRecover.behavior');

const { shouldBehaveLikeOwnable } = require('./access/Ownable.behavior');

const ERC20 = artifacts.require('$ERC20Mock');
const ERC721 = artifacts.require('$ERC721Mock');

function shouldBehaveLikeTokenRecover(owner, receiver) {
  context('as a TokenRecover', function () {
    const amount = new BN(100);
    const tokenId = new BN('5042');
    const data = '0x42';

    beforeEach(async function () {
      this.erc20ToRecover = await ERC20.new();
      await this.erc20ToRecover.$_mint(owner, amount);
      await this.erc20ToRecover.transfer(this.instance.address, amount, { from: owner });

      this.erc721ToRecover = await ERC721.new();
      await this.erc721ToRecover.$_mint(owner, tokenId);
      await this.erc721ToRecover.transferFrom(owner, this.instance.address, tokenId, { from: owner });
    });

    shouldBehaveLikeERC20Recover(receiver, amount);
    shouldBehaveLikeNFTRecover(receiver, tokenId);

    describe('TokenRecover behavior', function () {
      describe('recoverERC20', function () {
        describe('if owner is calling', function () {
          it('should recover any ERC20', async function () {
            expect(await this.erc20ToRecover.balanceOf(this.instance.address)).to.be.bignumber.equal(amount);
            expect(await this.erc20ToRecover.balanceOf(receiver)).to.be.bignumber.equal('0');

            await this.instance.recoverERC20(this.erc20ToRecover.address, receiver, amount, { from: owner });

            expect(await this.erc20ToRecover.balanceOf(this.instance.address)).to.be.bignumber.equal('0');
            expect(await this.erc20ToRecover.balanceOf(receiver)).to.be.bignumber.equal(amount);
          });
        });

        describe('if non-owners are calling', function () {
          it('reverts', async function () {
            await expectRevertCustomError(
              this.instance.recoverERC20(this.erc20ToRecover.address, receiver, amount, { from: receiver }),
              'OwnableUnauthorizedAccount',
              [receiver],
            );
          });
        });
      });

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
    });

    context('testing ownership', function () {
      shouldBehaveLikeOwnable(owner, receiver);
    });
  });
}

module.exports = {
  shouldBehaveLikeTokenRecover,
};
