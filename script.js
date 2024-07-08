const apikey = "094a99116cb5eeaa1ceb6f345298f200";
const unsplashApiKey = "094a99116cb5eeaa1ceb6f345298f200";
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

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        // Fetch and set the background image for the city
        await setBackgroundImage(city);
    }
}

// async function setBackgroundImage(city) {
//     try {
//         const unsplashResponse = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashApiKey}`);
//         const unsplashData = await unsplashResponse.json();
//         if (unsplashData.results && unsplashData.results.length > 0) {
//             const imageUrl = unsplashData.results[0].urls.full;
//             document.body.style.backgroundImage = `url('${imageUrl}')`;
//         }
//     } catch (error) {
//         console.error("Error fetching background image:", error);
//     }
// }

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
