import React , {useState} from "react";
import axios from "axios";

function App() {
  const [data , setData] = useState({})
  const [location , setLocation] = useState("")
  const [loading , setLoading] = useState(false)
  const [error , setError] = useState(null)
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=08450c4aa0f3f43a3aae4ab18ea25ebc`

   const searchLocation = async (e) => {
    if (e.key === "Enter") {
      if (!location) {
        setError("Location cannot be empty");
        return;
      }
      
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError("Error fetching data. Please try again.");
        setData(null);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="app">
      <div className="search">
        <input type='text' value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter location" onKeyPress={searchLocation}></input>
      </div>
      
     {data &&  <div className="container">
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data?.main?.temp && <h1>{data?.main?.temp}°C</h1>}
          </div>
          <div className="description">
            {/* <p>{data?.weather[0]?.description}</p> */}
          </div>
        </div>
      <div className="bottom">
          <div className="feels">
          {data?.main?.feels_like &&  <p className="bold">{data?.main?.feels_like}°C</p>}
            <p >Feels like</p>
          </div>
           <div className="humidity">
            {data?.main?.humidity && <p className="bold">{data?.main?.humidity}%</p>}
            <p >Humidity</p>
          </div>
        <div className="wind">
        {data?.wind?.speed &&   <p className="bold">{data?.wind?.speed}MPH</p> }
            <p >Wind Speed</p>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default App;
