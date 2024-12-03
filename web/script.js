document.getElementById('electricity').addEventListener('click', async () => {
    const area = 'Нови Београд'; // Пример: замените на ввод пользователя
    const day = 'check_today'; // Пример: замените на ввод пользователя
    try {
        const response = await fetch('/api/electricity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ area, day }),
        });
        const data = await response.json();
        document.getElementById('result').innerText = data.message;
    } catch (error) {
        console.error('Ошибка:', error);
    }
});

document.getElementById('water').addEventListener('click', async () => {
    const area = 'Врачар'; // Пример: замените на ввод пользователя
    try {
        const response = await fetch('/api/water', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ area }),
        });
        const data = await response.json();
        document.getElementById('result').innerText = data.message;
    } catch (error) {
        console.error('Ошибка:', error);
    }
});
