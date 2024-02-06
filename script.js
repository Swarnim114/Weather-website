const apikey = "094a99116cb5eeaa1ceb6f345298f200";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");
async function checkWeather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Remove all previous weather-related classes
        document.querySelector(".main-box").classList.remove("rain", "clouds", "clear" , "drizzle" , "mist");

        // Add the appropriate class based on the weather condition
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
        document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + data.name + "')";

        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"
    }

}
searchbtn.addEventListener("click", () => {
    checkWeather(searchbox.value);

})

searchbox.addEventListener("keypress", () => {
    if (event.key === "Enter")
        checkWeather(searchbox.value);

})