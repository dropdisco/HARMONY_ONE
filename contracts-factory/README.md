# DexSwap Factory 


## Install Dependencies

`yarn`

## Compile & Deploy Contracts

```jsx
yarn deploy:harmony:mainnet
```

***RESULT***

```jsx
Starting migrations...
======================
> Network name:    'harmony'
> Network id:      1666600000
> Block gas limit: 80000000 (0x4c4b400)


1_migrations.js
===============

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x148151872edab84605e533921c683ec146b01c24bdc29a9ec5930f83ff26d933
   > Blocks: 4            Seconds: 9
   > contract address:    0x74d0E53f3A10D1B614655f3Cb781d1834cf0F411
   > block number:        17275553
   > block timestamp:     1632353628
   > account:             0x71928387C8D507192C912B84A6eFbf603FBfEbAA
   > balance:             367.628666014
   > gas used:            128958 (0x1f7be)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00128958 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00128958 ETH


2_deploy.js
===========

:: Deploying WONE

:: WONE DEPOSIT CALL


:: Start Deploying xDEXS Token

   Deploying 'xDEXS'
   -----------------
   > transaction hash:    0x08fb124dd7c7ff5691c609e0a8597ca7e82ee4e8d3c587019eb6714b6331cf77
   > Blocks: 4            Seconds: 9
   > contract address:    0x47f08700D6d090509F3574CBd75b8599777fCD9c
   > block number:        17275573
   > block timestamp:     1632353668
   > account:             0x71928387C8D507192C912B84A6eFbf603FBfEbAA
   > balance:             367.618168313999999999
   > gas used:            963938 (0xeb562)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00963938 ETH


:: Init DexSwap Deployer

   Deploying 'DexSwapDeployer'
   ---------------------------
   > transaction hash:    0x7e4a0bceda35cce429b2302c67e5fcbab763b72a2f08cb4eab2086956001d23e
   > Blocks: 5            Seconds: 9
   > contract address:    0x6CD5d036d1697A421F1dEE97c242A3F6C82A3F6d
   > block number:        17275586
   > block timestamp:     1632353694
   > account:             0x71928387C8D507192C912B84A6eFbf603FBfEbAA
   > balance:             367.571226983999999999
   > gas used:            4624823 (0x4691b7)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.04624823 ETH


:: Start Sending 1 WEI ...

:: Sent deployment reimbursement
Deployed dexSwap

:: Deploying Factory

   Deploying 'DexSwapFactory'
   --------------------------
   > transaction hash:    0x1abc942d62cd4234d958241052c8b68f2c2083355a36bea491dd8d8ce42dec88
   > Blocks: 4            Seconds: 9
   > contract address:    0xE77A7C836720897cd3fBd6c0C0067C5Ca278603F
   > block number:        17275605
   > block timestamp:     1632353733
   > account:             0x71928387C8D507192C912B84A6eFbf603FBfEbAA
   > balance:             367.483311453999999999
   > gas used:            2690738 (0x290eb2)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.02690738 ETH


:: Start Deploying DexSwap LP

   Deploying 'DexSwapERC20'
   ------------------------
   > transaction hash:    0xf485e67b257a29ea779b50fb6f9462a2fdaef6591760d7604fa1f44c612d45bf
   > Blocks: 4            Seconds: 9
   > contract address:    0x7Bd96B79F1ac341932Cc8Bc31510473015cbd4CD
   > block number:        17275615
   > block timestamp:     1632353753
   > account:             0x71928387C8D507192C912B84A6eFbf603FBfEbAA
   > balance:             367.477836153999999999
   > gas used:            547530 (0x85aca)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.0054753 ETH

:: Start Deploying FeeReceiver

   Deploying 'DexSwapFeeReceiver'
   ------------------------------
   > transaction hash:    0x3625aa9a039b2b58eec74591715c68acfa153b001df3b22928a378a8d0f9d43f
   > Blocks: 4            Seconds: 9
   > contract address:    0x2340Fb341bAc3C1243123Deefac7209296A65f47
   > block number:        17275625
   > block timestamp:     1632353773
   > account:             0x71928387C8D507192C912B84A6eFbf603FBfEbAA
   > balance:             367.466955603999999999
   > gas used:            1088055 (0x109a37)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.01088055 ETH


:: Start Deploying FeeSetter

   Deploying 'DexSwapFeeSetter'
   ----------------------------
   > transaction hash:    0x6ef39db22e0505c43031f1448b714db6ff06f3300b15756da5317f4b13ef86e9
   > Blocks: 4            Seconds: 9
   > contract address:    0x9A462BDfb4195C0394614008505EB0BEde044AE9
   > block number:        17275634
   > block timestamp:     1632353791
   > account:             0x71928387C8D507192C912B84A6eFbf603FBfEbAA
   > balance:             367.462577443999999999
   > gas used:            437816 (0x6ae38)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00437816 ETH


:: Setting Correct FeeSetter in Factory

:: Transfer Ownership FeeReceiver

:: Transfer Ownership FeeSetter

:: Updating Protocol FeeReceiver

====================================================================
Deployer Address: 0x6CD5d036d1697A421F1dEE97c242A3F6C82A3F6d
====================================================================
====================================================================
Factory Address: 0xE77A7C836720897cd3fBd6c0C0067C5Ca278603F
====================================================================
====================================================================
DexSwap LP Address: 0x7Bd96B79F1ac341932Cc8Bc31510473015cbd4CD
====================================================================
====================================================================
Fee Setter Address: 0x9A462BDfb4195C0394614008505EB0BEde044AE9
====================================================================
====================================================================
Fee Receiver Address: 0x2340Fb341bAc3C1243123Deefac7209296A65f47
====================================================================
====================================================================
xDEXS Token Address: 0x47f08700D6d090509F3574CBd75b8599777fCD9c
====================================================================
====================================================================
Wrapped One Address: 0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a
====================================================================
=============================================================================
Code Hash: 0x150b4ac6b908c76f4d28c378f9d050600e012455d0383ed35598e31688ee2e7b
=============================================================================
DONE

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:            0.103529 ETH


Summary
=======
> Total deployments:   7
> Final cost:          0.10481858 ETH
```
