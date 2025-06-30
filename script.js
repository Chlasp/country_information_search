const newsApiKey = '***REMOVED***';
const weatherApiKey = '***REMOVED***';

async function search() {
    const country = document.getElementById('countryInput').value.trim();
    if (!country) return alert("Please enter a country.")

try {
    // find capital city of country
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const countryData = await response.json();

    const capital = countryData[0]?.capital?.[0];
    const countryCode = countryData[0]?.cca2;
    if(!capital || !countryCode) throw new Error("Capital City or country code not found.");
    
    // get news using country name (not country code)
   const newsResponse = await fetch(`https://gnews.io/api/v4/top-headlines?country=${country}&lang=en&token=${newsApiKey}`);
   const newsData = await newsResponse.json();
   displayNews(newsData);

   // get weather using capital city and country code
   const weatherResponse = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${capital},${countryCode}&appid=${weatherApiKey}&units=metric`);
   const weatherData = await weatherResponse.json();
   displayWeather(weatherData, capital);

} catch (error){
    console.error(error);
    alert("Something went wrong. Please check country name and try again.")
}

function displayNews(data) {
    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = '';
    
    if (data.articles && data.articles.length > 0) {
        const article = data.articles[0];
        const newsItem = document.createElement('div');
        newsItem.innerHTML = `
        <h2> Latest News</h2>
        <h2>${article.title}</h2>
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(newsItem);
    } else {
        newsContainer.innerHTML = '<p>No news found.</p>';
    }
}

function displayWeather(data, capital) {
    const weatherContainer = document.getElementById('weather');
    weatherContainer.innerHTML = '';

    if (data.main && data.weather && data.weather.length > 0) {
        
        const weather = data.weather[0];
        weatherContainer.innerHTML = `
            <h2>Weather in ${capital}</h2>
            <p>Temperature: ${weather.main.temp}°C</p>
            <p>Condition: ${weather.description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;
    } else {
        weatherContainer.innerHTML = `<p>Weather data not found for ${capital}.</p>`;
    }
}
}
