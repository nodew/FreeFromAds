function cleanAdsInRecommendation() {
    const feedContainer = document.querySelector(".Topstory-content");
    console.log(feedContainer);
    if (feedContainer) {
        const ads = feedContainer.querySelectorAll(".TopstoryItem--advertCard");
        console.log(ads);
        ads.forEach(ad => {
            ad.parentNode.removeChild(ad)
        });
    }
}

cleanAdsInRecommendation();