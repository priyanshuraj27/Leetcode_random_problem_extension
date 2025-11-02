document.getElementById("pick").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const unsolvedOnly = document.getElementById("unsolvedOnly").checked;
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: pickRandomProblem,
    args: [unsolvedOnly]
  });
});

function pickRandomProblem(unsolvedOnly = false) {
  if (window.__leetcode_random_picker_active) return;
  window.__leetcode_random_picker_active = true;

  function showMessage(message, color = "#ffa116") {
    const box = document.createElement("div");
    box.textContent = message;
    Object.assign(box.style, {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -60%)",
      background: color,
      color: "white",
      padding: "20px 32px",
      borderRadius: "14px",
      fontFamily: "Inter, sans-serif",
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
      boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
      zIndex: 999999,
      opacity: "0",
      transition: "opacity 0.5s ease, transform 0.4s ease",
    });

    document.body.appendChild(box);
    requestAnimationFrame(() => {
      box.style.opacity = "1";
      box.style.transform = "translate(-50%, -50%)";
    });

    setTimeout(() => {
      box.style.opacity = "0";
      box.style.transform = "translate(-50%, -60%)";
      setTimeout(() => box.remove(), 400);
    }, 2500);
  }

  let links = [...document.querySelectorAll('a[href*="/problems/"]')]
    .map(a => a.href)
    .filter(href => href.includes("/problems/"));

  links = links.map(href => {
    let clean = href.startsWith("http") ? href : `https://leetcode.com${href}`;
    clean = clean.replace(/(https:\/\/leetcode\.com\/problems\/[a-z0-9-]+)\/?.*$/i, "$1/");
    return clean;
  });

  links = [...new Set(links)].filter(href => /^https:\/\/leetcode\.com\/problems\/[a-z0-9-]+\/$/i.test(href));

  if (unsolvedOnly) {
    const solvedProblems = new Set();
    
    const allSvgs = [...document.querySelectorAll('svg')];
    
    allSvgs.forEach(svg => {
      const svgPath = svg.querySelector('path');
      const pathD = svgPath ? svgPath.getAttribute('d') : '';
      
      if (pathD && (
        pathD.includes('M9.688 15.898') ||
        pathD.includes('9.605 9.605') ||
        pathD.includes('M19.8 6l-8.4 8.4') ||
        pathD.includes('19.8 6l-8.4 8.4')
      )) {
        let parent = svg;
        for (let i = 0; i < 15; i++) {
          parent = parent.parentElement;
          if (!parent) break;
          
          const problemLink = parent.querySelector('a[href*="/problems/"]');
          if (problemLink) {
            let href = problemLink.href;
            let clean = href.startsWith("http") ? href : `https://leetcode.com${href}`;
            clean = clean.replace(/(https:\/\/leetcode\.com\/problems\/[a-z0-9-]+)\/?.*$/i, "$1/");
            solvedProblems.add(clean);
            break;
          }
        }
      }
    });
    
    links = links.filter(link => !solvedProblems.has(link));
    
    if (links.length === 0) {
      showMessage("No unsolved problems found on this page!", "#e63946");
      window.__leetcode_random_picker_active = false;
      return;
    }
  }

  if (links.length === 0) {
    showMessage("No problems found on this page!", "#e63946");
    window.__leetcode_random_picker_active = false;
    return;
  }

  const random = links[Math.floor(Math.random() * links.length)];
  showMessage("Opening random problem...", "#38b000");

  chrome.runtime.sendMessage({ action: "openProblemTab", url: random });

  setTimeout(() => (window.__leetcode_random_picker_active = false), 1000);
}
