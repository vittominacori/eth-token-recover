const { BN } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { expectRevertCustomError } = require('./helpers/customError');

const { shouldBehaveLikeERC20Recover } = require('./recover/ERC20Recover.behavior');

const { shouldBehaveLikeOwnable } = require('./access/Ownable.behavior');

const ERC20 = artifacts.require('$ERC20Mock');

function shouldBehaveLikeTokenRecover(owner, receiver) {
  context('as a TokenRecover', function () {
    const amount = new BN(100);

    beforeEach(async function () {
      this.erc20ToRecover = await ERC20.new();
      await this.erc20ToRecover.$_mint(owner, amount);

      await this.erc20ToRecover.transfer(this.instance.address, amount, { from: owner });
    });

    shouldBehaveLikeERC20Recover(receiver, amount);

    describe('TokenRecover behavior', function () {
      describe('recoverERC20', function () {
        const amount = new BN(100);

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
    });
    context('testing ownership', function () {
      shouldBehaveLikeOwnable(owner, receiver);
    });
  });
}

module.exports = {
  shouldBehaveLikeTokenRecover,
};
