"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeFiLiquidity = handleDeFiLiquidity;
exports.handleAddLiquidity = handleAddLiquidity;
exports.handleRemoveLiquidity = handleRemoveLiquidity;
exports.handleRebalance = handleRebalance;
async function handleDeFiLiquidity(ctx) {
    // Simulated data - in a real scenario, this would come from an API or database
    const totalValueLocked = ",245.67";
    const dailyChange = "+2.5%";
    const liquidityPools = [
        { name: "ETH/USDC", apy: "5.2%", tvl: ".2B", recommended: true },
        { name: "BTC/ETH", apy: "4.8%", tvl: "M", recommended: false },
        { name: "AAVE/USDT", apy: "6.1%", tvl: "M", recommended: true },
    ];
    let message = "📊 DeFi Liquidity Performance Summary\n\n";
    message += `💰 Total Value Locked: ${totalValueLocked}\n`;
    message += `📈 24h Change: ${dailyChange}\n\n`;
    message += "🏊‍♂️ Recommended Liquidity Pools:\n";
    liquidityPools.forEach(pool => {
        message += `\n${pool.name}\n`;
        message += `   APY: ${pool.apy}\n`;
        message += `   TVL: ${pool.tvl}\n`;
        if (pool.recommended) {
            message += `   ✅ Recommended\n`;
        }
    });
    message += "\nWhat would you like to do?\n";
    message += "• Add Liquidity\n";
    message += "• Remove Liquidity\n";
    message += "• Rebalance Portfolio";
    ctx.session.messages.push({ type: 'bot', content: message });
    await ctx.reply(message, {
        reply_markup: {
            keyboard: [
                [{ text: "Add Liquidity" }, { text: "Remove Liquidity" }],
                [{ text: "Rebalance Portfolio" }, { text: "Back to Main Menu" }]
            ],
            resize_keyboard: true,
            one_time_keyboard: false
        }
    });
}
async function handleAddLiquidity(ctx) {
    const message = "To add liquidity, please specify the pool and the amount you wish to add. For example: 'Add 100 USDC to ETH/USDC pool'";
    ctx.session.messages.push({ type: 'bot', content: message });
    await ctx.reply(message);
}
async function handleRemoveLiquidity(ctx) {
    const message = "To remove liquidity, please specify the pool and the amount you wish to remove. For example: 'Remove 50 USDC from ETH/USDC pool'";
    ctx.session.messages.push({ type: 'bot', content: message });
    await ctx.reply(message);
}
async function handleRebalance(ctx) {
    const message = "Rebalancing your portfolio will adjust your positions across different pools to optimize returns. Would you like to proceed with rebalancing?";
    ctx.session.messages.push({ type: 'bot', content: message });
    await ctx.reply(message, {
        reply_markup: {
            keyboard: [
                [{ text: "Yes, rebalance my portfolio" }, { text: "No, keep current allocation" }],
                [{ text: "Back to Liquidity Menu" }]
            ],
            resize_keyboard: true,
            one_time_keyboard: false
        }
    });
}
