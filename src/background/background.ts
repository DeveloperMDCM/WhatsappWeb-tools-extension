
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ theme: 'default', isEnabled: false });
  });
 
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url?.includes('web.whatsapp.com')) {
        console.log('tabId', tabId);
        
      chrome.scripting.executeScript({
        target: { tabId },
        files: ['content.js']
      });
    }
  });