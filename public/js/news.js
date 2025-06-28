const newsInfo = document.getElementById('newsInfo');
const categoryInput = document.getElementById('categoryInput');
const searchBtn = document.getElementById('searchBtn');
const loader = document.getElementById('loader');

// Hide loader initially
if (loader) {
    loader.style.display = 'none';
}

const fetchNewsData = async (category = 'technology') => {
    if (loader) loader.style.display = 'flex';
    newsInfo.innerHTML = '';

    const apiKey = '2a061efab0bf42188b7a29d8e806a187';
    const url = `https://newsapi.org/v2/everything?q=${category}&sortBy=publishedAt&language=en&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (loader) loader.style.display = 'none';

        if (data.articles && data.articles.length > 0) {
            const checkPromises = data.articles.map(article => {
                if (article.urlToImage) {
                    return checkImage(article.urlToImage).then(ok => ({ article, ok }));
                }
                return Promise.resolve({ article, ok: true });
            });

            const results = await Promise.all(checkPromises);

            const validArticles = results
                .filter(result => result.ok)
                .map((result, index) => {
                    const article = result.article;
                    return `
                        <div class="article-card animated-element" style="animation-delay: ${index * 0.1}s;">
                            <h3>${article.title || 'No title available'}</h3>
                            ${article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">` : ''}
                            <p>${article.description || 'No description available'}</p>
                            <p><small>Source: ${article.source.name || 'Unknown'} • ${new Date(article.publishedAt).toLocaleDateString()}</small></p>
                            <a href="${article.url}" target="_blank">Read full article</a>
                        </div>
                    `;
                });

            if (validArticles.length > 0) {
                newsInfo.innerHTML = validArticles.join('');
            } else {
                newsInfo.innerHTML = '<div class="no-results"><i class="fas fa-info-circle"></i> No loadable news found for this category. Try another category.</div>';
            }
        } else {
            newsInfo.innerHTML = '<div class="no-results"><i class="fas fa-info-circle"></i> No news found for this category. Try another category.</div>';
        }
    } catch (error) {
        if (loader) loader.style.display = 'none';
        console.error('Error fetching news data:', error);
        newsInfo.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Error fetching news data. Please try again later.</div>';
    }
};

function checkImage(url) {
    return new Promise(resolve => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
}


// Add event listener to search button
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const category = categoryInput.value.trim() || 'technology';
        fetchNewsData(category);
    });
}

// Allow search on Enter key press
if (categoryInput) {
    categoryInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const category = categoryInput.value.trim() || 'technology';
            fetchNewsData(category);
        }
    });
}

// Fetch default news on page load
fetchNewsData();
