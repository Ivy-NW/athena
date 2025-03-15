require("@nomicfoundation/hardhat-ignition/modules");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    sepolia: {
      url: process.env.ALCHEMY_API_KEY_SEPOLIA,
      accounts: [process.env.WALLET_PRIVATE_KEY],
      // timeout: 60000,
    },

    lisk: {
      url: "https://rpc.api.lisk.com",
      accounts: [process.env.WALLET_PRIVATE_KEY],
      gasPrice: 1000000000,
    },

    "lisk-sepolia": {
      url: "https://rpc.sepolia-api.lisk.com",
      accounts: [process.env.WALLET_PRIVATE_KEY],
      gasPrice: 1000000000,
    },

    ethereum: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MAIN}`,
      accounts: [process.env.WALLET_PRIVATE_KEY],
      chainId: 44787,
    },

    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.WALLET_PRIVATE_KEY],
      chainId: 44787,
    },

    celo: {
      url: "https://forno.celo.org",
      accounts: [process.env.WALLET_PRIVATE_KEY],
      chainId: 42220,
    },
    opencampus: {
      url: `https://rpc.open-campus-codex.gelato.digital/`,
      accounts: [process.env.WALLET_PRIVATE_KEY],
      chainId: 656476,
    },
  },

  // ethereum - celo - explorer API keys
  etherscan: {
    apiKey: {
      opencampus: "your-etherscan-api-key",
    },
    customChains: [
      {
        network: "opencampus",
        chainId: 656476,
        urls: {
          apiURL: "https://opencampus-codex.blockscout.com/api",
          browserURL: "https://opencampus-codex.blockscout.com",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },

  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
};
