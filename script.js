document.getElementById('search-btn').addEventListener('click', function() {
    const location = document.getElementById('location-input').value;
    if (location) {
        getWeatherData(location);
    }
});

function getWeatherData(location) {
    const apiKey = '50ebffe83fdd6667fce450362315f9ef'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeatherData(data);
            } else {
                alert('Location not found');
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    document.getElementById('location-name').textContent = data.name;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

// Fetch weather data based on user's location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = '50ebffe83fdd6667fce450362315f9ef'; // Replace with your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => displayWeatherData(data))
            .catch(error => console.error('Error fetching weather data:', error));
    });
}
