// CSS styles to inject
const styleContent = `
/* ✅ 1. Wrap and constrain the task list container WITHOUT flex */
div:has(> div[data-task-list-id]) {
  flex-wrap: wrap !important;
  gap: 24px !important;
  justify-content: flex-start !important;
  padding: 20px !important;
  overflow-x: hidden !important;
  overflow-y: visible !important;
  max-height: calc(100vh - 120px) !important;
}

/* ✅ 2. Each task list card */
div[data-task-list-id] {
  flex: 0 1 30% !important;
  max-width: 100% !important;
  min-width: 300px !important;
  box-sizing: border-box !important;
  overflow-y: scroll;
}

.FNTXYe {
  overflow: scroll !important;
  contain: paint !important;
}

/* ✅ 2b. Allow cards to expand downward */
div[data-task-list-id] > div {
  display: flex;
  flex-direction: column;
  height: 100% !important;
}

/* ✅ 3. Don’t force width on completed section */
div[data-task-list-id] > div:not(:has([aria-label="Completed"])) {
  width: 100% !important;
}
`;

let injectedStyle = null;

function enableFeature() {
  console.log("Multirow enabled");

  if (!injectedStyle) {
    injectedStyle = document.createElement("style");
    injectedStyle.id = "multirow-styles";
    injectedStyle.textContent = styleContent;
    document.head.appendChild(injectedStyle);
  }
}

function disableFeature() {
  console.log("Multirow disabled");

  const existing = document.getElementById("multirow-styles");
  if (existing) {
    existing.remove();
    injectedStyle = null;
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "enable-feature") {
    enableFeature();
  } else if (msg.action === "disable-feature") {
    disableFeature();
  }
});

// On page load, apply feature if enabled
chrome.storage.sync.get(["featureEnabled"], (res) => {
  if (res.featureEnabled) {
    enableFeature();
  }
});
