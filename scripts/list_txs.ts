import { CircleService } from '../src/circle_service';

async function main() {
  const walletId = process.argv[2];
  if (!walletId) {
    console.error("用法: ts-node scripts/list_txs.ts <Wallet_ID>");
    process.exit(1);
  }

  const service = new CircleService();
  try {
    const txs = await service.listTransactions(walletId);
    console.log("交易列表:", JSON.stringify(txs, null, 2));
  } catch (e: any) {
    console.error("获取交易列表失败:", e.message);
  }
}

main();
