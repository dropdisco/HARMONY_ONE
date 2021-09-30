import { BigintIsh, ChainId, defaultSwapFee, FACTORY_ADDRESS, INIT_CODE_HASH, ROUTER_ADDRESS, _30 } from '../constants'

const UNISWAP_FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
const SUSHISWAP_FACTORY_ADDRESS = '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac'
const VIPERSWAP_FACTORY_ADDRESS = '0x7D02c116b98d0965ba7B642ace0183ad8b8D2196' // mainnet
const SWOOP_FACTORY_ADDRESS = '0x8F7F3708CF68759E2FEC78746545882039B1F31f' 
const SWOOP_FACTORY_TESTNET = '0x3A3289aF62600bd7FF0811B546964F8C6a63dC72 ' 
// viperLP TESTNET:: 0x16d34ea43d76fb55b613748f15cfbe011b36227a
const UNISWAP_ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
const SUSHISWAP_ROUTER_ADDRESS = '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F'
const VIPERSWAP_ROUTER_ADDRESS = '0xf012702a5f0e54015362cBCA26a26fc90AA832a3' // mainnet //
const SWOOP_ROUTER_ADDRESS = '0x0a91275aC54680E4ffAdB942d4E450AfECBA129f' 
const SWOOP_ROUTER_ADDRESS_TESTNET = '0x78CE7F8691A3f9be2E953c7AE5ba48B8E36B5bb5 ' 


export class RoutablePlatform {
  public readonly name: string
  public readonly factoryAddress: { [supportedChainId in ChainId]?: string }
  public readonly routerAddress: { [supportedChainId in ChainId]?: string }
  public readonly initCodeHash: string
  public readonly defaultSwapFee: BigintIsh

  public static readonly DEXSWAP = new RoutablePlatform(
    'DEXSWAP',
    FACTORY_ADDRESS,
    ROUTER_ADDRESS,
    INIT_CODE_HASH,
    defaultSwapFee
  )
  public static readonly UNISWAP = new RoutablePlatform(
    'Uniswap',
    { [ChainId.MAINNET]: UNISWAP_FACTORY_ADDRESS, [ChainId.RINKEBY]: UNISWAP_FACTORY_ADDRESS },
    { [ChainId.MAINNET]: UNISWAP_ROUTER_ADDRESS, [ChainId.RINKEBY]: UNISWAP_ROUTER_ADDRESS },
    '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
    _30
  )
  public static readonly SUSHISWAP = new RoutablePlatform(
    'Sushiswap',
    { [ChainId.MAINNET]: SUSHISWAP_FACTORY_ADDRESS, [ChainId.RINKEBY]: SUSHISWAP_FACTORY_ADDRESS },
    { [ChainId.MAINNET]: SUSHISWAP_ROUTER_ADDRESS, [ChainId.RINKEBY]: SUSHISWAP_ROUTER_ADDRESS },
    '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
    _30
  )

  public static readonly VIPERSWAP = new RoutablePlatform(
    'Viperswap',
    { [ChainId.HARMONY]: VIPERSWAP_FACTORY_ADDRESS},
    { [ChainId.HARMONY]: VIPERSWAP_ROUTER_ADDRESS},
    '0x162f79e638367cd45a118c778971dfd8d96c625d2798d3b71994b035cfe9b6dc',
    _30
  )

  public static readonly SWOOP = new RoutablePlatform(
    'Swoop',
    { [ChainId.HARMONY]: SWOOP_FACTORY_ADDRESS, [ChainId.HARMONY_TESTNET]: SWOOP_FACTORY_TESTNET },
    { [ChainId.HARMONY]: SWOOP_ROUTER_ADDRESS, [ChainId.HARMONY_TESTNET]: SWOOP_ROUTER_ADDRESS_TESTNET },
    '0xe3c4d7c2f0f0eb6af0a666a9b54ea1196dd3676e4e4b696af853d8951f807cc5',
    _30
  )


  public constructor(
    name: string,
    factoryAddress: { [supportedChainId in ChainId]?: string },
    routerAddress: { [supportedChainId in ChainId]?: string },
    initCodeHash: string,
    defaultSwapFee: BigintIsh
  ) {
    this.name = name
    this.factoryAddress = factoryAddress
    this.routerAddress = routerAddress
    this.initCodeHash = initCodeHash
    this.defaultSwapFee = defaultSwapFee
  }

  public supportsChain(chainId: ChainId): boolean {
    return !!this.factoryAddress[chainId]
  }
}
