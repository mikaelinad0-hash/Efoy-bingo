const express = require('express');
const path = require('path');
const { Telegraf, Markup } = require('telegraf');

const BOT_TOKEN = '8855187131:AAFYpT-F0N4wEyW...'; // የቦት ቶከንህ
const bot = new Telegraf(BOT_TOKEN);
const app = express();

const WEB_APP_URL = 'https://efoy-bingo.vercel.app';

app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

bot.start((ctx) => {
  ctx.reply(
    'እንኳን ወደ እፎይ ቢንጎ (Efoy Bingo) በሰላም መጡ!',
    Markup.inlineKeyboard([
      [Markup.button.webApp('🎮 ጨዋታውን ጀምር', WEB_APP_URL)]
    ])
  );
});

function calculatePayout(totalStakes, houseEdgePercent = 20) {
  const houseProfit = totalStakes * (houseEdgePercent / 100);
  const prizePool = totalStakes - houseProfit;
  return { houseProfit, prizePool };
}

module.exports = app;
