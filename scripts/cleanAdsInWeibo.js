function cleanAdsInWeibo() {
    const feedContainer = document.querySelector(".WB_feed");
    if (feedContainer) {
        const feeds = feedContainer.querySelectorAll(".WB_cardwrap");
        console.log(feeds)
        feeds.forEach(feed => {
            if(feed.getAttribute("feedtype") === "ad") {
                feed.parentNode.removeChild(feed)
            }
        });
    }
}

cleanAdsInWeibo();