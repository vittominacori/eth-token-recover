const { BN } = require('@openzeppelin/test-helpers');

const { shouldBehaveLikeERC721Recover } = require('./ERC721Recover.behavior');

const ERC721Recover = artifacts.require('$ERC721Recover');

const ERC721 = artifacts.require('$ERC721Mock');

contract('ERC721Recover', function (accounts) {
  const [owner, receiver] = accounts;

  const tokenId = new BN('5042');

  beforeEach(async function () {
    this.instance = await ERC721Recover.new();

    this.erc721ToRecover = await ERC721.new();
    await this.erc721ToRecover.$_mint(owner, tokenId);
    await this.erc721ToRecover.transferFrom(owner, this.instance.address, tokenId, { from: owner });
  });

  shouldBehaveLikeERC721Recover(receiver, tokenId);
});
