const newsInfo = document.getElementById('newsInfo');
const categoryInput = document.getElementById('categoryInput');
const searchBtn = document.getElementById('searchBtn');
const loader = document.getElementById('loader');

// Hide loader initially
if (loader) {
    loader.style.display = 'none';
}

const fetchNewsData = async (category = 'technology') => {
    // Show loader
    if (loader) {
        loader.style.display = 'flex';
    }
    
    // Clear previous results
    newsInfo.innerHTML = '';
    
    const apiKey = '2a061efab0bf42188b7a29d8e806a187';
    const url = 'https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}';
    
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        
        // Hide loader
        if (loader) {
            loader.style.display = 'none';
        }
        
        if (data.articles && data.articles.length > 0) {
            // Create news cards with animation delay
            newsInfo.innerHTML = data.articles.map((article, index) => `
                <div style="--animation-order: ${index}">
                    <h3>${article.title || 'No title available'}</h3>
                    ${article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">` : ''}
                    <p>${article.description || 'No description available'}</p>
                    <p><small>Source: ${article.source.name || 'Unknown'} • ${new Date(article.publishedAt).toLocaleDateString()}</small></p>
                    <a href="${article.url}" target="_blank">Read full article</a>
                </div>
            `).join('');
        } else {
            newsInfo.innerHTML = '<div class="no-results"><i class="fas fa-info-circle"></i> No news found for this category. Try another category.</div>';
        }
    } catch (error) {
        // Hide loader on error
        if (loader) {
            loader.style.display = 'none';
        }
        
        console.error('Error fetching news data:', error);
        newsInfo.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Error fetching news data. Please try again later.</div>';
    }
};

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
