"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePerformance = handlePerformance;
async function handlePerformance(ctx) {
    const performance = 'Here\'s your investment performance: [Performance details here]';
    ctx.session.messages.push({ type: 'bot', content: performance });
    await ctx.reply(performance);
}
