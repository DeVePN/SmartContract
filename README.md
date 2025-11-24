# &VPN Smart Contracts 💎

**Tact smart contracts for the DeVPN protocol on TON Blockchain.**

&VPN uses a dual-contract architecture to manage decentralized VPN nodes and pay-as-you-go sessions.

## 📜 Deployed Contracts (Testnet)

| Contract | Address | Explorer |
|----------|---------|----------|
| **Node Registry** | `EQBHnWNg1jpHJBIQ-sHcvBfDDxMCsy8JaJWT3NWvwhQyTdMk` | [View on Tonscan](https://testnet.tonscan.org/address/EQBHnWNg1jpHJBIQ-sHcvBfDDxMCsy8JaJWT3NWvwhQyTdMk) |
| **Session Manager** | `EQDu3ep204NLbW9CFAAcpj5qiRGPCj2R5vxzID4LSeSL_Ae0` | [View on Tonscan](https://testnet.tonscan.org/address/EQDu3ep204NLbW9CFAAcpj5qiRGPCj2R5vxzID4LSeSL_Ae0) |

## 🏗 Architecture

### 1. Node Registry (`NodeRegistry.tact`)
Acts as the directory for all available VPN nodes.
-   **Registration**: Nodes stake TON to register.
-   **Metadata**: Stores connection info (IP, Port, WireGuard Key) and pricing.
-   **Discovery**: Allows users to find active nodes.

### 2. Session Manager (`SessionManager.tact`)
Handles the lifecycle of VPN sessions and payments.
-   **Session Start**: Users deposit TON to start a session.
-   **Usage Verification**: Backend signs usage reports (bytes/duration) with Ed25519.
-   **Settlement**: Verifies signatures and releases payments to nodes.

## 🌟 Key Features

-   **Off-Chain Usage Tracking**: Usage is tracked off-chain and settled on-chain for efficiency.
-   **Micropayments**: Pay only for the exact duration and data used.
-   **Staking**: Nodes must stake TON to ensure quality of service.
-   **Signature Verification**: Uses `CheckSignature` to validate backend-signed usage reports.

## 🚀 Getting Started

### Prerequisites

-   Node.js >= 18
-   Yarn or NPM
-   A TON Wallet (e.g., Tonkeeper) with testnet TON.

### Installation

```bash
npm install
# or
yarn install
```

### Automated Deployment (Recommended)

We provide a unified deployment script that handles the order of operations.

```bash
npx blueprint run deployAll
```

1.  **Enter Backend Public Key**: You will be prompted for the backend's public key (used for signature verification).
2.  **Wait for Deployment**: The script will deploy `SessionManager` (with a placeholder NodeRegistry address) and then `NodeRegistry`.
3.  **Save Addresses**: The script will output the deployed addresses and save them to `deployed-contracts.json`.

> **Note on Circular Dependency**: `SessionManager` is deployed first with a placeholder address for `NodeRegistry`. For a production setup, you would need to update the `SessionManager` with the actual `NodeRegistry` address after deployment using an admin function (not included in this hackathon version).

### Step 3: Update Environment

Update your `mini-app` and `backend` environment variables with the new addresses.

## 💻 Commands

### Build
Compile the contracts to FunC and BOC:
```bash
npx blueprint build
```

### Test
Run the Jest test suite:
```bash
npx blueprint test
```

### Deploy
Run a deployment script:
```bash
npx blueprint run
```

## 📄 License

MIT License
