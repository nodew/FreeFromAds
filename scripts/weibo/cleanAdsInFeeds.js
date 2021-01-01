function cleanAdsInFeeds() {
    const feedsContainer = document.querySelector(".WB_feed");
    console.log(feedsContainer);
    if (feedsContainer) {
        const feeds = feedsContainer.querySelectorAll(".WB_cardwrap");
        console.log(feeds);
        feeds.forEach(feed => {
            if(feed.getAttribute("feedtype") === "ad") {
                feed.parentNode.removeChild(feed)
            }
        });
    }
}

cleanAdsInFeeds();