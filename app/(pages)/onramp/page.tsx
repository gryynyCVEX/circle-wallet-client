
// alchemy https://alchemypay.notion.site/USDC-6c1198830af94712b7a10b10b7d7d369

export default async function OnRampPage() {

  return <>
    <h1>OnRampPage</h1>
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
