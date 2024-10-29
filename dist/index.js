"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const filters_1 = require("telegraf/filters");
const handlers_1 = require("./handlers");
const deFiLiquidity_1 = require("./handlers/deFiLiquidity");
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN || '');
bot.use((0, telegraf_1.session)());
bot.command('start', (ctx) => {
    ctx.session = {
        messages: [
            { type: 'bot', content: 'Welcome to LeoFi! How can I assist you with your investments today?' }
        ]
    };
    ctx.reply('Welcome to LeoFi! How can I assist you with your investments today?', {
        reply_markup: {
            keyboard: [
                [{ text: 'Portfolio' }, { text: 'Market Analysis' }],
                [{ text: 'Performance' }, { text: 'DeFi Liquidity' }],
                [{ text: 'Onboarding' }, { text: 'MarketPlace' }]
            ],
            resize_keyboard: true,
            one_time_keyboard: false
        }
    });
});
bot.hears('Portfolio', handlers_1.handlePortfolio);
bot.hears('Market Analysis', handlers_1.handleMarketAnalysis);
bot.hears('Performance', handlers_1.handlePerformance);
bot.hears('Onboarding', handlers_1.handleOnboarding);
bot.hears('DeFi Liquidity', deFiLiquidity_1.handleDeFiLiquidity);
bot.hears('Add Liquidity', deFiLiquidity_1.handleAddLiquidity);
bot.hears('Remove Liquidity', deFiLiquidity_1.handleRemoveLiquidity);
bot.hears('Rebalance Portfolio', deFiLiquidity_1.handleRebalance);
bot.command('marketplace', handlers_1.handleMarketplace);
bot.hears('Back to Main Menu', (ctx) => {
    ctx.reply('What would you like to do?', {
        reply_markup: {
            keyboard: [
                [{ text: 'Portfolio' }, { text: 'Market Analysis' }],
                [{ text: 'Performance' }, { text: 'DeFi Liquidity' }],
                [{ text: 'Onboarding' }, { text: 'MarketPlace' }]
            ],
            resize_keyboard: true,
            one_time_keyboard: false
        }
    });
});

bot.action('view_signals', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply('To view and copy signals, please visit our web app: https://www.leofi.xyz/marketplace?tab=signals');
  });
  
  bot.action('view_etfs', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply('To view and invest in ETFs, please visit our web app: https://www.leofi.xyz/marketplace?tab=etfs');
  });
  
  bot.action('create_signal', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply('To create a new signal, please visit our web app: https://www.leofi.xyz/marketplace?action=create_signal');
  });
  
  bot.action('create_etf', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply('To create a new ETF, please visit our web app: https://www.leofi.xyz/marketplace?action=create_etf');
  });
  
  bot.action('main_menu', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply('What would you like to do?', mainMenuKeyboard);
  });

bot.on((0, filters_1.message)('text'), async (ctx) => {
    const userMessage = { type: 'user', content: ctx.message.text };
    ctx.session.messages.push(userMessage);
    // Here you would typically process the message and generate a response
    // For this example, we'll just echo the message back
    const botResponse = { type: 'bot', content: `You said: ${ctx.message.text}` };
    ctx.session.messages.push(botResponse);
    await ctx.reply(botResponse.content);
});
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
