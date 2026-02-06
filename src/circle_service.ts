import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';
import dotenv from 'dotenv';

dotenv.config();

/**
 * CircleService 处理 Circle Developer-Controlled Wallets 和 CCTP 跨链转账
 */
export class CircleService {
  private client: any;

  constructor() {
    // 使用占位环境变量
    const apiKey = (process.env.CIRCLE_API_KEY || 'PLACEHOLDER_API_KEY').trim();
    const entitySecret = (process.env.CIRCLE_ENTITY_SECRET || 'PLACEHOLDER_ENTITY_SECRET').trim();

    if (!process.env.CIRCLE_API_KEY || process.env.CIRCLE_API_KEY === 'PLACEHOLDER_API_KEY') {
      console.warn('警告: 未设置有效的 CIRCLE_API_KEY 环境变量');
    }

    this.client = initiateDeveloperControlledWalletsClient({
      apiKey,
      entitySecret,
    });
  }

  /**
   * 初始化钱包组 (Wallet Set)
   * @param name 钱包组名称
   */
  async initializeWalletSet(name: string = 'ClawPay Wallet Set') {
    try {
      const response = await this.client.createWalletSet({
        name,
      });
      console.log(`钱包组创建成功: ${response.data.walletSet.id}`);
      return response.data.walletSet;
    } catch (error: any) {
      console.error('创建钱包组失败:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * 在指定区块链上创建钱包
   * @param walletSetId 钱包组 ID
   * @param blockchain 区块链标识 (例如: 'ETH-SEPOLIA', 'AVAX-FUJI')
   */
  async createWallet(walletSetId: string, blockchain: string) {
    try {
      const response = await this.client.createWallets({
        walletSetId,
        blockchains: [blockchain],
        count: 1,
      });
      const wallet = response.data.wallets[0];
      console.log(`钱包创建成功: ${wallet.id} (${blockchain})`);
      return wallet;
    } catch (error: any) {
      console.error('创建钱包失败:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * 获取钱包组下的所有钱包
   */
  async listWallets(walletSetId: string) {
    try {
      const response = await this.client.listWallets({
        walletSetId,
      });
      return response.data.wallets;
    } catch (error: any) {
      console.error('获取钱包列表失败:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * 获取指定钱包的 USDC 余额
   * @param walletId 钱包 ID
   */
  async getUSDCBalance(walletId: string) {
    try {
      const response = await this.client.getWalletTokenBalance({
        id: walletId,
      });

      const balances = response.data.tokenBalances;
      const usdcBalance = balances.find((b: any) => b.token.symbol === 'USDC');
      
      const amount = usdcBalance ? usdcBalance.amount : '0';
      console.log(`钱包 ${walletId} 的 USDC 余额为: ${amount}`);
      return amount;
    } catch (error: any) {
      console.error('获取余额失败:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * 执行转账（支持同链和 CCTP 跨链）
   */
  async transferUSDC(params: {
    walletId: string;
    destinationAddress: string;
    destinationBlockchain?: string; // 如果提供且与源链不同，则触发 CCTP
    amount: string;
    feeLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
  }) {
    try {
      // 1. 获取源钱包的 USDC Token ID
      const balancesResponse = await this.client.getWalletTokenBalance({
        id: params.walletId,
      });
      
      const usdcToken = balancesResponse.data.tokenBalances.find(
        (b: any) => b.token.symbol === 'USDC'
      );

      if (!usdcToken) {
        throw new Error('源钱包中未找到 USDC 代币');
      }

      // 2. 构造请求
      const requestBody: any = {
        walletId: params.walletId,
        tokenId: usdcToken.token.id,
        destinationAddress: params.destinationAddress,
        amounts: [params.amount],
        feeLevel: params.feeLevel || 'MEDIUM',
      };

      if (params.destinationBlockchain) {
        requestBody.destinationBlockchain = params.destinationBlockchain;
      }

      const response = await this.client.createTransaction(requestBody);
      console.log('转账交易已提交, ID:', response.data.id);
      return response.data;
    } catch (error: any) {
      console.error('转账失败:', error.response?.data || error.message);
      throw error;
    }
  }
}
