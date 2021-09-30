# DexSwap Subgraph on Harmony


## **Simply Run**

```jsx
yarn

yarn codegen:harmony && yarn build:harmony

yarn create:harmony 

yarn deploy:harmony
```



## **Sample Querry**

```
<!-- UST TRACK -->

{
  token(id: "0x224e64ec1bdce3870a6a6c777edd450454068fec") {
    name
    symbol
    decimals
    tradeVolumeUST
    totalLiquidity
    untrackedVolumeUST
    txCount
    totalSupply
  }
}


```
<!-- TX & PAIR TRACK -->
{
  dexsFactories {
    id
    pairCount
    txCount
  }
}
```


```
{
  dexsFactories(first: 5) {
    id
    pairCount
    totalVolumeUST
    totalVolumeNativeCurrency
  }
  tokens(first: 5) {
    id
    symbol
    name
    decimals
  }
}
```
```

```
