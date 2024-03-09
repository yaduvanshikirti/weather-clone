document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const fetchButton = document.getElementById('fetch-button');
    const weatherInfo = document.getElementById('weather-info');

    fetchButton.addEventListener('click', function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const weatherDescription = data.weather[0].description;
                    const temperature = data.main.temp;
                    const cityName = data.name;

                    const weatherContent = `<p>Current weather in ${cityName}: ${weatherDescription}, ${temperature}°C</p>`;
                    weatherInfo.innerHTML = weatherContent;
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    weatherInfo.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
                });
        }, function (error) {
            console.error('Error getting user location:', error);
            weatherInfo.innerHTML = '<p>Failed to get location. Please enable location services and try again.</p>';
        });
    });
});
