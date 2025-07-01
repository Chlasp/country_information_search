const newsApiKey = import.meta.env.VITE_GNEWS_API_KEY;
const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

console.log("GNews Key:", import.meta.env.VITE_GNEWS_API_KEY);
console.log("Weather Key:", import.meta.env.VITE_OPENWEATHER_API_KEY);


window.search = async function(){
    const country = document.getElementById('countryInput').value.trim();
    if (!country) return alert("Please enter a country.")

    try {
    // find capital city of country
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const countryData = await response.json();

    const capital = countryData[0]?.capital?.[0];
    let capitalQuery = capital;
    if (capital.toLowerCase() === 'washington dc'){
        capitalQuery = 'Washington, D.C.';
    }
    const countryCode = countryData[0]?.cca2;
    if(!capital || !countryCode) throw new Error("Capital City or country code not found.");
    
    // get news using country code
    const newsResponse = await fetch(`https://gnews.io/api/v4/search?q=${encodeURIComponent(country)}&lang=en&max=3&token=${newsApiKey}`);
    const newsData = await newsResponse.json();
    displayNews(newsData);

   // get weather using capital city and country code
    const encodedCapital = encodeURIComponent(capitalQuery);
    const weatherResponse = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${encodedCapital},${countryCode}&appid=${weatherApiKey}&units=metric`);
    const weatherData = await weatherResponse.json();
    displayWeather(weatherData, capital);

} catch (error){
    console.error(error);
    alert("Something went wrong. Please check country name and try again.")
}
}

// Function to display news
function displayNews(data) {
    // Get the news container element
    const newsContainer = document.getElementById('news');
    // Set the innerHTML of the news container to a heading
    newsContainer.innerHTML = '<h2>Latest News</h2>';
    
    // Check if the data contains articles and if the length of the articles array is greater than 0
    if (data.articles && data.articles.length > 0) {
        // Loop through each article in the articles array
        data.articles.forEach(article => {
            // Create a new div element
            const newsItem = document.createElement('div');
            // Set the innerHTML of the div to the article's title, description, and a link to read more
            newsItem.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description || ''}</p>
                <small><i>${article.source.name} - ${new Date(article.published_at).toLocaleString()}</i></small><br>
                <a href="${article.url}" target="_blank">Read more</a>
                <hr>
            `;
            // Append the div to the news container
        newsContainer.appendChild(newsItem);
        });
    } else {
        // If no articles are found, set the innerHTML of the news container to a message
        newsContainer.innerHTML = '<p>No news found.</p>';
    }
}

// Function to display weather data for a given capital city
function displayWeather(data, capital) {
    // Get the weather container element from the DOM
    const weatherContainer = document.getElementById('weather');
    // Clear the weather container
    weatherContainer.innerHTML = '';

    // Check if the data contains weather information
    if (data.main && data.weather && data.weather.length > 0) {
        
        // Get the weather data
        const weather = data.weather[0];
        // Convert the temperature from Celsius to Fahrenheit
        const tempC = data.main.temp;
        const tempF = ((tempC * 9/5) + 32).toFixed(1);

        // Display the weather data in the weather container
        weatherContainer.innerHTML = `
            <h2>Weather in ${capital}</h2>
            <p>Temperature: ${tempC}°C / ${tempF}°F</p>
            <p>Condition: ${weather.description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;
    } else {
        // Display an error message if the weather data is not found
        weatherContainer.innerHTML = `<p>Weather data not found for ${capital}.</p>`;
    }
}
