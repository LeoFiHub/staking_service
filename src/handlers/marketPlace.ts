import { BotContext } from '../types';

export async function handleMarketplace(ctx: BotContext) {
  const message = `
Welcome to the LeoFi Yield Assistant! 🌾

Here you can access our Yield Optimization Marketplace, where you can:

• Discover the best staking and farming opportunities from top DeFi protocols
• Compare yields from liquidity mining pools
• Invest in on-chain ETFs tailored for DeFi yields
• Create and manage your custom yield farming strategies

Visit our web app to explore the full functionality:
🌐 LeoFi Yield Assistant (https://www.leofi.xyz/)

What would you like to do?`;

const keyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "View Staking Opportunities", callback_data: "view_staking" }],
      [{ text: "View Liquidity Mining Pools", callback_data: "view_liquidity_pools" }],
      [{ text: "Invest in On-Chain ETFs", callback_data: "invest_etfs" }],
      [{ text: "Create Custom Yield Strategy", callback_data: "create_yield_strategy" }],
    ]
  }
};


  ctx.session.messages.push({ type: 'bot', content: message });
  await ctx.reply(message, { ...keyboard, parse_mode: 'Markdown' });
}