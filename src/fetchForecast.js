export default (function(){
    let controller;
    let forecast;

    function getForecast(){
        return forecast;
    }

    async function fetchForecast(location, metric=true){
        const unitGroup = (metric) ? "metric" : "us";
        controller?.abort();
        controller = new AbortController();
        try {
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=${unitGroup}&iconSet=icons1&contentType=json&elements=add:precipprob&key=WN2AG56Q2JXSF7X3YPUFAJNQD`, {signal: controller.signal});
            const forecastData = await response.json();

            forecast = forecastData;
        } catch (error) {
            if (error.name !== "AbortError") console.log(error);
        }
    }

    return {fetchForecast, getForecast}
})();