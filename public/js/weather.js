const weatherInfo = document.getElementById('weatherInfo');
const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const loader = document.getElementById('loader');

// Hide loader initially
if (loader) {
    loader.style.display = 'none';
}

// Weather icon mapping
const weatherIcons = {
    'Clear': 'fa-sun',
    'Clouds': 'fa-cloud',
    'Rain': 'fa-cloud-rain',
    'Drizzle': 'fa-cloud-rain',
    'Thunderstorm': 'fa-bolt',
    'Snow': 'fa-snowflake',
    'Mist': 'fa-smog',
    'Smoke': 'fa-smog',
    'Haze': 'fa-smog',
    'Dust': 'fa-smog',
    'Fog': 'fa-smog',
    'Sand': 'fa-wind',
    'Ash': 'fa-volcano',
    'Squall': 'fa-wind',
    'Tornado': 'fa-tornado'
};

const getWeatherIcon = (weatherMain) => {
    return weatherIcons[weatherMain] || 'fa-cloud';
};

const fetchWeatherData = async (location = 'Bengaluru') => {
    // Show loader
    if (loader) {
        loader.style.display = 'flex';
    }
    
    const apiKey = 'f25d3ac49c4968e364e44af7592b45c9';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Hide loader
        if (loader) {
            loader.style.display = 'none';
        }
        
        if (data.cod === 200) {
            // Convert temperature from Kelvin to Celsius and Fahrenheit
            const tempCelsius = (data.main.temp - 273.15).toFixed(1);
            const tempFahrenheit = ((data.main.temp - 273.15) * 9/5 + 32).toFixed(1);
            
            // Get icon class
            const iconClass = getWeatherIcon(data.weather[0].main);
            
            weatherInfo.innerHTML = `
                <div class="weather-card animated-element">
                    <div class="weather-icon">
                        <i class="fas ${iconClass} fa-4x"></i>
                    </div>
                    <h3>${data.name}, ${data.sys.country}</h3>
                    <div class="weather-temp">
                        ${tempCelsius}°C / ${tempFahrenheit}°F
                    </div>
                    <div class="weather-description">
                        ${data.weather[0].description}
                    </div>
                    <div class="weather-details">
                        <div class="weather-detail">
                            <i class="fas fa-tint"></i>
                            <span>Humidity: ${data.main.humidity}%</span>
                        </div>
                        <div class="weather-detail">
                            <i class="fas fa-wind"></i>
                            <span>Wind: ${(data.wind.speed * 3.6).toFixed(1)} km/h</span>
                        </div>
                        <div class="weather-detail">
                            <i class="fas fa-compress-arrows-alt"></i>
                            <span>Pressure: ${data.main.pressure} hPa</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            weatherInfo.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Location not found. Please try another city.</p>
                </div>
            `;
        }
    } catch (error) {
        // Hide loader on error
        if (loader) {
            loader.style.display = 'none';
        }
        
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error fetching weather data. Please try again later.</p>
            </div>
        `;
    }
};

// Add event listener to search button
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const location = locationInput.value.trim() || 'Bengaluru';
        fetchWeatherData(location);
    });
}

// Allow search on Enter key press
if (locationInput) {
    locationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const location = locationInput.value.trim() || 'Bengaluru';
            fetchWeatherData(location);
        }
    });
}

// Fetch default weather on page load
fetchWeatherData();
