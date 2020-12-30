chrome.webNavigation.onCompleted.addListener(function () {
    cleanAdsInWeibo();
}, { url: [{ urlMatches: "https://weibo.com/*" }] });

chrome.webRequest.onCompleted.addListener(function (details) {
    setTimeout(cleanAdsInWeibo, 1000);
}, { urls: ["https://weibo.com/aj/mblog/fsearch?*"] });

function cleanAdsInWeibo() {
    chrome.tabs.executeScript({
        file: "scripts/cleanAdsInWeibo.js"
    });
}