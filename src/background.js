console.log('Background script loaded.');

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { message: 'openPopup' });
});
