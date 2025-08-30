let popup = null;

// Listen for messages from the background script.
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'show-loading-indicator') {
    showLoadingIndicator();
  } else if (request.action === 'show-result') {
    showResult(request.title, request.text);
  }
});

function removePopup() {
    if (popup) {
        popup.remove();
        popup = null;
    }
}

function createPopup() {
    removePopup();
    popup = document.createElement('div');
    document.body.appendChild(popup);

    // Basic styling
    Object.assign(popup.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '300px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        zIndex: '99999',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        fontFamily: 'sans-serif',
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#333'
    });
}


function showLoadingIndicator() {
    createPopup();
    popup.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; font-weight: bold; margin-bottom: 8px;">
            <span>Summarizing...</span>
            <span id="leaf-close-button" style="cursor: pointer; font-size: 20px;">&times;</span>
        </div>
        <div style="height: 4px; background-color: #eee; border-radius: 2px; overflow: hidden;">
            <div id="leaf-loader" style="width: 50%; height: 100%; background-color: #4CAF50; animation: loading 1.5s infinite;"></div>
        </div>
        <style>
            @keyframes loading {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
            }
        </style>
    `;

    document.getElementById('leaf-close-button').onclick = removePopup;
}

function showResult(title, text) {
    createPopup();
    popup.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; font-weight: bold; margin-bottom: 8px;">
            <span>${title}</span>
            <span id="leaf-close-button" style="cursor: pointer; font-size: 20px;">&times;</span>
        </div>
        <div>${text.replace(/\n/g, '<br>')}</div>
    `;

    document.getElementById('leaf-close-button').onclick = removePopup;
}
