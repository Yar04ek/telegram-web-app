import fs from 'fs';
import { Builder, By, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome.js';

const ELECTRICITY_URLS = {
    check_today: 'https://elektrodistribucija.rs/planirana-iskljucenja-beograd/Dan_0_Iskljucenja.htm',
    check_tomorrow: 'https://elektrodistribucija.rs/planirana-iskljucenja-beograd/Dan_1_Iskljucenja.htm',
    check_day_after_tomorrow: 'https://elektrodistribucija.rs/planirana-iskljucenja-beograd/Dan_2_Iskljucenja.htm',
};

const WATER_URL = 'https://www.bvk.rs/kvarovi-na-mrezi/#toggle-id-1';

// Функция для обновления данных об электричестве
const updateElectricityData = async () => {
    try {
        const options = new Options();
        options.addArguments('--headless', '--disable-gpu');
        const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

        for (const [day, url] of Object.entries(ELECTRICITY_URLS)) {
            await driver.get(url);
            await driver.wait(until.elementLocated(By.tagName('table')), 10000);

            const rows = await driver.findElements(By.xpath('//table//tr'));
            let electricityData = '';

            for (const row of rows) {
                const text = await row.getText();
                electricityData += text + '\n';
            }

            // Сохраняем данные в отдельный файл для каждого дня
            const fileName = `electricity_${day}.txt`;
            fs.writeFileSync(fileName, electricityData, 'utf-8');
            console.log(`Данные об электричестве (${day}) обновлены и сохранены в ${fileName}`);
        }

        await driver.quit();
    } catch (error) {
        console.error('Ошибка обновления данных об электричестве:', error);
    }
};

// Функция для обновления данных о воде
const updateWaterData = async () => {
    try {
        const options = new Options();
        options.addArguments('--headless', '--disable-gpu');
        const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

        await driver.get(WATER_URL);
        await driver.wait(until.elementLocated(By.css('.toggle_content.invers-color[itemprop="text"]')), 10000);

        const contentBlock = await driver.findElement(By.css('.toggle_content.invers-color[itemprop="text"]'));
        const header = await contentBlock.findElement(By.css('h1')).getText();
        const listItems = await contentBlock.findElements(By.css('ul > li'));

        let waterData = `${header}\n\n`;

        for (const item of listItems) {
            const text = await item.getText();
            waterData += text + '\n';
        }

        await driver.quit();

        // Сохраняем данные в файл
        fs.writeFileSync('water_data.txt', waterData, 'utf-8');
        console.log('Данные о воде обновлены и сохранены в water_data.txt');
    } catch (error) {
        console.error('Ошибка обновления данных о воде:', error);
    }
};

// Функция для поиска данных об электричестве
export const getElectricityData = (area, day) => {
    const fileName = `electricity_${day}.txt`;

    // Проверяем, существует ли файл и не пустой ли он
    if (!fs.existsSync(fileName) || fs.readFileSync(fileName, 'utf-8').trim() === '') {
        return `Данные для дня "${day}" отсутствуют.`;
    }

    const fileContent = fs.readFileSync(fileName, 'utf-8');
    const areaData = fileContent
        .split('\n')
        .filter((line) => line.includes(area));

    // Если информация по району не найдена
    if (areaData.length === 0) {
        return `Нет информации по отключению для этого района.`;
    }

    // Возвращаем найденные данные
    return areaData.join('\n');
};

// Функция для поиска данных о воде
export const getWaterData = (area) => {
    const fileName = 'water_data.txt';

    // Проверяем, существует ли файл и не пустой ли он
    if (!fs.existsSync(fileName) || fs.readFileSync(fileName, 'utf-8').trim() === '') {
        return `Информация о воде отсутствует.`;
    }

    // Читаем содержимое файла
    const fileContent = fs.readFileSync(fileName, 'utf-8');
    const lines = fileContent.split('\n').filter(line => line.trim() !== ''); // Убираем пустые строки
    const header = lines[0]; // Первая строка — это время
    const areaData = lines.filter((line) => line.startsWith(area)); // Ищем строки, начинающиеся с названия района

    // Если информация по району не найдена
    if (areaData.length === 0) {
        return `Нет информации по отключению для этого района.`;
    }

    // Возвращаем заголовок (время) и данные для района
    return `${header}\n${areaData.join('\n')}`;
};

// Функция для обновления всех данных
export const updateData = async () => {
    await updateElectricityData();
    await updateWaterData();
};
