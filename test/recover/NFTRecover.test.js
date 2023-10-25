const { shouldBehaveLikeNFTRecover } = require('./NFTRecover.behavior');
const { BN } = require('@openzeppelin/test-helpers');

const NFTRecover = artifacts.require('$NFTRecover');
const ERC721 = artifacts.require('$ERC721Mock');

contract('NFTRecover', function (accounts) {
  const [receiver] = accounts;

  const tokenId = new BN('5042');

  beforeEach(async function () {
    this.instance = await NFTRecover.new();

    this.erc721ToRecover = await ERC721.new();
    await this.erc721ToRecover.$_mint(receiver, tokenId);
    await this.erc721ToRecover.transferFrom(receiver, this.instance.address, tokenId);
  });

  shouldBehaveLikeNFTRecover(receiver, tokenId);
});
