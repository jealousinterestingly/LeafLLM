import { getModel } from './gemini.js';

// Create a context menu item.
browser.contextMenus.create({
  id: 'summarize-text',
  title: 'Summarize',
  contexts: ['selection'],
});

// Listen for context menu clicks.
browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'summarize-text') {
    // Show the loading indicator on the page.
    browser.tabs.sendMessage(tab.id, {
      action: 'show-loading-indicator'
    });

    try {
      // Get the API key from storage.
      const { apiKey } = await browser.storage.sync.get('apiKey');
      if (!apiKey) {
        throw new Error('API key not set. Please set it in the extension popup.');
      }

      // Get the model and generate the content.
      const model = await getModel(apiKey);
      const result = await model.generateContent([
        'Summarize this for a second-grade student:',
        info.selectionText,
      ]);

      // Show the result in a new popup.
      browser.tabs.sendMessage(tab.id, {
        action: 'show-result',
        title: 'Summary',
        text: result.response.text(),
      });
    } catch (error) {
      // Show an error message.
       browser.tabs.sendMessage(tab.id, {
        action: 'show-result',
        title: 'Error',
        text: error.message,
      });
    }
  }
});
