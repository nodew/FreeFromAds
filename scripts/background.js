chrome.webNavigation.onCompleted.addListener((details) => {
    cleanAdsInWeibo(details.tabId);
}, { url: [{ urlMatches: "https://weibo.com/*" }] });

chrome.webRequest.onCompleted.addListener((details) => {
    setTimeout(() => cleanAdsInWeibo(details.tabId), 1000);
}, { urls: ["https://weibo.com/aj/mblog/fsearch?*"] });

const cleanAdsInWeibo = (tabId) => {
    chrome.tabs.executeScript(tabId, {
        file: "scripts/weibo/cleanAdsInFeeds.js"
    });
}

chrome.webNavigation.onCompleted.addListener((details) => {
    cleanAdsInZhihuRecommendation(details.tabId);
}, { url: [
    { urlMatches: "https://www.zhihu.com/" },
    { urlMatches: "https://www.zhihu.com/follow" }
]});

chrome.webRequest.onCompleted.addListener((details) => {
    setTimeout(() => {
        cleanAdsInZhihuRecommendation(details.tabId);
    }, 1000);
}, { urls: [
    "https://www.zhihu.com/api/v3/feed/topstory/recommend*",
    "https://www.zhihu.com/api/v3/moments*"
]});

const cleanAdsInZhihuRecommendation = (tabId) => {
    chrome.tabs.executeScript(tabId, {
        file: "scripts/zhihu/cleanAdsInRecommendation.js"
    });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "loading" && tab.url) {
        if (/https?:\/\/(weibo.com|www.zhihu.com)/.test(tab.url)) {
            setIconAndPopup(tabId, true);
        } else {
            setIconAndPopup(tabId, false);
        }
    }
});

const setIconAndPopup = (tabId, active = false) => {
    if (active) {
        chrome.pageAction.setIcon({
            path: {
                "16": "assets/buysellads_active-16.png",
                "32": "assets/buysellads_active-32.png"
            },
            tabId: tabId
        });
        chrome.pageAction.show(tabId);
    } else {
        chrome.pageAction.setIcon({
            tabId: tabId,
            path: {
                "16": "assets/buysellads_inactive-16.png",
                "32": "assets/buysellads_inactive-32.png"
            }
        });
        chrome.pageAction.hide(tabId);
    }
}