const date = new Date();
document.getElementById('timeandDate').innerHTML = `${date.toDateString()}, ${date.toLocaleTimeString()}`;
const temperatureCmp = document.getElementById("weatherTemperature");
const nameCmp = document.getElementById("name");
const weatherMaxTempCmp = document.getElementById("weatherMaxTemp");
const weatherCloudyCmp = document.getElementById("weatherCloudy");
const weatherWindCmp = document.getElementById("weatherWind");
const weatherSearchBar = document.getElementById("searchBar");
const searchBtnCmp = document.getElementById("searchBtn");
const weatherIconCmp = document.getElementById("weatherIcon");
const tempUnitCmp = document.getElementById("tempUnit");


searchBtnCmp.addEventListener("click", function() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + weatherSearchBar.value + '&units=metric&appid=08a09c29086a3f06cd37337b12b1711f')
        .then(response => response.json())
        .then(data => {
            let newPlaceName = document.createElement("span");
            newPlaceName.innerHTML = data.name;
            nameCmp.appendChild(newPlaceName);
            let newWindVal = document.createElement("span");
            newWindVal.classList.add("windMarginAdjustment");
            let newCloudValue = document.createElement("span");
            newCloudValue.classList.add("cloudMarginAdjustment");
            let newMaxTempValue = document.createElement("span");
            newMaxTempValue.classList.add("tempMarginAdjustment");
            newMaxTempValue.innerHTML = Math.round(data.main.temp_max);
            let maxTempUnit = document.createElement("span");
            maxTempUnit.innerHTML = "&#8451";
            newMaxTempValue.appendChild(maxTempUnit);
            weatherMaxTempCmp.appendChild(newMaxTempValue);
            newCloudValue.innerHTML = data.weather[0].description;
            weatherCloudyCmp.appendChild(newCloudValue);
            temperatureCmp.innerHTML = Math.round(data.main.temp);
            tempUnitCmp.innerHTML = "&#8451";
            newWindVal.innerHTML = Math.round(data.wind.speed);
            weatherWindCmp.appendChild(newWindVal);
            let openWeatherIcon = data.weather[0].icon;
            let weatherIconImg = document.createElement("img");
            weatherIconImg.classList.add("iconSize");
            switch (openWeatherIcon) {
                case "01d":
                    weatherIconImg.src = "assets/day.svg";
                    break;
                case "01n":
                    weatherIconImg.src = "assets/night.svg";
                    break;
                case "02d":
                    weatherIconImg.src = "assets/cloudy-night-1.svg";
                case "02n":
                    weatherIconImg.src = "assets/cloudy-night-1.svg";
                    break;
                case "03n":
                    weatherIconImg.src = "assets/cloudy-night-3.svg";
                    break;
                case "03d":
                    weatherIconImg.src = "assets/cloudy.svg";
                    break;
                case "09d":
                    weatherIconImg.src = "assets/rainy-1.svg";
                    break;
                case "04d":
                    weatherIconImg.src = "assets/cloudy-day-2.svg";
                    break;
                case "13d":
                    weatherIconImg.src = "assets/snowy-1.svg";
                    break;
                case "50n":
                    weatherIconImg.src = "assets/snowy-1.svg";
                    break;
                default:
                    weatherIconImg.src = "assets/day.svg";
            }
            document.getElementById("weatherIcon").appendChild(weatherIconImg);

        })
        .catch(error => alert("Wrong City Name"))
});
const daysList = document.getElementById("nextDaysWeather");
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
const nextDays = 4;

function createDays() {
    let today = new Date();
    let daysSorted = [];
    for (let i = 0; i < nextDays; i++) {
        let newDate = new Date(today.setDate(today.getDate() + 1));
        daysSorted.push(days[newDate.getDay()]);
    }
    for (let i = 0; i < daysSorted.length; i++) {
        let newLiElement = document.createElement("li");
        newLiElement.textContent = daysSorted[i];
        daysList.appendChild(newLiElement);
    }
    daysList.style.color = "white";
    daysList.style.listStyle = "none";
    daysList.style.padding = "15px";
};
createDays();

const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Munich&units=metric&appid=08a09c29086a3f06cd37337b12b1711f";
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        let tempArray = [];
        tempArray.push(Math.round(data.list[1].main.temp));
        tempArray.push(Math.round(data.list[2].main.temp));
        tempArray.push(Math.round(data.list[10].main.temp));
        tempArray.push(Math.round(data.list[18].main.temp));

        function displayTemperature() {
            let listItem = document.querySelectorAll("ul > li");
            for (let i = 0; i < tempArray.length && i < listItem.length; i++) {
                let newTempEle = document.createElement("span");
                newTempEle.classList.add("temperatureStyle")
                newTempEle.innerHTML = tempArray[i];
                listItem[i].appendChild(newTempEle);
            }
        }
        displayTemperature();
        let iconArray = [];
        iconArray.push(data.list[0].weather[0].icon);
        iconArray.push(data.list[2].weather[0].icon);
        iconArray.push(data.list[10].weather[0].icon);
        iconArray.push(data.list[18].weather[0].icon);

        function createIcon() {
            let iconSet = document.querySelectorAll("ul > li");
            for (let i = 0; i < iconArray.length && i < iconSet.length; i++) {
                let newIconEle = document.createElement("span");
                newIconEle.classList.add("iconStyle");
                let imageUrl = "http://openweathermap.org/img/wn/" + iconArray[i] + "@2x.png";
                newIconEle.innerHTML = "<img src=" + imageUrl + ">";
                iconSet[i].appendChild(newIconEle);
            }
        }
        createIcon();
    });
searchBtnCmp.addEventListener("click", function() {
    const cityUrl = "https://pixabay.com/api/?key=17019291-54fb257821b3ff9d5c88bcf61&q=" + weatherSearchBar.value + "&image_type=photo&pretty=true";
    console.log(cityUrl);
    fetch(cityUrl)
        .then(response => response.json())
        .then(data => {
            const backgroundImageUrl = data.hits[0].largeImageURL;
            console.log(backgroundImageUrl);
            document.getElementsByClassName("leftContainer")[0].style.backgroundImage = `url(${backgroundImageUrl})`;
        })
});

function resetValues() {

}