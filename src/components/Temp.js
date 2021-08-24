import React, { useState, useEffect } from "react";
import "../style.css";
import Weather from "./Weather";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Mumbai");
  const [tempInfo, setTempInfo] = useState({});

  const inputValue = (event) => {
    setSearchValue(event.target.value);
  };

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=974fe01f79f92006a5e58a1a57c445b9`;

      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const newWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(newWeatherInfo);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            id="search"
            className="searchTerm"
            autoFocus
            value={searchValue}
            onChange={inputValue}
          />
          <button
            type="button"
            className="searchButton"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      <Weather tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
