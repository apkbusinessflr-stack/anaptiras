
// Lightweight CMP stub for development. Replace with a real CMP in production.
(function(){
  // TCF v2.2 minimal mock; real CMP should set __tcfapi and collect consent legitimately.
  window.__tcfapi = function(cmd, version, cb) {
    if (cmd === 'getTCData') {
      cb({tcString: 'dummy_tc_string', eventStatus: 'tcloaded', gdprApplies: true}, true);
    }
  };
  // Google Consent Mode v2 example defaults (NPA until consent)
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'granted'
  });
  // In real CMP, call this after consent:
  window.__grantAdsConsent = function(){
    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted'
    });
  };
})();
