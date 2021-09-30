const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv = require('dotenv');
dotenv.config();

const mnemonic = process.env.MNEMONIC;
// const { TruffleProvider } = require('@harmony-js/core');




module.exports = {
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {

    ganache: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    harmony: {
      provider: () => {
        return new HDWalletProvider({
          mnemonic,
          providerOrUrl: 'https://api.s0.t.hmny.io',
          derivationPath: `m/44'/1023'/0'/0/`
        });
      },
      network_id: 1666600000, // 1666600000 for mainnet
    }, 
    harmony_testnet: {
      provider: () => {
        return new HDWalletProvider({
          mnemonic,
          providerOrUrl: 'https://api.s0.b.hmny.io', // https://api.s0.t.hmny.io for mainnet
          derivationPath: `m/44'/1023'/0'/0/`
        });
      },
      network_id: 1666700000, // 1666600000 for mainnet
    }, 
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  },
  build: {},
  compilers: {
    solc: {
      version: '0.5.16',
      settings: {
        evmVersion: 'istanbul',
      }
    }
  },
  mocha: {
    // timeout: 100000
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
};
