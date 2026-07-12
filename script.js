document.addEventListener('DOMContentLoaded',()=>{
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityNameDisplay = document.getElementById('city-name');
    const tempratureDisplay = document.getElementById('temperature');
    const discriptionDisplay = document.getElementById('description');
    const errorMsg = document.getElementById('error-message');

    const API_KEY="448991a260baff1838a04f281eee0c8e";
    
    getWeatherBtn.addEventListener("click",async ()=>{
        const city = cityInput.value.trim();
        if(!city) return;

        //API may throw error 
        //API always in a different continent
        try {
            const weatherData = await fetchweatherData(city);
            displayWeatherData(weatherData);
            
        } catch (error) {
            displayError();
        }
    })

    async function fetchweatherData(city){
        //fetching data from an API

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        const responce = await fetch(url);
        if(!responce.ok){
            throw new Error("city not found")
        }
        const data = await responce.json();//converting responce  to readable JS object 
        return data;
    }

    function displayWeatherData(data){
        //display
        console.log(data);
        //Here data is an object in which we have to extract the required information
        //Information such as name , main and weather where 
        // name is a string an contain the name of the city
        //main is an object which contain the temprature and other information
        //weather is an array of objects which contain the description of the weather
        const {name,main,weather} = data;
        cityNameDisplay.textContent = name;
        tempratureDisplay.textContent = `${(main.temp - 273.15).toFixed(2)} °C`;
        discriptionDisplay.textContent = `weather : ${weather[0].description}`;

        //display unclock 
        weatherInfo.classList.remove('hidden');
        errorMsg.classList.add('hidden');

    }

    function displayError(){
        weatherInfo.classList.add('hidden');
        errorMsg.classList.remove('hidden');
    }









})