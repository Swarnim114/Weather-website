const apikey = "094a99116cb5eeaa1ceb6f345298f200";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        document.querySelector(".main-box").classList.remove("rain", "clouds", "clear", "drizzle", "mist");

        if (data.weather[0].main === "Clouds") {
            weathericon.src = "images/clouds.png";
            document.querySelector(".main-box").classList.add("clouds");
        } else if (data.weather[0].main === "Clear") {
            weathericon.src = "images/clear.png";
            document.querySelector(".main-box").classList.add("clear");
        } else if (data.weather[0].main === "Rain") {
            weathericon.src = "images/rain.png";
            document.querySelector(".main-box").classList.add("rain");
        } else if (data.weather[0].main === "Drizzle") {
            weathericon.src = "images/drizzle.png";
            document.querySelector(".main-box").classList.add("drizzle");
        } else if (data.weather[0].main === "Mist") {
            weathericon.src = "images/mist.png";
            document.querySelector(".main-box").classList.add("mist");
        }

        // Using a specific image URL for Paris as an example
        document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1541976076758-666565eeaf0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')`;
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchbtn.addEventListener("click", () => {
    const city = searchbox.value.trim();
    if (city) {
        checkWeather(city);
    }
});

searchbox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = searchbox.value.trim();
        if (city) {
            checkWeather(city);
        }
    }
});
