import TelegramBot from 'node-telegram-bot-api';

// Токен вашего бота
const token = '';
const bot = new TelegramBot(token, { polling: true });

// Новый публичный URL для Web App
const WEB_APP_URL = '';

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
