document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('settings-form');
    const apiKeyInput = document.getElementById('api-key');

    // Load saved API key
    browser.storage.sync.get('apiKey', function(data) {
        if (data.apiKey) {
            apiKeyInput.value = data.apiKey;
        }
    });

    // Save API key
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const apiKey = apiKeyInput.value;
        browser.storage.sync.set({apiKey: apiKey}, function() {
            console.log('API key saved.');
            window.close();
        });
    });
});
