#!/bin/bash

echo "🔄 Запуск ngrok..."
ngrok http 3000 > /dev/null &
sleep 3


NEW_URL=$(curl -s http://127.0.0.1:4040/api/tunnels | jq -r '.tunnels[0].public_url')

if [[ $NEW_URL == "null" || -z $NEW_URL ]]; then
    echo "❌ Ошибка: Не удалось получить URL от ngrok!"
    exit 1
fi

echo "✅ Новый ngrok URL: $NEW_URL"


sed -i "s|const WEB_APP_URL = '.*';|const WEB_APP_URL = '$NEW_URL';|" bot.js

echo "🔄 Перезапуск бота..."
pm2 restart bot

echo "🚀 Все готово! Новый адрес: $NEW_URL"
