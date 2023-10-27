const vars = require('./.env.json');

const title = 'ETH Token Recover | Recover any ERC20 or NFT (ERC721) Token';
const description =
  'TokenRecover allows to recover any ERC20 or NFT (ERC721) token sent into the contract and send them to a receiver.';
const url = 'https://vittominacori.github.io/eth-token-recover';
const image = '';

module.exports = {
  title: 'Recover any ERC20 or NFT (ERC721) Token',
  description: description,
  base: '/eth-token-recover/',
  plugins: [
    [
      'google-gtag',
      {
        ga: vars.gaId,
      },
    ],
  ],
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'title', property: 'og:title', content: title }],
    ['meta', { name: 'description', property: 'og:description', content: description }],
    ['meta', { name: 'image', property: 'og:image', content: image }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: image }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'twitter:title', content: title }],
    ['meta', { property: 'twitter:description', content: description }],
    ['meta', { property: 'twitter:image', content: image }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
  ],
  themeConfig: {
    repo: 'vittominacori/eth-token-recover',
    sidebar: 'auto',
  },
};
