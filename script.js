const newsApiKey = import.meta.env.VITE_GNEWS_API_KEY;
const weatherApiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
const mapsApiKey = import.meta.env.VITE_GOOGLEMAPSPLATFORM_API_KEY;

window.search = async function(){
    const country = document.getElementById('countryInput').value.trim();
    if (!country) return alert("Please enter a country.")

    try {
    // find capital city of country
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const countryData = await response.json();

    displayCountryInfo(countryData);

    const capital = countryData[0]?.capital?.[0];
    let capitalQuery = capital;
    if (capital.toLowerCase() === 'washington dc'){
        capitalQuery = 'Washington, D.C.';
    }
    const countryCode = countryData[0]?.cca2;
    const lat = countryData[0]?.capitalInfo?.latlng?.[0]; 
    const lon = countryData[0]?.capitalInfo?.latlng?.[1];

    if (lat && lon){
        loadGoogleMaps(mapsApiKey).then(() => {
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 6,
                center: { lat: lat, lng: lon }
            });

            new google.maps.Marker({
                position: { lat: lat, lng: lon },
                map: map,
            });
        }).catch(err => {
            console.error("Google Maps could not be loaded: ", err)
        });
    }
    
    if(!capital || !countryCode || lat === undefined || lon === undefined) throw new Error("Capital City, country code, or coordinates not found.");

    const flagUrl = countryData[0]?.flags?.svg;
    const flagContainer = document.getElementById('flagContainer');

    if (flagUrl) {
        flagContainer.innerHTML = `<img src="${flagUrl}" alt="Flag of ${country}" style="width: 100px;">`;
    } else {
        flagContainer.innerHTML = `<p>Flag not available for ${country}</p>`;
    }
        
    
    // get news using country code
    const newsResponse = await fetch(`https://gnews.io/api/v4/search?q=${encodeURIComponent(country)}&lang=en&max=3&token=${newsApiKey}`);
    const newsData = await newsResponse.json();
    displayNews(newsData);

   // get weather using capital city and country code
    const encodedCapital = encodeURIComponent(capitalQuery);
    const weatherResponse = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${encodedCapital},${countryCode}&appid=${weatherApiKey}&units=metric`);
    const weatherData = await weatherResponse.json();
    displayWeather(weatherData, capital);

    // to fetch local time
    const timeResponse = await fetch(`https://timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lon}`)
    const timeData = await timeResponse.json();
    displayTime(timeData, capital);

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

// Function to display time data for a given capital city
function displayTime(data, capital) {
    const timeContainer = document.getElementById('time');
    if (!data || !data.dateTime) {
        timeContainer.innerHTML = `<p>Time data not found for ${capital}.</p>`;
        return;
    }

    const formattedTime = new Date(data.dateTime).toLocaleString();
    timeContainer.innerHTML = `<h2>Time in ${capital}</h2><p>${formattedTime}</p>`;
}

function displayCountryInfo(countryData) {
    const countryInfoContainer = document.getElementById('countryInfo');
    const country = countryData[0];

    const population = country.population?.toLocaleString() || 'N/A';
    const region = country.region || 'N/A';
    const subregion = country.subregion || 'N/A';
    const area = country.area ? `${country.area.toLocaleString()} km²` : 'N/A';

    // to get currency names
    const currencies = country.currencies ? 
        Object.values(country.currencies).map(currency => currency.name).join(', ') 
        : 'N/A';

    // to get language names
    const languages = country.languages ? 
        Object.values(country.languages).join(', ') 
        : 'N/A';

    countryInfoContainer.innerHTML = `
        <h2>Country Info</h2>
        <p><strong>Population:<strong> ${population}</p>
        <p><strong>Region:<strong> ${region}</p>
        <p><strong>Subregion:<strong> ${subregion}</p>
        <p><strong>Currency:<strong> ${currencies}</p>
        <p><strong>Languages:<strong> ${languages}</p>
        <p><strong>Area:<strong> ${area}</p>
        `;
}

function loadGoogleMaps(mapsApiKey){
    return new Promise((resolve, reject) => {
        if(window.google && window.google.maps){
            resolve(window.google.maps);
            return;
        } 

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onerror = () => reject('Google Maps script failed to load');

        // to define initMap function expected by Google
        window.initMap = () => resolve(window.google.maps);

        document.head.appendChild(script);
    });
}
