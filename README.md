
# **Harmony - Bridging TradFi To DeFi**

## Challenges: 

### *1. Track 1: Cross-Chain - “Liquidity” : https://gitcoin.co/issue/harmony-one/hackathon/18/100026313*

### *2. Challenge: Terra : https://gitcoin.co/issue/harmony-one/hackathon/30/100026314*



### **DEMO [Harmony Mainnet]** **[https://harmony-dexswap.netlify.app/](https://harmony-dexswap.netlify.app)**

### **VIDEO WORKFLOW** **https://www.youtube.com/watch?v=swRyarDEzyk**

### Implementing  Terra UST as a native currency & value for tracking liquidity minning & token rewards in Graphql/Subgraph, see:

**https://github.com/Agin-DropDisco/HARMONY_ONE/tree/main/graph-index#ust-track**

**https://github.com/Agin-DropDisco/HARMONY_ONE/blob/04fd17259f32201d84c974245fb14cec95265538/graph-index/src/commons/addresses.ts#L88**

**https://github.com/Agin-DropDisco/HARMONY_ONE/blob/04fd17259f32201d84c974245fb14cec95265538/graph-index/schema.graphql#L9**
 
**https://github.com/Agin-DropDisco/HARMONY_ONE/blob/04fd17259f32201d84c974245fb14cec95265538/graph-index/schema.graphql#L37**

### Implementing Terra UST in DexSwap Frontend

```jsx
const QUERY = gql`
  query {
    bundle(id: "1") {
      nativeCurrencyPrice
    }
  }
`

export function useNativeCurrencyUSTPrice(): { loading: boolean; nativeCurrencyUSTPrice: Price } {
  const nativeCurrency = useNativeCurrency()
  const { loading, error, data } = useQuery<{ bundle: { nativeCurrencyPrice: string } }>(QUERY)

  return useMemo(() => {
    if (loading) return { loading: true, nativeCurrencyUSTPrice: new Price(nativeCurrency, UST, '1', '0') }
    if (!data || error) return { loading: false, nativeCurrencyUSTPrice: new Price(nativeCurrency, UST, '1', '0') }
    return {
      loading: false,
      nativeCurrencyUSTPrice: new Price(
        nativeCurrency,
        UST,
        parseUnits('1', UST.decimals).toString(),
        parseUnits(new Decimal(data.bundle.nativeCurrencyPrice).toFixed(18), UST.decimals).toString()
      )
    }
  }, [data, error, loading, nativeCurrency])
}
```

```jsx
const QUERY = gql`
  query($id: ID!) {
    pair(id: $id) {
      id
      reserveUST
    }
  }
`

interface QueryResult {
  pair: { reserveUST: string }
}

export function usePairLiquidityUST(pair?: Pair | null): { loading: boolean; liquidityUST: CurrencyAmount } {
  const { loading, data, error } = useQuery<QueryResult>(QUERY, {
    variables: { id: pair?.liquidityToken.address.toLowerCase() }
  })

  return useMemo(() => {
    if (loading) return { loading: true, liquidityUST: ZERO_UST }
    if (!data || !data.pair || !data.pair.reserveUST || error) return { loading, liquidityUST: ZERO_UST }
    return {
      loading,
      liquidityUST: CurrencyAmount.ust(
        parseUnits(new Decimal(data.pair.reserveUST).toFixed(UST.decimals), UST.decimals).toString()
      )
    }
  }, [data, error, loading])
}
```


# DexSwap Finance ($DEXS)

Decentralized Protocol Optimizer for Multiple Exchanges


### Strategies Workflow
<p align="center">
 <img src="./DATA-DIAGRAM.png">
 </P>

### User Workflow
<p align="center">
 <img src="./flow_staker@2x.png">
 </p>
 


