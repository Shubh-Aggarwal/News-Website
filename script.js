const API_KEY = "ea5909be4f9948798296be53d97ac04b";
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener("load", () => fecthNews("India"));

function relaod() {
    window.location.reload();
}

async function fecthNews(query) {
    const res = await fetch(`${url}${query} &apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsTemplate = document.getElementById("template-news-card")

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsTemplate.content.cloneNode(true); //for deep cloning
        fillDatainCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });

}

function fillDatainCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    //fetcing date and other data
    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    //adding functionality when user click on any news
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    }); //blank is for new tab.
}
    let curSelectedNav = null;
    function onNavItemClick(id) {
        //fetch news and bind data.
        fecthNews(id);
        const navItem = document.getElementById(id);
        curSelectedNav?.classList.remove('active');
        curSelectedNav = navItem;
        curSelectedNav.classList.add('active');
    }

    const searchButton = document.getElementById("search-button");
    const searchText = document.getElementById("search-text");

    searchButton.addEventListener("click", () => {
        const query = searchText.value;
        if (!query) return;
        fecthNews(query);
        curSelectedNav?.classList.remove("active");
        curSelectedNav = null;
    });