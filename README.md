# InfoStream - Real-time Data Hub

## Overview
InfoStream is a dynamic web application that fetches and displays real-time weather data and news articles. It is designed with a modern, responsive interface and stunning animations to provide an engaging user experience.

## Features
- **Weather Updates**: Fetch real-time weather data for any location worldwide.
- **News Articles**: Explore news articles based on categories like technology, business, sports, and more.
- **Responsive Design**: Optimized for all devices, including desktops, tablets, and mobile phones.
- **Stunning Animations**: Includes advanced animations for a visually appealing experience.

## Setup
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Install Dependencies**:
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```
3. **Add API Keys**:
   - Open the `.env` file.
   - Replace `YOUR_OPENWEATHERMAP_API_KEY` and `YOUR_NEWSAPI_API_KEY` with your actual API keys.
4. **Run Locally**:
   Open `public/index.html` in your browser to view the application.

## Deployment
### Deploying on Netlify
1. **Upload the Project**:
   - Drag and drop the `public` folder into Netlify.
2. **Configure Redirects**:
   - Netlify automatically uses the `netlify.toml` file for clean URLs.
3. **Publish**:
   - Your site will be live and accessible.

## Technologies Used
- **HTML**: Structure and content.
- **CSS**: Styling and animations.
- **JavaScript**: Dynamic functionality.

## Credits
- **APIs**:
  - [OpenWeatherMap](https://openweathermap.org/)
  - [NewsAPI](https://newsapi.org/)
- **Icons**:
  - [Font Awesome](https://fontawesome.com/)
- **Hosting**:
  - [Netlify](https://www.netlify.com/)

## License
This project is licensed under the MIT License.
