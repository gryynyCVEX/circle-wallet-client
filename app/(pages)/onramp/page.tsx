"use client";

import { TransakConfig, Transak } from '@transak/transak-sdk';
import { useWallets } from '@/app/axios';

const transakBaseConfig: TransakConfig = {
  apiKey: 'c849eb1d-c22a-49e9-9899-7ae69192bc2d', // (Required)
  environment: Transak.ENVIRONMENTS.STAGING, // Transak.ENVIRONMENTS.PRODUCTION // (Required)
  cryptoCurrencyCode: 'USDC',
  network: 'arbitrum',
};

let transak: Transak | null = null;

// To get all the events
Transak.on('*', (data) => {
  console.log(data);
});

// This will trigger when the user closed the widget
Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
  console.log('Transak SDK closed!');
  transak?.close();
});

/*
* This will trigger when the user has confirmed the order
* This doesn't guarantee that payment has completed in all scenarios
* If you want to close/navigate away, use the TRANSAK_ORDER_SUCCESSFUL event
*/
Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, (orderData) => {
  console.log(orderData);
});

/*
* This will trigger when the user marks payment is made
* You can close/navigate away at this event
*/
Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
  console.log(orderData);
  transak?.close();
});

export default function OnRampPage() {
  const { data: wallets } = useWallets();
  const wallet = wallets?.data.wallets[0];

  const handleBuy = () => {
    if (!wallet) {
      return;
    }

    transak = new Transak({
      ...transakBaseConfig,
      productsAvailed: 'BUY',
      walletAddress: wallet.address,
    });

    transak.init();
  };

  const handleSell = () => {

    transak = new Transak({
      ...transakBaseConfig,
      productsAvailed: 'SELL',
    });

    transak.init();
  };

  return <>
    <h1>On-ramp</h1>
    <p>Wallet address: {wallet?.address}</p>
    <button onClick={handleBuy}>Buy USDC</button>

    <h1>Off-ramp</h1>
    <button onClick={handleSell}>Sell</button>
  </>;
}
