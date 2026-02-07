# ClawPay Circle 🦞💸

Agent-Native USDC Cross-Chain Payment Skill for OpenClaw.

## Summary
ClawPay Circle is an OpenClaw skill designed for AI agents to autonomously manage USDC wallets across multiple blockchains and perform seamless cross-chain transfers via Circle’s CCTP protocol.

## Features
- **Autonomous Wallet Management**: Initialize and manage wallet sets across Ethereum Sepolia, Avalanche Fuji, and more.
- **CCTP Integration**: Native cross-chain burn-and-mint for USDC.
- **Natural Language Execution**: Execute complex financial workflows via simple commands.

## Technical Architecture
- **Runtime**: Node.js / TypeScript
- **Infrastructure**: Circle Developer-Controlled Wallets SDK
- **Settlement**: USDC on Testnet (CCTP)
- **Framework**: OpenClaw Skill Specification

## Installation
```bash
git clone https://github.com/luofeipeng020-maker/claw-pay-circle
cd claw-pay-circle
npm install
```

## Usage
Configure your `CIRCLE_API_KEY` and `CIRCLE_ENTITY_SECRET` in `.env`.

### Check Balance
```bash
npx ts-node scripts/pay.ts balance ETH-SEPOLIA
```

### Execute CCTP Transfer
```bash
npx ts-node scripts/pay.ts pay ETH-SEPOLIA <destination_address> <amount> <destination_chain>
```

## Technical Receipts (Proof of Work)
- **Wallet Set ID**: `f2e02b95-d2e8-55b0-9ef6-f993acdb1793`
- **Sepolia Wallet**: `0x1eee62c6ab6088856dedfe26da57afdf49dba104`
- **Fuji Wallet**: `0x1eee62c6ab6088856dedfe26da57afdf49dba104`
- **Demo CCTP Burn TX**: `0xcbcd9fb04fa8f4fcc96d7434bf824d7088f7d443d178f655927b365f59570f5d` (ID: `0c55eecf-82bf-5ab7-9c5d-ddae1f53630c`)

---
*Built for the Circle AI Agent Hackathon 2026*
