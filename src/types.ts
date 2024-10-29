import { Context } from 'telegraf';

export interface Message {
  type: 'user' | 'bot' | 'chart';
  content: string;
}

export interface SessionData {
  messages: Array<{ type: string; content: string }>;
  portfolio: any; // Add this line
  awaitingPortfolioInput: boolean;
}

export interface BotContext extends Context {
  session: SessionData;
}

export interface PortfolioItem {
  asset: string;
  amount: number;
  buyPrice: number;
}