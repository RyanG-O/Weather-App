export default (function(){

    let cityStatus = "San Diego";
    let onClickCity = () => {};

    function renderMainInfo(forecast){
        const mainInfo = document.getElementById("main-info");
        mainInfo.replaceChildren();

        const mainInfoText = document.createElement("div");
        mainInfoText.id = "main-info-text";
        const div = document.createElement("div");
        const mainCityText = document.createElement("h1");
        mainCityText.id = "main-city-text";
        mainCityText.textContent = forecast.address.split(",")[0];
        const mainRainText = document.createElement("p");
        mainRainText.id = "main-rain-text";
        mainRainText.textContent = `Chance of rain: ${forecast.days[0].precipprob}%`;
        div.appendChild(mainCityText);
        div.appendChild(mainRainText);
        const mainTempText = document.createElement("h1");
        mainTempText.id = "main-temp-text";
        mainTempText.textContent = `${forecast.days[0].temp}\u00B0C`;
        mainInfoText.appendChild(div);
        mainInfoText.appendChild(mainTempText);
        mainInfo.appendChild(mainInfoText);

        const icon = document.createElement("img");
        import(`../icons/${forecast.days[0].icon}.svg`).then(module => {
            icon.src = module.default;
        })
        mainInfo.appendChild(icon);
    }

    function renderDayForecast(forecast){
        const dayForecastGrid = document.getElementById("day-forecast-grid");
        dayForecastGrid.replaceChildren();

        for (let i = 7; i <= 22; i += 3){
            const hourlyForecast = document.createElement("div");
            hourlyForecast.classList.add("hourly-forecast");
            const time = document.createElement("p");
            const suffix = (i < 12) ? "AM" : "PM";
            let timeText = `${((i-1) % 12 == 0) ? 12 : (i-1) % 12}:00`;
            time.textContent = `${timeText}${suffix}`;
            const icon = document.createElement("img");
            import(`../icons/${forecast.days[0].hours[i].icon}.svg`).then(module => {
                icon.src = module.default;
            });
            const temp = document.createElement("p");
            temp.textContent = `${forecast.days[0].hours[i].temp}\u00B0`;
            hourlyForecast.append(time, icon, temp);
            dayForecastGrid.append(hourlyForecast);
        }
    }

    function renderWeekForecast(forecast){
        const weekForecastGrid = document.getElementById("week-forecast-grid");
        weekForecastGrid.replaceChildren();
        for (let i = 0; i < 7; i++){
            const weekForecastDay = document.createElement("p");
            weekForecastDay.textContent = (new Date(forecast.days[i].datetime)).toLocaleString("en-US", {weekday: "long", timeZone: "UTC"});
            weekForecastDay.classList.add("week-forecast-text");
            const icon = document.createElement("img");
            import(`../icons/${forecast.days[i].icon}.svg`).then(module => {
                icon.src = module.default;
            });
            const temp = document.createElement("p");
            temp.classList.add("week-forecast-text");
            temp.textContent = `${forecast.days[i].temp}\u00B0`;
            weekForecastGrid.append(weekForecastDay, icon, temp);
        }
    }

    function renderDayStats(forecast){
        const feelsLike = document.getElementById("feels-like");
        feelsLike.textContent = `${forecast.days[0].feelslike}\u00B0`;
        const visibility = document.getElementById("visibility");
        visibility.textContent = `${forecast.days[0].visibility} km`;
        const windSpeed = document.getElementById("wind-speed");
        windSpeed.textContent = `${forecast.days[0].windspeed} km/h`;
        const pressure = document.getElementById("pressure");
        pressure.textContent = `${forecast.days[0].pressure} hPa`;
        const humidity = document.getElementById("humidity");
        humidity.textContent = `${forecast.days[0].humidity}%`;
        const uvIndex = document.getElementById("uv-index");
        uvIndex.textContent = `${forecast.days[0].uvindex}`;
    }

    function renderAll(forecast){
        renderMainInfo(forecast);
        renderDayForecast(forecast);
        renderWeekForecast(forecast);
        renderDayStats(forecast);
    }

    function renderCities(cities){
        const searchAutocomplete = document.getElementById('search-autocomplete');
        document.querySelectorAll(".city-option").forEach(option => option.remove());

        cities.forEach(city => {
            const cityOption = document.createElement("div");
            cityOption.classList.add("city-option");
            cityOption.textContent = city;
            cityOption.addEventListener("click", (event) => {
                cityStatus = event.target.textContent;
                document.getElementById("search-bar").value = "";
                searchAutocomplete.style.display = "none";
                onClickCity(cityStatus);
            });
            searchAutocomplete.appendChild(cityOption);
        });

        searchAutocomplete.style.display = "";
    }

    function getCityStatus(){
        return cityStatus;
    }

    function setOnClickCity(callback){
        onClickCity = callback;
    }

    return {renderAll, renderCities, getCityStatus, setOnClickCity};

})();