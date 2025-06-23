const newsApiKey = '2b3058e55907280386827f1096bcb278';
const weatherApiKey = '7f7dbcc23215b7dc58fd17ffda25ab84 ';

async function search() {
    const country = document.getElementById('countryInput').value.trim;
    if (!country) return alert("Please enter a country.")

try {
    // find capital city of country
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const Countrydata = await response.json();

    const capital = Countrydata[0]?.capital?.[0];
    if(!capital) throw new Error("Capital City not found.");
    
    // get news 
   const newsResponse = await fetch(`https://gnews.io/api/v4/top-headlines?country=${country}&token=${newsApiKey}`);
   const newsData = await newsResponse.json();
   displayNews(newsData);
   
} catch (error){
    console.error(error);
    alert("Something went wrong. Check county name and try again.")
}
}
