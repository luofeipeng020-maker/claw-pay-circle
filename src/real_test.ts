import { CircleService } from './circle_service';

async function main() {
  console.log("🚀 启动 ClawPay 真实环境验证 (Testnet)...");
  const service = new CircleService();
  
  try {
    console.log("1. 正在尝试创建 Wallet Set...");
    const walletSet = await service.initializeWalletSet("Crayfish-Main-Set");
    console.log("✅ 成功创建 Wallet Set, ID:", walletSet.id);
    
    console.log("2. 正在尝试在 ETH-SEPOLIA 链上开通钱包...");
    const wallet = await service.createWallet(walletSet.id, "ETH-SEPOLIA");
    console.log("✅ 成功创建钱包, 地址:", wallet.address);
    
    console.log("3. 检查初始余额...");
    const balance = await service.getUSDCBalance(wallet.id);
    console.log("📊 当前 USDC 余额:", balance);
    
    console.log("\n--- 验证完成 ---");
  } catch (e: any) {
    console.error("❌ 验证失败:", e.response?.data || e.message);
  }
}

main();
