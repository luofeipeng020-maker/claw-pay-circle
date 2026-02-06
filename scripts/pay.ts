import { CircleService } from '../src/circle_service';
import * as fs from 'fs';
import * as path from 'path';

const STATE_FILE = path.join(__dirname, '../memory/wallet_state.json');

function loadState() {
  if (fs.existsSync(STATE_FILE)) {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  }
  return {};
}

function saveState(state: any) {
  if (!fs.existsSync(path.dirname(STATE_FILE))) {
    fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  }
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const service = new CircleService();
  const state = loadState();

  try {
    switch (command) {
      case 'setup':
        console.log("正在执行初始化...");
        const walletSet = await service.initializeWalletSet("Crayfish-Default-Set");
        state.walletSetId = walletSet.id;
        saveState(state);
        console.log("初始化完成。");
        break;

      case 'create-wallet':
        const blockchain = args[1] || 'ETH-SEPOLIA';
        if (!state.walletSetId) {
          throw new Error("请先运行 'setup' 命令初始化钱包组。");
        }
        const wallet = await service.createWallet(state.walletSetId, blockchain);
        if (!state.wallets) state.wallets = {};
        state.wallets[blockchain] = { id: wallet.id, address: wallet.address };
        saveState(state);
        break;

      case 'balance':
        const balChain = args[1] || 'ETH-SEPOLIA';
        const balWallet = state.wallets?.[balChain];
        if (!balWallet) {
          throw new Error(`未找到 ${balChain} 链的钱包配置。`);
        }
        await service.getUSDCBalance(balWallet.id);
        break;

      case 'list':
        if (!state.walletSetId) {
          throw new Error("请先运行 'setup' 命令。");
        }
        const wallets = await service.listWallets(state.walletSetId);
        console.log("当前钱包列表:");
        console.table(wallets.map((w: any) => ({
          ID: w.id,
          Address: w.address,
          Blockchain: w.blockchain,
          State: w.state
        })));
        break;

      case 'pay':
        const fromChain = args[1];
        const toAddr = args[2];
        const amount = args[3];
        const toChain = args[4]; // 可选，如果提供则触发 CCTP

        const sourceWallet = state.wallets?.[fromChain];
        if (!sourceWallet) {
          throw new Error(`未找到 ${fromChain} 链的源钱包。`);
        }

        console.log(`执行转账: ${amount} USDC 从 ${fromChain} 到 ${toAddr}${toChain ? ` (${toChain})` : ''}`);
        await service.transferUSDC({
          walletId: sourceWallet.id,
          destinationAddress: toAddr,
          destinationBlockchain: toChain,
          amount
        });
        break;

      default:
        console.log(`
用法:
  ts-node scripts/pay.ts setup                 - 初始化钱包组
  ts-node scripts/pay.ts create-wallet [链]    - 创建新钱包 (默认 ETH-SEPOLIA)
  ts-node scripts/pay.ts balance [链]         - 查询余额
  ts-node scripts/pay.ts list                 - 列出所有钱包
  ts-node scripts/pay.ts pay [源链] [目标地址] [金额] [目标链?] - 执行转账
        `);
    }
  } catch (e: any) {
    console.error("❌ 操作失败:", e.message);
    process.exit(1);
  }
}

main();
