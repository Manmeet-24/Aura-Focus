function injectIronWall() {
  const overlay = document.createElement('div');
  overlay.id = 'aurafocus-iron-wall';
  overlay.innerHTML = `
    <div class="aurafocus-container">
      <h2>Focus Drift Detected</h2>
      <p>Our AI agent classified this page as a distraction.</p>
      <button id="close-tab">Close Tab</button>
      <button id="hitl-override">Override: This is Productive (Train AI)</button>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById('hitl-override').addEventListener('click', () => {
    const pageData = { title: document.title, url: window.location.href, timestamp: Date.now() };
    chrome.storage.local.get(['hitlExamples'], (result) => {
      const examples = result.hitlExamples || [];
      examples.push(pageData);
      chrome.storage.local.set({ hitlExamples: examples }, () => {
        console.log("Syncing override telemetry to Supabase backend...", pageData);
        overlay.remove();
      });
    });
  });
}
injectIronWall();
