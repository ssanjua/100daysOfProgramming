import { useState, useEffect } from 'react'
import './App.css'
import { TbRuler2 } from 'react-icons/tb';

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(TbRuler2)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const fetchWeather = async () => {
        setLoading(true);
        try {
          const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          setWeatherData(data);
        } catch (err) {
          setError("Failed to fetch weather data.");
        } finally {
          setLoading(false);
        }
      };
      fetchWeather();
    }
  }, [latitude, longitude]);

  const toggleTemperature = () => {
    setIsCelsius(!isCelsius)
  }

  const convertTemperature = (tempCelsius) => {
    return isCelsius ? tempCelsius : (tempCelsius * 9 / 5) + 32
  }

  return (
    <>
      {error ? (
        <p>Error: {error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div>
          <div>
            <p>Location: {weatherData.name}</p>
            <p>Temperature: {convertTemperature(weatherData.main.temp).toFixed(2)} °{isCelsius ? 'C' : 'F'}</p>
            <p>Condition: {weatherData.weather[0].description}</p>
            <img src={weatherData.weather[0].icon} alt="Weather Icon" />
          </div>
          <div>
            <button onClick={toggleTemperature}>
              Toggle to {isCelsius ? 'Fahrenheit' : 'Celsius'}
            </button>
          </div>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </>
  );
}

export default App;
