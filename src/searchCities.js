import {debounce} from "./utils.js";

export default (function(){

    // string of city names
    let cities = [];

    // controller for last fetch call
    let controller;

    // function that is called after cities has been fetched
    let onUpdateCities = (cities) => {};

    function setOnUpdateCities(callback){
        onUpdateCities = callback;
    }

    async function fetchCities(prefix){
        controller?.abort();
        controller = new AbortController();
        try {
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(prefix)}&language=en&format=json`, {signal: controller.signal});
            const citiesData = await response.json();

            cities = [];

            citiesData.results.forEach(city => {
                const cityName = (city.admin1 !== undefined) ? `${city.name}, ${city.admin1}, ${city.country}` : `${city.name}, ${city.country}`;
                cities.push(cityName);
            });

            onUpdateCities(cities); 
        } catch (error) {
            if (error.name !== "AbortError") console.log(error);
        }
    }

    const debouncedFetchCities = debounce(fetchCities, 100);

    return {debouncedFetchCities, setOnUpdateCities};

})();