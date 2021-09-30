/* eslint-disable prefer-const */
import { Pair, Token, Bundle } from '../types/schema'
import { BigDecimal, BigInt, dataSource } from '@graphprotocol/graph-ts/index'
import { ZERO_BD, ONE_BD } from './helpers'
import {
  getUstNativeCurrencyWrapperPairAddress,
  getUsdcNativeCurrencyWrapperPairAddress,
  getUsdtNativeCurrencyWrapperPair,
  getNativeCurrencyWrapperAddress,
  getLiquidityTrackingTokenAddresses
} from '../commons/addresses'
import { getMinimumLiquidityThresholdNativeCurrency, getMinimumUstThresholdForNewPairs } from '../commons/pricing'

export function getNativeCurrencyPriceInUST(): BigDecimal {
  if (dataSource.network() == 'harmony') {
    return ONE_BD
  }

  let nativeCurrencyWrapperAddress = getNativeCurrencyWrapperAddress()

  // fetch native currency prices for each stablecoin
  let ustPair = Pair.load(getUstNativeCurrencyWrapperPairAddress()) // ust is token0
  let usdcPair = Pair.load(getUsdcNativeCurrencyWrapperPairAddress()) // usdc is token0
  let usdtPair = Pair.load(getUsdtNativeCurrencyWrapperPair()) // usdt is token1

  // all 3 have been created
  if (ustPair !== null && usdcPair !== null && usdtPair !== null) {
    let totalLiquidityNativeCurrency = ustPair.reserve1.plus(usdcPair.reserve1).plus(usdtPair.reserve0)
    let ustWeight = ustPair.reserve1.div(totalLiquidityNativeCurrency)
    let usdcWeight = usdcPair.reserve1.div(totalLiquidityNativeCurrency)
    let usdtWeight = usdtPair.reserve0.div(totalLiquidityNativeCurrency)

    let ustPairPrice = ustPair.token0 == nativeCurrencyWrapperAddress ? ustPair.token1Price : ustPair.token0Price
    let usdcPairPrice = usdcPair.token0 == nativeCurrencyWrapperAddress ? usdcPair.token1Price : usdcPair.token0Price
    let usdtPairPrice = usdtPair.token0 == nativeCurrencyWrapperAddress ? usdtPair.token1Price : usdtPair.token0Price

    return ustPairPrice
      .times(ustWeight)
      .plus(usdcPairPrice.times(usdcWeight))
      .plus(usdtPairPrice.times(usdtWeight))
    // UST (TERRA) and USDC have been created
  } else if (ustPair !== null && usdcPair !== null) {
    let totalLiquidityNativeCurrency = ustPair.reserve1.plus(usdcPair.reserve1)
    let ustWeight = ustPair.reserve1.div(totalLiquidityNativeCurrency)
    let usdcWeight = usdcPair.reserve1.div(totalLiquidityNativeCurrency)

    let ustPairPrice = ustPair.token0 == nativeCurrencyWrapperAddress ? ustPair.token1Price : ustPair.token0Price
    let usdcPairPrice = usdcPair.token0 == nativeCurrencyWrapperAddress ? usdcPair.token1Price : usdcPair.token0Price

    return ustPairPrice.times(ustWeight).plus(usdcPairPrice.times(usdcWeight))
    // USDC is the only pair so far
  } else if (usdcPair !== null) {
    return usdcPair.token0 == nativeCurrencyWrapperAddress ? usdcPair.token1Price : usdcPair.token0Price
  } else if (ustPair !== null) {
    return ustPair.token0 == nativeCurrencyWrapperAddress ? ustPair.token1Price : ustPair.token0Price
  } else {
    return ZERO_BD
  }
}

/**
 * Search through graph to find derived native currency per token.
 * @todo update to be derived native currency (add stablecoin estimates)
 **/
export function findNativeCurrencyPerToken(token: Token): BigDecimal {
  if (token.id == getNativeCurrencyWrapperAddress()) {
    return ONE_BD
  }
  let whitelist = token.whitelistPairs
  // loop through whitelist and check if paired with any
  for (let i = 0; i < whitelist.length; i++) {
    let pairAddress = whitelist[i]
    let pair = Pair.load(pairAddress)
    if (pair.token0 == token.id && pair.reserveNativeCurrency.gt(getMinimumLiquidityThresholdNativeCurrency())) {
      let token1 = Token.load(pair.token1)
      return pair.token1Price.times(token1.derivedNativeCurrency as BigDecimal) // return token1 per our token * native currency per token 1
    }
    if (pair.token1 == token.id && pair.reserveNativeCurrency.gt(getMinimumLiquidityThresholdNativeCurrency())) {
      let token0 = Token.load(pair.token0)
      return pair.token0Price.times(token0.derivedNativeCurrency as BigDecimal) // return token0 per our token * native currency per token 0
    }
  }
  return ZERO_BD // nothing was found return 0
}

