import { BotContext } from '../types';

export async function handlePerformance(ctx: BotContext) {
  const performanceSummary = 'Here\'s a summary of your meme coin investment performance:';
  
  // Sample DeFi portfolio performance table with meme coins
  const performanceTable = `
\`\`\`
| Asset    | Amount     | Value (USD) | 24h Change |
|----------|------------|-------------|------------|
| DOGE     | 10,000     | $720        | +15.2%     |
| SHIB     | 5,000,000  | $450        | -5.8%      |
| PEPE     | 1,000,000  | $320        | +30.7%     |
| BONK     | 10,000,000 | $180        | -2.3%      |
| ETH      | 0.5        | $1,000      | +2.1%      |
| USDC     | 1,000      | $1,000      | 0%         |
| Total    |            | $3,670      | +6.5%      |
\`\`\``;

  const dashboardLink = 'For detailed performance tracking, please visit our dashboard: [📊 View Dashboard](https://www.leofi.xyz/)';
  
  const message = `${performanceSummary}\n\n${performanceTable}\n\n${dashboardLink}`;
  
  ctx.session.messages.push({ type: 'bot', content: message });
  await ctx.reply(message, { parse_mode: 'Markdown' });
}
