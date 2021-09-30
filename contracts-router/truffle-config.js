const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv = require('dotenv');
dotenv.config();

const mnemonic = process.env.MNEMONIC;
const privateKey1 = process.env.PRIVATE_KEY_1;
const privateKey2 = process.env.PRIVATE_KEY_2;
const privateKey3 = process.env.PRIVATE_KEY_3;
console.log(`MNEMONIC: ${process.env.MNEMONIC}`)
console.log(`INFURA_API_KEY: ${process.env.INFURA_API_KEY}`)


module.exports = {
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ganache: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`),
      network_id: 4,
      gas: 0,
      gasPrice: 2100000001, //3 Gwei,
      skipDryRun: true
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
    }
    
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
      version: '^0.6.6',
      settings: {
        evmVersion: 'istanbul',
      }
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
};
