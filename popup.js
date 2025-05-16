document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle-feature");

  // Load saved state
  chrome.storage.sync.get(["featureEnabled"], (res) => {
    toggle.checked = res.featureEnabled ?? true;
  });

  toggle.addEventListener("change", () => {
    const enabled = toggle.checked;
    chrome.storage.sync.set({ featureEnabled: enabled });

    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: enabled ? "enable-feature" : "disable-feature",
      });
    });
  });
});
