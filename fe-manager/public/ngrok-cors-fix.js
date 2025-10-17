// Фикс для CORS при использовании ngrok
(function() {
    // Сохраняем оригинальный fetch
    const originalFetch = window.fetch;
    
    // Переопределяем fetch для добавления заголовков CORS
    window.fetch = function(...args) {
        const [url, options = {}] = args;
        
        // Добавляем заголовки CORS для всех запросов
        const newOptions = {
            ...options,
            mode: 'cors',
            credentials: 'omit',
            headers: {
                ...options.headers,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        
        return originalFetch(url, newOptions);
    };
})();