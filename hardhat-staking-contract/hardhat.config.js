require("dotenv").config();
require("@nomiclabs/hardhat-truffle5");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require("./tasks/deploy");

const infuraId = process.env.INFURA_ID;
const HARMONY_PRIVATE_KEY = process.env.HARMONY_PK;
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    networks: {
        mainnet: {
            url: `https://mainnet.infura.io/v3/${infuraId}`,
        },
        harmony: {
            url: `https://api.harmony.one`,
            accounts: [`0x${HARMONY_PRIVATE_KEY}`]
        },
        harmony_testnet: {
            url: `https://api.s0.b.hmny.io`,
            accounts: [`0x${HARMONY_PRIVATE_KEY}`]
        }
    },
    solidity: {
        compilers: [
            {
                version: "0.8.4",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.5.16",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    gasReporter: {
        currency: "USD",
        enabled: process.env.GAS_REPORT_ENABLED === "true",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
};
