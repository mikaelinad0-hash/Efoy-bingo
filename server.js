const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const BOT_TOKEN = '8855187131:AAFYpT-F0N4wEyV68oBpRqnepZrVk7BGn7E';
const bot = new Telegraf(BOT_TOKEN);
const app = express();

// ሚኒ-አፑ የሚከፈትበት የዌብሳይት ሊንክ (Deployment በኋላ የሚቀየር)
const WEB_APP_URL = 'https://efoy-bingo.vercel.app'; 

// /start ሲባል የሚላክ መልእክት
bot.start((ctx) => {
    ctx.reply(
        `እንኳን ወደ እፎይ ቢንጎ (Efoy Bingo) በሰላም መጡ! 🎲\n\nዕድልዎን ይሞክሩ እና ያሸንፉ!`,
        Markup.inlineKeyboard([
            [Markup.button.webApp('🎮 ጨዋታውን ጀምር (Play Bingo)', WEB_APP_URL)]
        ])
    );
});

// የ20% House Edge የትርፍ ስሌት አልጎሪዝም
function calculatePayout(totalStakes, houseEdgePercent = 0.20) {
    const houseProfit = totalStakes * houseEdgePercent; // 20% የቦቱ ትርፍ
    const prizePool = totalStakes - houseProfit;        // 80% ለአሸናፊው
    return { houseProfit, prizePool };
}

bot.launch();
console.log("እፎይ ቢንጎ ቦት ስራ ጀምሯል!");
