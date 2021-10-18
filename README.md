# Solana Anchor Curd
### A simple to-do list application in solana blockchain

## Prerequisites

- [Node.js](https://nodejs.org/) 
- [Solana Tool Suite](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor](https://project-serum.github.io/anchor/getting-started/installation.html)
- Solana browser wallet [Phantom](https://phantom.app/).

# Anchor Project Structure

- app - Where our frontend code will go
- programs - This is where the Rust code lives for the Solana program
- test - Where the JavaScript tests for the program live
- migrations - A basic deploy script

## Instructions

### Clone the repo 
```
git clone https://github.com/swaroopmaddu/solana-anchor-curd
```
### Build the app
```
anchor build
```
### Deploy 
```
anchor deploy
```
### Copy IDL to app folder 

```
node copyIdl.js          
```
### Start local test validator 
```
solana-test-validator --reset
```
### Start frontend react app 
```
cd app && npm start
```
### Don't forgot to fund your wallet to pay trasaction fees. Replace public key with your wallet public key
```
solana airdrop 10 DVcjkvnCuV59RpxxrFbnxHK9rAgfaVriXK3NX51eiv3i
``` 

# Now you can see our to-do app running on solana blockchain.
