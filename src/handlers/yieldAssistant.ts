import { BotContext, SessionData } from '../types';

interface LiquidityPool {
  name: string;
  apy: string;
  tvl: string;
  recommended: boolean;
}

export async function handleYieldAssistant(ctx: BotContext) {
      const opportunities = [
        {
          id: 'APT-USDC-01',
          name: 'APT-USDC LP',
          type: 'Liquidity Mining',
          apy: 18.5,
          platform: 'AptosSwap',
          totalValueLocked: '$5.2M',
          volume24h: '$1.8M'
        },
        {
          id: 'MOVE-APT-01',
          name: 'MOVE-APT Farming',
          type: 'Yield Farming',
          apy: 22.7,
          platform: 'MoveX',
          totalValueLocked: '$3.7M',
          harvestInterval: '6 hours'
        },
        {
          id: 'APT-STAKE-01',
          name: 'APT Staking',
          type: 'Staking',
          apy: 8.9,
          platform: 'Aptos Network',
          totalStaked: '15M APT',
          lockPeriod: '30 days'
        },
        {
          id: 'USDT-USDC-01',
          name: 'USDT-USDC LP',
          type: 'Stable LP',
          apy: 5.2,
          platform: 'AptosStable',
          totalValueLocked: '$10.5M',
          feeAPR: '2.1%'
        },
        {
          id: 'BTC-APT-01',
          name: 'BTC-APT Farming',
          type: 'Cross-chain Yield',
          apy: 15.8,
          platform: 'AptosWormhole',
          totalValueLocked: '$2.9M',
          rewardsToken: 'WORM'
        },
      ];      
      const createAsciiGraph = (selectedOpportunities: any, initialInvestment: any) => {
        const graph = [
          "    [Your Wallet]    ",
          `    $${initialInvestment}    `,
          "          |          ",
          "          v          ",
          "    +-----------+    ",
          "    |   LeoFi   |    ",
          "    | Platform  |    ",
          "    +-----------+    ",
          "          |          ",
          "    +-----+-----+    ",
        ];
      
        selectedOpportunities.forEach((opp: any, index: any) => {
          const investment = (initialInvestment / selectedOpportunities.length).toFixed(2);
          graph.push(`    |     ${opp.id}     |    `);
          graph.push(`    |  $${investment}  |    `);
          graph.push(`    |  ${opp.apy.toFixed(1)}% APY  |    `);
          if (index < selectedOpportunities.length - 1) {
            graph.push(`    +-----+-----+    `);
          }
        });
      
        graph.push("          |          ");
        graph.push("          v          ");
        graph.push("    [DeFi Protocols] ");
      
        return graph.join('\n');
      };
      
      const createTelegramMessage = (asciiGraph: any, selectedOpportunities: any, initialInvestment: any) => {
        let message = "<b>🦁 LeoFi DeFi Opportunities 🦁</b>\n\n";
        message += `<b>Initial Investment:</b> $${initialInvestment}\n\n`;
        message += "<b>Here are your selected DeFi routes:</b>\n\n";
        message += `<pre>${asciiGraph}</pre>\n\n`;
        message += "<b>📊 Opportunity Details:</b>\n\n";
        selectedOpportunities.forEach((opp: any) => {
          const investment = (initialInvestment / selectedOpportunities.length).toFixed(2);
          message += `<b>${opp.id}. ${opp.name}</b> (${opp.type})\n`;
          message += `   💰 Investment: $${investment}\n`;
          message += `   📈 APY: ${opp.apy.toFixed(2)}%\n`;
          message += `   🏦 Platform: ${opp.platform}\n`;
          message += `   💸 Estimated Annual Yield: $${(Number(investment) * opp.apy / 100).toFixed(2)}\n\n`;
        });
        message += "Unlock your financial potential with LeoFi—explore decentralized asset management and start growing your investments today! Start your virtual investment <a href='https://leofi.xyz'>here</a> 🦁";
        return message;
      };
      
      // Assume we have the selected opportunities and initial investment
      const selectedOpportunities = [opportunities[0], opportunities[2]]; // Example: selecting A and C
      const initialInvestment = 1000;
      
      const asciiGraph = createAsciiGraph(selectedOpportunities, initialInvestment);
      const telegramMessage = createTelegramMessage(asciiGraph, selectedOpportunities, initialInvestment);
      
      // Send the message using ctx.replyWithHTML
      ctx.replyWithHTML(telegramMessage);
}