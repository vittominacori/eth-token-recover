const vars = require('./.env.json');

module.exports = {
  title: 'Recover any ERC20 token lost in your contract',
  description: 'TokenRecover allows the contract owner to recover any ERC20 token sent into the contract for error.',
  base: '/eth-token-recover/',
  plugins: [
    ['@vuepress/google-analytics', {
      ga: vars.gaId,
    }],
  ],
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  themeConfig: {
    repo: 'vittominacori/eth-token-recover',
    sidebar: 'auto',
  },
};
