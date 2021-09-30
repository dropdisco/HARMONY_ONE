
const DexSwapFactory = artifacts.require("IDexSwapFactory");
const DexSwapRouter = artifacts.require("DexSwapRouter");
// const WETH = artifacts.require("WETH");
const WONE = artifacts.require("WONE");
const argValue = (arg, defaultValue) => (process.argv.includes(arg) ? process.argv[process.argv.indexOf(arg) + 1] : defaultValue);
const network = () => argValue("--network", "local");


// HARMONY MAINNET
const FACTORY_HARMONY = "0xE77A7C836720897cd3fBd6c0C0067C5Ca278603F";
const WONE_HARMONY = "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a";// mainnet harmony WETH || WONE


// HARMONY TESTNET
// const FACTORY_HARMONY = "0xAE6fc6e36e1c77701299291978bE227a1d9Eea8A";
// const WONE_HARMONY = "0x7466d7d0C21Fa05F32F5a0Fa27e12bdC06348Ce2";// testnet harmony WETH || WONE

//RINKEBY ROPSTEN 
// const FACTORY_RINKEBY = "0xC9ae161dc43957cD56ed7CaC2cC4e302b44Df374";
// const WETH_RINKEBY = "0xc778417E063141139Fce010982780140Aa0cD5Ab";// rinkeby weth


module.exports = async (deployer) => {
    const BN = web3.utils.toBN;
    const bnWithDecimals = (number, decimals) => BN(number).mul(BN(10).pow(BN(decimals)));
    const senderAccount = (await web3.eth.getAccounts())[0];

    
    if (network() === "harmony_testnet") {


        console.log();
        console.log(":: REUSE FACTORY");
        let DexSwapFactoryInstance = await DexSwapFactory.at(FACTORY_HARMONY);
        console.log(`DEXSWAP FACTORY:`, DexSwapFactoryInstance.address);

        console.log();
        console.log(":: REUSE WONE"); 
        let WETHInstance = await WONE.at(WONE_HARMONY);
        await WETHInstance.deposit({ from: senderAccount, value: 100 });

        console.log();
        console.log(":: DEPLOY ROUTER");
        await deployer.deploy(DexSwapRouter, DexSwapFactoryInstance.address, WETHInstance.address);
        const DexSwapRouterInstance = await DexSwapRouter.deployed();
        console.log(`DEXSWAP ROUTER:`, DexSwapRouterInstance.address);


    } else if (network() === "harmony") {

        console.log();
        console.log(":: REUSE FACTORY");
        let DexSwapFactoryInstance = await DexSwapFactory.at(FACTORY_HARMONY);
        console.log(`DEXSWAP FACTORY:`, DexSwapFactoryInstance.address);

        console.log();
        console.log(":: REUSE WONE"); 
        let WETHInstance = await WONE.at(WONE_HARMONY);
        await WETHInstance.deposit({ from: senderAccount, value: 100 });

        console.log();
        console.log(":: DEPLOY ROUTER");
        await deployer.deploy(DexSwapRouter, DexSwapFactoryInstance.address, WETHInstance.address);
        const DexSwapRouterInstance = await DexSwapRouter.deployed();
        console.log(`DEXSWAP ROUTER:`, DexSwapRouterInstance.address);
    }

};
