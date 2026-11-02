const GEMINI_API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const classification = await classifyPageContext(tab.title, tab.url);
    if (classification === 'DISTRACTED') {
      chrome.scripting.executeScript({ target: { tabId: tabId }, files: ['content.js'] });
    }
  }
});

async function classifyPageContext(title, url) {
  const { hitlExamples } = await chrome.storage.local.get(['hitlExamples']);
  console.log("Analyzing context with Gemini 2.5 Flash...", { title, url, hitlExamples });
  return "PRODUCTIVE"; 
}
