import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import { execSync } from 'child_process';


const getNgrokUrl = () => {
    try {
        const ngrokApiUrl = "http://127.0.0.1:4040/api/tunnels";
        const result = execSync(`curl -s ${ngrokApiUrl} | jq -r ".tunnels[0].public_url"`).toString().trim();
        if (result.startsWith("http")) {
            return result;
        } else {
            console.error("Ошибка: не удалось получить URL Ngrok.");
            return null;
        }
    } catch (error) {
        console.error("Ошибка при получении Ngrok URL:", error.message);
        return null;
    }
};

// Получаем актуальный URL
const WEB_APP_URL = getNgrokUrl() || "https://your-fallback-url.com";

// Токен вашего бота
const token = 'YOUR_BOT_TOKEN_HERE';
const bot = new TelegramBot(token, { polling: true });

// Команда /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Добро пожаловать! Откройте приложение:', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Открыть приложение', web_app: { url: WEB_APP_URL } }
                ]
            ]
        }
    });
});

// Обработка ошибок
bot.on('polling_error', (error) => {
    console.error(`Ошибка бота: ${error.message}`);
});
