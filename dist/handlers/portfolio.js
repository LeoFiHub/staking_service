"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePortfolio = handlePortfolio;
const chartService_1 = require("../services/chartService");
async function handlePortfolio(ctx) {
    const portfolioSummary = 'Here\'s a summary of your current portfolio:';
    ctx.session.messages.push({ type: 'bot', content: portfolioSummary });
    await ctx.reply(portfolioSummary);
    const chartBuffer = await (0, chartService_1.generatePortfolioChart)();
    ctx.session.messages.push({ type: 'chart', content: 'Portfolio Breakdown' });
    await ctx.replyWithPhoto({ source: chartBuffer });
    const followUp = 'Would you like to see market analysis or manage your investments?';
    ctx.session.messages.push({ type: 'bot', content: followUp });
    await ctx.reply(followUp);
}
