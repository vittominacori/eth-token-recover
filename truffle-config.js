module.exports = {
  compilers: {
    solc: {
      version: '0.8.24',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
