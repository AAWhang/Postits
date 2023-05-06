console.log('Content script loaded');

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'changeColor') {
    document.body.style.backgroundColor = message.color;
  }
});
