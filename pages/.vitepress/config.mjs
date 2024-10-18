import { defineConfig } from 'vitepress';

const vars = require('./.env.json');

const title = 'ETH Token Recover | Recover any ERC-20 or NFT (ERC-721) Token';
const description =
  'TokenRecover allows to recover any ERC-20 or NFT (ERC-721) token sent into the contract and sends them to a receiver.';
const url = 'https://vittominacori.github.io/eth-token-recover';
const image = 'https://vittominacori.github.io/eth-token-recover/images/eth-token-recover.jpg';
const repo = 'https://github.com/vittominacori/eth-token-recover.git';

export default defineConfig({
  title: 'Recover any ERC-20 or NFT (ERC-721) Token',
  titleTemplate: 'Reference implementation',
  description: description,
  base: '/eth-token-recover/',
  head: [
    ['link', { rel: 'shortcut icon', href: '/eth-token-recover/favicon.ico' }],
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
    ['script', { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${vars.gaId}` }],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${vars.gaId}');`,
    ],
  ],
  themeConfig: {
    siteTitle: 'ETH Token Recover',
    socialLinks: [{ icon: 'github', link: repo }],
    search: {
      provider: 'local',
    },
  },
});
