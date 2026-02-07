import { CircleService } from '../src/circle_service';

async function main() {
  const txId = process.argv[2];
  if (!txId) {
    console.error("用法: ts-node scripts/check_tx.ts <Transaction_ID>");
    process.exit(1);
  }

  const service = new CircleService();
  try {
    const tx = await service.getTransaction(txId);
    console.log("交易状态:", JSON.stringify(tx, null, 2));
  } catch (e: any) {
    console.error("获取交易状态失败:", e.message);
  }
}

main();
