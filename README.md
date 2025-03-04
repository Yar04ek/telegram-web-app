ElWa App - Telegram Web App for Monitoring Electricity and Water Outages
ElWa App is a web application integrated with Telegram to help users monitor scheduled electricity and water outages in their area. It fetches real-time updates from official sources and provides easy access to this information via a user-friendly interface and Telegram bot integration.

Features
Electricity Outage Monitoring: Check scheduled electricity outages for today, tomorrow, or the day after tomorrow in specific areas.
Water Outage Updates: View real-time information on water outages for selected regions.
Telegram Bot Integration: Access the web app directly from a Telegram bot, providing quick and easy access to updates.
Automated Data Updates: Scheduled scripts automatically fetch and update outage data from official websites.
Customizable Areas: Users can select specific regions to get targeted information.
Technologies Used
Backend: Node.js, Express.js
Frontend: HTML, CSS, JavaScript
Web Scraping: Selenium WebDriver with ChromeDriver
Telegram Integration: node-telegram-bot-api
Process Management: PM2 for running the server and bot
Setup Instructions
Clone the Repository:

bash
Копировать код
git clone https://github.com/your-username/elwa-app.git
cd elwa-app
Install Dependencies:

bash
Копировать код
npm install
Set Up Environment:

Ensure google-chrome and chromedriver are installed and paths are correctly set.
Configure the Telegram bot token in bot.js.
Run the Application:

Start the server:
bash
Копировать код
pm2 start server.js --name "server"
Start the bot:
bash
Копировать код
pm2 start bot.js --name "bot"
Access the App:

Open the web app at http://localhost:3000.
Use the Telegram bot to access the app via the provided link.



ElWa App — это веб-приложение, интегрированное с Telegram, которое помогает пользователям следить за запланированными отключениями электричества и воды в их районе. Приложение получает актуальную информацию с официальных источников и предоставляет доступ к этим данным через удобный интерфейс и Telegram-бота.

Основные возможности
Мониторинг отключений электричества: Узнавайте о запланированных отключениях электричества на сегодня, завтра или послезавтра в выбранных районах.
Обновления о воде: Просматривайте информацию о текущих отключениях воды для конкретных регионов.
Интеграция с Telegram-ботом: Получайте доступ к веб-приложению напрямую из Telegram для удобного и быстрого доступа к информации.
Автоматическое обновление данных: Сценарии автоматически извлекают и обновляют данные об отключениях с официальных сайтов.
Выбор региона: Пользователи могут выбирать конкретные районы для получения таргетированной информации.
Используемые технологии
Бэкенд: Node.js, Express.js
Фронтенд: HTML, CSS, JavaScript
Сбор данных: Selenium WebDriver с ChromeDriver
Интеграция с Telegram: node-telegram-bot-api
Управление процессами: PM2 для запуска сервера и бота
Инструкция по установке
Клонируйте репозиторий:

bash
Копировать код
git clone https://github.com/your-username/elwa-app.git
cd elwa-app
Установите зависимости:

bash
Копировать код
npm install
Настройте окружение:

Убедитесь, что установлены google-chrome и chromedriver, и пути к ним указаны корректно.
Настройте токен Telegram-бота в файле bot.js.
Запустите приложение:

Запуск сервера:
bash
Копировать код
pm2 start server.js --name "server"
Запуск бота:
bash
Копировать код
pm2 start bot.js --name "bot"
Доступ к приложению:

Откройте веб-приложение по адресу http://localhost:3000.
Используйте Telegram-бота для доступа к приложению через предоставленную ссылку.

