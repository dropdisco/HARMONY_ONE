# DexSswap Router Contracts

## Install Dependencies

`yarn`

## Compile & Deploy Contracts

```jsx
yarn deploy:harmony:mainnet
```

***RESULT***

```jsx
2_deploy_contracts.js
=====================

:: REUSE FACTORY
DEXSWAP FACTORY: 0xE77A7C836720897cd3fBd6c0C0067C5Ca278603F

:: REUSE WONE

:: DEPLOY ROUTER

   Deploying 'DexSwapRouter'
   -------------------------
   > transaction hash:    0xd8cd636437c4b83557a5619087756b9ab44f8d64042a5ee6d9dda27a9939bcf6
   > Blocks: 5            Seconds: 9
   > contract address:    0x151C94151a38564B42670b5241FbAcEB824E5281
   > block number:        17275882
   > block timestamp:     1632354290
   > account:             0x71928387C8D507192C912B84A6eFbf603FBfEbAA
   > balance:             367.419732333999999899
   > gas used:            3954267 (0x3c565b)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.03954267 ETH

DEXSWAP ROUTER: 0x151C94151a38564B42670b5241FbAcEB824E5281

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.03954267 ETH


3_deploy_uniswap.js
===================

   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.04083453 ETH
```
