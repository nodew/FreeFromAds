chrome.webNavigation.onCompleted.addListener(function (details) {
    cleanAdsInWeibo(details.tabId);
}, { url: [{ urlMatches: "https://weibo.com/*" }] });

chrome.webRequest.onCompleted.addListener(function (details) {
    setTimeout(() => cleanAdsInWeibo(details.tabId), 1000);
}, { urls: ["https://weibo.com/aj/mblog/fsearch?*"] });

function cleanAdsInWeibo(tabId) {
    chrome.tabs.executeScript(tabId, {
        file: "scripts/weibo/cleanAdsInFeeds.js"
    });
}

chrome.webNavigation.onCompleted.addListener(function (details) {
    cleanAdsInZhihuRecommendation(details.tabId);
}, { url: [
    { urlMatches: "https://www.zhihu.com/" },
    { urlMatches: "https://www.zhihu.com/follow" }
]});

chrome.webRequest.onCompleted.addListener(function (details) {
    setTimeout(() => {
        cleanAdsInZhihuRecommendation(details.tabId);
    }, 1000);
}, { urls: [
    "https://www.zhihu.com/api/v3/feed/topstory/recommend*",
    "https://www.zhihu.com/api/v3/moments*"
]});

function cleanAdsInZhihuRecommendation(tabId) {
    chrome.tabs.executeScript(tabId, {
        file: "scripts/zhihu/cleanAdsInRecommendation.js"
    });
}