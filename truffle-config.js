module.exports = {
  compilers: {
    solc: {
      version: '0.8.23',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
