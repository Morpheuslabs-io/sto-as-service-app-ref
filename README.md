# STO as service reference application

This is a reference application to issue and manage STO tokens based on Polymath. The platform users can explore, modify, run and test this application.

The key features of the STO reference applicatoin include:

  - Provide STO (Security Token Offering) as a service with UI that facilitates the STO launching by simply specifying the required information. 
  - Use Metamask as the user in-browser wallet.
  - Currently, only `Kovan` testnet is supported

## Components and Deployment Sequence

The following server components are required to run the STO application:

  - `MongoDB`: database server
  - `Off-chain API server`: provide rest APIs for data storage based on MongoDB
  - `Issuer board`: UI for specifying and launching STO

## Folder structure

  - `mongodb`: contain MongoDB data
  - `polymath-apps`: contain `Off-chain API server` and `Issuer board` components
  - `polymath-core`: contain smart contract system towards STO

## Configuration, Installation and Deployment

It's recommended to use the stack on the ML BPaaS platform with at least 4GB RAM that has the preinstalled MongoDB.

### MongoDB

  - Create an empty folder named `mongodb` in parent directory to hold data

  - Start it by running this cmd `pm2 start script_start_mongo.sh`

### Install dependencies

Please cd to the folder `polymath-apps` and run the cmd `yarn` for installation of dependencies

### Off-chain API server

  - Copy the sample configuration file `.env.local` inside the subfolder `polymath-apps/packages/polymath-offchain` to a another file `.env` and then adapt the following important params:

    - `PORT`: if running in the platform workspace, the chosen server `PORT` must be `3000` or some other Node port reserved for external access

    - `POLYMATH_OFFCHAIN_URL`: public endpoint of the `Off-chain API server`

    - `POLYMATH_ISSUER_URL`: public endpoint of the `issuer board` (configured below)

    - `POLYMATH_REGISTRY_ADDRESS_KOVAN`: deployed address of the contract `PolymathRegistry` on `Kovan` testnet. Only change if the contract is redeployed

    - `MONGODB_URI`: endpoint of the MongoDB server 

  - To start, run this cmd `pm2 start pm2/script_server_offchain.sh` from the folder `polymath-apps`

### Issuer board

  - Copy the sample configuration file `.env.local` inside the subfolder `polymath-apps/packages/polymath-issuer` to a another file `.env` and then adapt the following important params:

    - `PORT`: if running in the platform workspace, the chosen HTTP `PORT` must be `8080` or some other HTTP port reserved for external access

    - `REACT_APP_POLYMATH_OFFCHAIN_ADDRESS`: public endpoint of the `Off-chain API server`

    - `REACT_APP_POLYMATH_REGISTRY_ADDRESS_KOVAN`: deployed address of the contract `PolymathRegistry` on `Kovan` testnet. Only change if the contract is redeployed.

  - To start, run this cmd `pm2 start pm2/script_issuer.sh` from the folder `polymath-apps`

## Access the Issuer Board

This is a web app running and listenning at port `8080`.
To determine its URL, have a look at the `Machines` small panel and then right-click on (for example) `truffle/dev-machine` to select `Servers`. This will show up a view where the web-app `https` link can be seen at the
row `http-server`. Please be noted that, all the ports displayed in this view mean to be reserved for external access.

## Core Smart Contract

### Config, compile and deploy

Located in folder `polymath-core`

  - Configuration:
    - specified in the file `polymath-core/truffle-config.js`
    - it's needed to create a text file named `privKey` (inside the folder `polymath-core`) that holds the private key of your account on `Kovan` with enough test ETH. This account is then used for contract deployment.

  - Compile:  `yarn compile`

  - Deploy to `Kovan`:  `yarn migrate:kovan`

Things need to be done after any new deployment of contracts:

  - The deployed adddress of `PolymathRegistry` contract in `polymath-apps/packages/polymath-offchain/.env` and in `polymath-apps/packages/polymath-issuer/.env` must be updated.

  - The newly-compiled JSON file of the modified contract (located in `polymath-core/build/contracts`) must be copied to `polymath-apps/packages/new-polymath-scripts/src/fixtures/contracts/`. Currently, due to conflict in versions, please do not copy all JSON files. Instead, copy only the modified contract's JSON file.

### Interaction between frontend (i.e. issuer board) and smart contract

  - The interaction is done via a wrapper component that is `polymath-apps/packages/polymath-js`.
Each smart contract has an associated wrapper ReactJS component.

  - For example, the contract `polymath-core/contracts/SecurityTokenRegistry.sol` has wrapper that is `polymath-apps/packages/polymath-js/src/contracts/SecurityTokenRegistry.js`

  - Frontend code, for example the file `polymath-apps/packages/polymath-issuer/src/actions/ticker.js` imports `SecurityTokenRegistry` wrapper and invoke its APIs as follows: 

```
import { SecurityTokenRegistry, PolyToken } from '@polymathnetwork/js';

const fee = await SecurityTokenRegistry.registrationFee();
```

  - Wrapper, for example the file `polymath-apps/packages/polymath-js/src/contracts/SecurityTokenRegistry.js` imports the JSON file (containing contract ABI) and expose itself as follows:

```
import artifact from '@polymathnetwork/polymath-scripts/fixtures/contracts/SecurityTokenRegistry.json';

export default new SecurityTokenRegistry(artifact);
```

---

## Customization

Please refer to separate files with prefix `Customization-...`

---

# Copyright info

This applicaiton is originally from Polymath, please refer to the LICENSE file under the folder policy-core.
