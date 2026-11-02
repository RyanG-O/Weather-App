import "./styles.css";
import searchCities from "./searchCities.js";
import fetchForecast from "./fetchForecast.js";
import display from "./display.js";

const app = (function(){

    document.getElementById("search-autocomplete").style.display = "none";

    function addListeners(){

        // search bar
        searchCities.setOnUpdateCities(display.renderCities);

        const searchBar = document.getElementById("search-bar");
        searchBar.addEventListener("keyup", () => {
            if (searchBar.value.length === 0) document.getElementById("search-autocomplete").style.display = "none";
            searchCities.debouncedFetchCities(searchBar.value);
        });

        // search options
        display.setOnClickCity(fetchAndRenderForecast);
    }

    function fetchAndRenderForecast(location){
        fetchForecast.fetchForecast(location).then(() => {
            const forecast = fetchForecast.getForecast();
            console.log(forecast);
            display.renderAll(forecast);
        });
    }

    return {fetchAndRenderForecast, addListeners};
})();

app.addListeners();
app.fetchAndRenderForecast(display.getCityStatus());