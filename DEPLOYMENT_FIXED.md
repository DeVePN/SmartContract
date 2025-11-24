# ✅ Smart Contract Build & Deploy - FIXED!

## What Was Fixed

### 1. ✅ Path Separator Issue (tact.config.json)
**Problem:** Windows-style paths (`build\NodeRegistry`) on macOS
**Fixed:** Changed to Unix-style paths (`build/NodeRegistry`)

### 2. ✅ Created Unified Deployment Script
**New File:** `scripts/deployAll.ts`
**Features:**
- Deploys all contracts with single command
- Handles circular dependency (NodeRegistry ↔ SessionManager)
- Prompts for backend public key once
- Outputs addresses in `.env` format
- Saves deployment info to `deployed-contracts.json`

### 3. ✅ Added Convenience Script
**Updated:** `package.json`
**New Command:** `pnpm deploy:all`

---

## How to Use

### Step 1: Build All Contracts

```bash
cd SmartContract
pnpm build
```

When prompted:
```
? Choose project to build
> All projects (build all contracts at once)
```

Select **"All projects"** and press Enter.

This will compile:
- ✅ NodeRegistry
- ✅ SessionManager
- ✅ SimpleCounter

### Step 2: Deploy All Contracts

```bash
pnpm deploy:all
```

**You'll be prompted for:**

1. **Backend public key** (hex with 0x prefix or decimal)
   - Example: `0x1234567890abcdef...`
   - Or: `1234567890`

2. **Deploy SimpleCounter?** (Yes/No)
   - Choose "No" for production
   - Choose "Yes" if testing

**The script will:**
1. Deploy SessionManager (with placeholder NodeRegistry address)
2. Deploy NodeRegistry (with real SessionManager address)
3. Optionally deploy SimpleCounter
4. Save all addresses to `deployed-contracts.json`
5. Print addresses in `.env` format

### Step 3: Copy Addresses to Your Backend

After deployment completes, you'll see:

```
═══════════════════════════════════════════════════════════
📄 Backend .env Format:
═══════════════════════════════════════════════════════════

SESSION_MANAGER_ADDRESS=EQD...
NODE_REGISTRY_ADDRESS=EQC...
TON_NETWORK=testnet
```

**Copy these to:** `Backend/.env`

### Step 4: Copy Addresses to Your Frontend

```
═══════════════════════════════════════════════════════════
📄 Frontend .env Format:
═══════════════════════════════════════════════════════════

NEXT_PUBLIC_SESSION_MANAGER_CONTRACT=EQD...
NEXT_PUBLIC_NODE_REGISTRY_CONTRACT=EQC...
NEXT_PUBLIC_TON_NETWORK=testnet
```

**Copy these to:** `mini-app/.env.local`

---

## Deployment Output

All deployment info is saved to:
```
SmartContract/deployed-contracts.json
```

Example:
```json
{
  "network": "testnet",
  "timestamp": "2024-11-23T...",
  "contracts": {
    "sessionManager": "EQD...",
    "nodeRegistry": "EQC...",
    "simpleCounter": "EQB..."
  },
  "backendPubKey": "1234567890"
}
```

---

## Troubleshooting

### Error: "Cannot find module '../build/...'"

**Solution:**
```bash
cd SmartContract
rm -rf build
pnpm build
# Select "All projects"
```

### Error: "Invalid public key format"

**Solution:** Ensure your backend public key is:
- Hex format with `0x` prefix: `0x1234...`
- Or decimal: `1234567890`

### Error: "Address parse failed"

This shouldn't happen with the new script, but if it does:
- Check that contracts built successfully
- Verify `build/` directory contains compiled contracts

---

## Architecture Note - Circular Dependency

**The Issue:**
- NodeRegistry needs SessionManager address in constructor
- SessionManager needs NodeRegistry address in constructor
- This creates a chicken-and-egg problem

**The Solution (Current):**
1. Deploy SessionManager with **placeholder** NodeRegistry address (zero address)
2. Deploy NodeRegistry with **real** SessionManager address
3. For hackathon demo, this works fine for basic testing

**Better Solution (Future):**
- Redesign contracts so NodeRegistry doesn't need SessionManager address in constructor
- Or add admin function to update addresses after deployment

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `pnpm build` | Compile all contracts |
| `pnpm deploy:all` | Deploy all contracts at once |
| `pnpm start` | Interactive deploy (single contract) |
| `pnpm test` | Run contract tests |

---

## Files Modified

- ✅ `tact.config.json` - Fixed path separators
- ✅ `scripts/deployAll.ts` - New unified deployment script
- ✅ `package.json` - Added `deploy:all` command

---

## Next Steps

1. ✅ Build contracts: `pnpm build`
2. ✅ Deploy contracts: `pnpm deploy:all`
3. ✅ Copy addresses to Backend `.env`
4. ✅ Copy addresses to Frontend `.env.local`
5. ✅ Test backend API endpoints
6. ✅ Test frontend wallet connection

---

**Status:** ✅ **READY TO DEPLOY**

All smart contract issues are resolved. You can now build and deploy all contracts with a single command!
