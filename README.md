# Athena Crowdfunding DApp

Athena is a decentralized crowdfunding application built on the Edu-Chain blockchain network. It allows for donors to contribute to their scholarship campaign of choice and allows control of creation scholarship campaigns to avoid fraudulent scholarship campaigns.

![Athena DApp Screenshot](./packages//frontend/public/display.png)

## Folder Structure

- **/packages/contracts**: Contains the Solidity smart contracts for the Athena DApp.
- **/packages/scripts/**: Contains scripts to deploy and interact with the smart contracts.
- **/packages/test/**: Contains test scripts to test the smart contracts using Hardhat.
- **/packages/frontend/**: Contains the Next.js frontend application.

## Getting Started

### Technical Stack

- **Frontend**: Next.js
- **UI Components**: Lucide React
- **Blockchain Development**: Hardhat + Remix
- **Blockchain Deployment**: Edu-Chain
- **Smart Contract**: Solidity
- **Web3 Integration**: Ether.js

### Main Contract Features

- Create and manage scholarship fundraising campaigns
- Accept donations in EDU
- Multi-admin support for campaign management
- Secure donation handling and fund management
- Automated campaign completion on target achievement and date expiry
- Campaign lifecycle management (active, completed, deleted)
- Complete transparency with on-chain tracking of donations and withdrawals
- Campaign cancellation protection when funds are raised

## Development Setup

### Setup

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   cd packages/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Configure blockchain ABI using your contracts ABI and contract address.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Submit a pull request

## License

MIT License

## Appendices

- **Smartcontract Repo**: [Link](https://github.com/Kennjenga/crowdfunding/)
- **Undugu Live**: [Link](https://pamoja-iota.vercel.app/)
