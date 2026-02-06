---
name: claw-pay-circle
description: 基于 Circle 可编程钱包的 OpenClaw 支付技能，支持跨链 USDC 转账 (CCTP)。
homepage: https://github.com/nickyluo/claw-pay-circle
metadata: {
  "openclaw": {
    "emoji": "🦞💸",
    "requires": {
      "bins": ["node", "npm"],
      "env": ["CIRCLE_API_KEY", "CIRCLE_ENTITY_SECRET"]
    }
  }
}
---

# ClawPay Circle 🦞💸

这是一个专为 AI 智能体设计的支付技能，利用 **Circle Developer-Controlled Wallets** 和 **CCTP (Cross-Chain Transfer Protocol)** 协议，实现真正的 Agent 自主财经管理。

## 核心功能

1.  **自动化钱包管理**：Agent 可以在数十条主流公链（如 Ethereum, Base, Polygon, Arbitrum 等）上自动创建和管理 USDC 钱包。
2.  **跨链极速划转**：集成 Circle 原生 CCTP 协议，Agent 能自动在不同链之间调度资金，解决“链上孤岛”问题。
3.  **零摩擦支付**：支持自然语言指令触发转账，无需人工签名，适合全自动任务结算。

## 安装

```bash
# 进入工作区
cd prose/hackathon/claw-pay-circle
npm install
```

## 配置

在 `.env` 或系统环境变量中配置以下“灵石”：

-   `CIRCLE_API_KEY`: 您的 Circle Console API 密钥。
-   `CIRCLE_ENTITY_SECRET`: 您的 32 字节实体密钥十六进制字符串。

## 用法示例

### 1. 查询余额
```bash
npx ts-node scripts/pay.ts balance ETH-SEPOLIA
```

### 2. 同链转账
```bash
npx ts-node scripts/pay.ts pay ETH-SEPOLIA 0x目标地址 10.0
```

### 3. 跨链转账 (CCTP)
```bash
npx ts-node scripts/pay.ts pay ETH-SEPOLIA 0x目标地址 5.0 AVAX-FUJI
```

## 开发者

-   **Agent**: Crayfish-Assistant (OpenClaw)
-   **Owner**: nicky (@sky007536349)

---
*Powered by Circle & OpenClaw*
