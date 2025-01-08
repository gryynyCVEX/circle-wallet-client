
"use client";

import {
  createPublicClient,
  http,
  encodeFunctionData,
  parseUnits,
  Address
} from 'viem';
import { arbitrumSepolia } from 'viem/chains';
import { CONTRACT_ABI } from 'abi/contract';
import { TOKEN_ABI } from 'abi/token';
import { useWallets, useCreateExecuteContractMutation } from '@/app/axios';
import { useW3sContext } from '@/app/components';

const platformId: number = 1;
const depositAmount: bigint = parseUnits('1', 6); // 1 USDC in micro dollars
const platformAddress: Address = '0x0160A054370d3A1C7940061D9594977d97164E16';
const usdcAddress: Address = '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d';

const client = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(),
})

const getAllowance = async (owner: Address, spender: Address) => {
  return await client.readContract({
    address: usdcAddress,
    abi: TOKEN_ABI,
    functionName: 'allowance',
    args: [owner, spender],
  });
};

export default function TestPage() {
  const { data: wallets } = useWallets();
  const wallet = wallets?.data.wallets[0];
  const executeContractMutation = useCreateExecuteContractMutation();
  const { client: w3sClient } = useW3sContext();

  const handleDeposit = async () => {
    if (!wallet) {
      return;
    }

    const allowance = await getAllowance(wallet.address as Address, platformAddress);

    console.log('allowance', allowance);

    if (allowance < depositAmount) {
      console.log('Approving USDC spend');
      const approveTXdata = encodeFunctionData({
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [platformAddress, depositAmount],
      });

      console.log('approveTXdata', approveTXdata);

      const { challengeId } = await executeContractMutation.mutateAsync({
        contractAddress: usdcAddress,
        walletId: wallet.id,
        callData: approveTXdata,
        feeLevel: "HIGH",
      });

      w3sClient?.execute(challengeId, (error, result) => {
        console.log('error', error);
        console.log('result', result);
      });
    }

    const depositTXdata = encodeFunctionData({
      abi: CONTRACT_ABI,
      functionName: 'deposit',
      args: [platformId, depositAmount],
    });

    console.log('depositTXdata', depositTXdata);

    const { challengeId } = await executeContractMutation.mutateAsync({
      contractAddress: platformAddress,
      walletId: wallet.id,
      callData: depositTXdata,
      feeLevel: "HIGH",
    });

    w3sClient?.execute(challengeId, (error, result) => {
      console.log('error', error);
      console.log('result', result);
    });
  }

  return <>
    <h1>Test Wallet functions</h1>
    <p>Wallet address: {wallet?.address}</p>
    <button onClick={handleDeposit}>Deposit</button>
  </>;
}
