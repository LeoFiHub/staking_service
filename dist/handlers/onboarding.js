"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOnboarding = handleOnboarding;
async function handleOnboarding(ctx) {
    const onboardingMessage = 'Welcome to LeoFi! Let\'s get you started with your investment journey.';
    ctx.session.messages.push({ type: 'bot', content: onboardingMessage });
    await ctx.reply(onboardingMessage);
}
