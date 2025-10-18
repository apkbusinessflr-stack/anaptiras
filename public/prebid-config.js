
// Prebid boot with bidders params example (replace with pruned build in production)
window.pbjs = window.pbjs || {que:[]};
(async function(){
  // Load bidder params
  let bidderParams = {};
  try {
    const res = await fetch('/prebid-bidders.json', { cache: 'no-store' });
    bidderParams = await res.json();
  } catch(e) { console.warn('No bidder params', e); }

  pbjs.que.push(function() {
    pbjs.setConfig({
      timeout: 1000,
      userSync: { iframeEnabled: true },
      consentManagement: { cmpApi: 'iab', timeout: 800, tcfApiVersion: 2 },
      currency: { adServerCurrency: 'EUR' },
      priceGranularity: 'medium'
    });
    // Expose bidder params for UI to use (dev)
    window.__PREBID_BIDDERS = bidderParams;
  });
})();
