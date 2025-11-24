# Quick Start - Deploy Smart Contracts

## 3 Simple Steps to Deploy

### Step 1: Create .env File

```bash
cd SmartContract
cp .env.example .env
```

Edit `.env` and add your Tonkeeper mnemonic:

```env
WALLET_MNEMONIC="your 24 words here"
WALLET_VERSION=v4r2
```

### Step 2: Get Testnet TON

1. Switch Tonkeeper to **Testnet**
2. Copy your wallet address
3. Message [@testgiver_ton_bot](https://t.me/testgiver_ton_bot) on Telegram
4. Send your address, receive 5 testnet TON (free)

### Step 3: Deploy All Contracts

```bash
pnpm deploy:all
```

When prompted:
- Network: **testnet**
- Wallet: **Mnemonic**
- Backend public key: Enter your backend pubkey
- Deploy SimpleCounter? **No** (unless testing)

Done! Copy the contract addresses to your backend and frontend `.env` files.

---

## Need More Help?

- **Wallet setup:** See `WALLET_SETUP.md`
- **Deployment details:** See `DEPLOYMENT_FIXED.md`
- **Build errors:** Already fixed! Just deploy.

## Security Reminder

✓ `.env` is in `.gitignore` - never commit it
✓ Use a testnet wallet, not your main wallet
✓ Run `git status` before committing to verify .env is not tracked
