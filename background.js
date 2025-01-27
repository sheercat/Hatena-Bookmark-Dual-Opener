chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openTabs" && Array.isArray(message.urls)) {
    // URLsを別々のタブで開く
    message.urls.forEach((url) => {
      chrome.tabs.create({ url });
    });
    sendResponse({ status: "success" });
  } else {
    sendResponse({ status: "error", message: "Invalid action or URLs" });
  }
});
