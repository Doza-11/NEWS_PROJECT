document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
});

async function fetchNews() {
    try {
        const response = await fetch('/getnews');
        const newsData = await response.json();
        renderNews(newsData);
    } catch (err) {
        console.error('Error fetching news:', err);
    }
}

function renderNews(newsData) {
    const cardsContainer = document.getElementById('cards-container');
    const template = document.getElementById('template-news-card');

    newsData.forEach(article => {
        const cardClone = template.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");
    const bookmark = cardClone.querySelector("#save-button");

    newsImg.src = article.image_url || 'https://via.placeholder.com/400x200';
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.published_date).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} ${date}`;

    newsImg.addEventListener('click', () => {
        window.open(article.url, "_blank");
    });

    bookmark?.addEventListener('click', () => {
        saveArticle(article);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Perform any necessary logout actions, such as clearing session or cookies
            // Redirect to the /index page
            window.location.href = '/index';
        });
    }
});

