import { BotContext } from '../types';

export async function handleOnboarding(ctx: BotContext) {
  const onboardingMessage = 'Welcome to LeoFi! Let\'s get you started with your investment journey.';
  ctx.session.messages.push({ type: 'bot', content: onboardingMessage });
  await ctx.reply(onboardingMessage);
}
