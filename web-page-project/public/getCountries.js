// Move get countries to its own file. Then export it - modules.export etc. 
/* async function getCountries() {
    let countries = await fetch("https://restcountries.com/v3.1/all?fields=name,latlng")
    .then((response) => response.json())
    .then((data) => {
        return data
    });
    return countries
  }
module.exports = getCountries;