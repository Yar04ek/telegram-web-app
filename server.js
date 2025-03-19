import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getElectricityData, getWaterData, updateData } from './services.js';

// Получаем текущую директорию для ES-модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Раздача статических файлов из папки web
app.use(express.static(path.join(__dirname, 'web')));

// Корневой маршрут: возвращаем index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

// API для поиска данных об электричестве
app.post('/api/electricity', (req, res) => {
    const { area, day } = req.body;
    const data = getElectricityData(area, day);
    res.json({ message: data });
});

// API для поиска данных о воде
app.post('/api/water', (req, res) => {
    const { area } = req.body;
    const data = getWaterData(area);
    res.json({ message: data });
});

// Запуск автоматического обновления данных
const startDataUpdate = () => {
    console.log("⏳ Ожидание перед первым обновлением данных...");


    setTimeout(() => {
        console.log("🚀 Первоначальное обновление данных...");
        updateData();

        
        setInterval(() => {
            console.log("🔄 Запускаем плановое обновление данных...");
            updateData();
        }, 60 * 60 * 1000);

    }, 10 * 1000);
};

startDataUpdate();


// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
