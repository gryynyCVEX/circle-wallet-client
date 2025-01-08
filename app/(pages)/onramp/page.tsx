
// alchemy https://alchemypay.notion.site/USDC-6c1198830af94712b7a10b10b7d7d369

export default async function OnRampPage() {

  return <>
    <h1>Onramp Money:</h1>
    <iframe
      src="https://onramp.money/main/buy/?appId=1&network=arbitrum&coinCode=usdc&walletAddress=0xce4c9Be3CFC121bAd7D2D70266f6a976F08728DD&paymentMethod=1&fiatType=21"
      height="700"
    />
    <h1>Alchemy Pay</h1>
    <iframe
      height="625"
      title="AlchemyPay On/Off Ramp Widget"
      src="https://ramptest.alchemypay.org/?appId=f83Is2y7L425rxl8&fiat=USD&network=ARBITRUM&crypto=USDC&address=0xce4c9Be3CFC121bAd7D2D70266f6a976F08728DD"
      allowTransparency={true}
      allowFullScreen={true}
      style={{ display: "block", width: "100%", maxHeight: 625, maxWidth: 500 }}
    />
  </>;
}
