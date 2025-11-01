chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg.action === "openProblemTab" && msg.url) {
    const newTab = await chrome.tabs.create({ url: msg.url, active: true });

    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (tabId === newTab.id && info.status === "complete") {
        chrome.scripting.executeScript({
          target: { tabId: newTab.id },
          func: () => {
            const msgBox = document.createElement("div");
            msgBox.textContent = "Thank you for using — Made by Tanmay Tiwari";
            Object.assign(msgBox.style, {
              position: "fixed",
              bottom: "20px",
              right: "20px",
              background: "#1687ffff",
              color: "white",
              padding: "14px 22px",
              borderRadius: "10px",
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: "600",
              textAlign: "center",
              boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
              zIndex: 999999,
              opacity: "0",
              transition: "opacity 0.5s ease",
            });
            document.body.appendChild(msgBox);
            requestAnimationFrame(() => (msgBox.style.opacity = "1"));
            setTimeout(() => {
              msgBox.style.opacity = "0";
              setTimeout(() => msgBox.remove(), 400);
            }, 2500);
          }
        });
        chrome.tabs.onUpdated.removeListener(listener);
      }
    });
  }
});
