<a id="readme-top"></a>
[![project_license][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<h3 align="center">Country Info Dashboard</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
The Country Info Dashboard is a web application that provides comprehensive information about any country. It integrates multiple APIs to display details such as population, region, subregion, currency, languages, area, local weather, local time, latest news, the country’s flag, and an interactive map of its capital city.
## Features
-  Search for any country to retrieve current information.
-  Display population, region, subregion, currency, languages, and area
-  Show current weather (°C/°F), condition, and humidity in the capital city
-  Display local time of the capital city
-  Fetch latest news headlines about the country
-  Show the country flag and an interactive Google map of the capital city
<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

- HTML / CSS / JavaScript – Frontend technologies
- REST Countries API – Country information
- OpenWeatherMap API – Weather data
- GNews API – Latest news headlines
- TimeAPI.io – Local time
- Google Maps Platform – Interactive map

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js installed <br />
- API keys for GNews, OpenWeatherMap, and Google Maps<br />

### Installation <br />
1. Clone the repo
    ```sh
    git clone https://github.com/yourusername/Country-Info-Dashboard.git
    cd Country-Info-Dashboard
    ```
2. Install dependencies (if using Vite): <br />
   ```sh
   npm install
    ```
3. Create a .env file in the root directory with your API keys:
   ```ini
   VITE_GNEWS_API_KEY=your_gnews_api_key
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key
   VITE_GOOGLEMAPSPLATFORM_API_KEY=your_google_maps_api_key
    ```
4. Start the development server:
   ```sh
   npm run dev
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
- Enter a country name in the search bar
- Click Search to fetch data
- View country info, weather, local time, news, flag, and map
- Useful for learning API integration, data visualization, and frontend design

<!-- LICENSE -->
## License
Distributed under the MIT license. See `license` for more information.

<!-- CONTACT -->
## Contact

David Balogun: davebalogun2015@gmail.com

Project Link: [https://github.com/Chlasp/Customer-product-review-analyzer](https://github.com/Chlasp/country_information_search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[license-shield]: https://img.shields.io/github/license/github_username/country_information_search.svg?style=for-the-badge
[license-url]: https://github.com/Chlasp/country_information_search/blob/main/license
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: www.linkedin.com/in/david-balogun-428a0b329
[product-screenshot]: images/screenshot.png