/**
 * Accepts tokens and amounts, return tracked amount based on token whitelist
 * If one token on whitelist, return amount in that token converted to UST.
 * If both are, return average of two amounts
 * If neither is, return 0
 */
export function getTrackedVolumeUST(
  tokenAmount0: BigDecimal,
  token0: Token,
  tokenAmount1: BigDecimal,
  token1: Token,
  pair: Pair
): BigDecimal {
  let bundle = Bundle.load('1')
  let price0 = token0.derivedNativeCurrency.times(bundle.nativeCurrencyPrice)
  let price1 = token1.derivedNativeCurrency.times(bundle.nativeCurrencyPrice)

  let whitelist = getLiquidityTrackingTokenAddresses()
  // if less than 5 LPs, require high minimum reserve amount amount or return 0
  if (pair.liquidityProviderCount.lt(BigInt.fromI32(5))) {
    let reserve0UST = pair.reserve0.times(price0)
    let reserve1UST = pair.reserve1.times(price1)
    if (whitelist.includes(token0.id) && whitelist.includes(token1.id)) {
      if (reserve0UST.plus(reserve1UST).lt(getMinimumUstThresholdForNewPairs())) {
        return ZERO_BD
      }
    }
    if (whitelist.includes(token0.id) && !whitelist.includes(token1.id)) {
      if (reserve0UST.times(BigDecimal.fromString('2')).lt(getMinimumUstThresholdForNewPairs())) {
        return ZERO_BD
      }
    }
    if (!whitelist.includes(token0.id) && whitelist.includes(token1.id)) {
      if (reserve1UST.times(BigDecimal.fromString('2')).lt(getMinimumUstThresholdForNewPairs())) {
        return ZERO_BD
      }
    }
  }

  // both are whitelist tokens, take average of both amounts
  if (whitelist.includes(token0.id) && whitelist.includes(token1.id)) {
    return tokenAmount0
      .times(price0)
      .plus(tokenAmount1.times(price1))
      .div(BigDecimal.fromString('2'))
  }

  // take full value of the whitelisted token amount
  if (whitelist.includes(token0.id) && !whitelist.includes(token1.id)) {
    return tokenAmount0.times(price0)
  }

  // take full value of the whitelisted token amount
  if (!whitelist.includes(token0.id) && whitelist.includes(token1.id)) {
    return tokenAmount1.times(price1)
  }

  // neither token is on white list, tracked volume is 0
  return ZERO_BD
}

/**
 * Accepts tokens and amounts, return tracked amount based on token whitelist
 * If one token on whitelist, return amount in that token converted to UST * 2.
 * If both are, return sum of two amounts
 * If neither is, return 0
 */
export function getTrackedLiquidityUST(
  tokenAmount0: BigDecimal,
  token0: Token,
  tokenAmount1: BigDecimal,
  token1: Token
): BigDecimal {
  let bundle = Bundle.load('1')
  let price0 = token0.derivedNativeCurrency.times(bundle.nativeCurrencyPrice)
  let price1 = token1.derivedNativeCurrency.times(bundle.nativeCurrencyPrice)

  let whitelist = getLiquidityTrackingTokenAddresses()
  // both are whitelist tokens, take average of both amounts
  if (whitelist.includes(token0.id) && whitelist.includes(token1.id)) {
    return tokenAmount0.times(price0).plus(tokenAmount1.times(price1))
  }

  // take double value of the whitelisted token amount
  if (whitelist.includes(token0.id) && !whitelist.includes(token1.id)) {
    return tokenAmount0.times(price0).times(BigDecimal.fromString('2'))
  }

  // take double value of the whitelisted token amount
  if (!whitelist.includes(token0.id) && whitelist.includes(token1.id)) {
    return tokenAmount1.times(price1).times(BigDecimal.fromString('2'))
  }

  // neither token is on white list, tracked volume is 0
  return ZERO_BD
}
