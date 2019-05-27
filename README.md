# STO as service reference application

This is a reference application to issue and manage STO tokens based on Polymath. The platform users can explore, modify, run and test this application.

The key features of the STO reference applicatoin include:

  - Provide STO (Security Token Offering) as a service with UI that facilitates the STO launching by simply specifying the required information. 
  - Use Metamask as the user in-browser wallet.

## Components and Deployment Sequence

The following off-chain server components are required to run the STO application:

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

Start it by running this cmd `pm2 start script_start_mongo.sh`. Its data is stored in the folder `mongodb`

### Off-chain API server and Issuer board

Please cd to the folder `polymath-apps` and run the cmd `yarn` for installation of dependencies

#### Off-chain API server

  - Adapt the configuration file `.env` inside the subfolder `polymath-apps/packages/polymath-offchain`
  - To start, run this cmd `pm2 start pm2/script_server_offchain.sh` from the folder `polymath-apps`

#### Issuer board

  - Adapt the configuration file `.env` inside the subfolder `polymath-apps/packages/polymath-issuer`
  - To start, run this cmd `pm2 start pm2/script_issuer.sh` from the folder `polymath-apps`

## Access the running app

This is a web app running and listenning at port `8080`.
To determine its URL, have a look at the `Machines` small panel and then right-click on (for example) `truffle/dev-machine` to select `Servers`. This will show up a view where the web-app `https` link can be seen at the
row `http-server`. Please be noted that, all the ports displayed in this view mean to be reserved for external access.

# Copyright info

This applicaiton is originally from Polymath, please refer to the LICENSE file under the folder policy-core.
