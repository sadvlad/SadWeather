import { getCoord, getTimeZone } from './coordAndTimeZone.js';
import {
  rusWeekDays, engWeekDays, rusText, engText
} from './text.js';
import { metr, lang, cityRequest } from './listeners.js';

export const selectLang = document.querySelector('.selectLang');
export const selectMetr = document.querySelector('.selectMetr');
export const searchInp = document.querySelector('.controlsSearchInp');
export const searchBtn = document.querySelector('.controlsSearchBtn');

export async function checkLang(city) {
  if (lang === 'ru') {
    initWeather(await city, rusText, rusWeekDays, 'ru');
  } else {
    initWeather(await city, engText, engWeekDays, 'en');
  }
}

export function checkSelectors() {
  if (lang === 'ru') {
    selectLang.selectedIndex = 1;
  } else if (lang === 'en') {
    selectLang.selectedIndex = 0;
  }
  if (metr === 'f') {
    selectMetr.selectedIndex = 1;
  } else if (metr === 'c') {
    selectMetr.selectedIndex = 0;
  }
}

function getDate(langUse, timeZoneCurrent) {
  const date = new Date();
  const options = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timeZone: `${timeZoneCurrent}`,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  return date.toLocaleString(langUse, options);
}

export async function initWeather(searchOptions, text, WeekDays) {
  const apiKey = 'dbdff77127fc4281abb81651200911';
  const urlWeather = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchOptions}&days=3&lang=${lang}`;

  const weatherResponce = await fetch(urlWeather);
  const weatherData = await weatherResponce.json();

  let isDay = (new Date()).getDay();

  const cityName = document.querySelector('.cityName');
  const countryName = document.querySelector('.countryName');
  const dateNow = document.querySelector('.dateNow');
  const tempNow = document.querySelector('.tempNow');
  const weatherNowIcon = document.querySelector('.weatherNowIcon');
  const condition = document.querySelector('.condition');
  const feelsLike = document.querySelector('.feelsLike');
  const windSpeed = document.querySelector('.wingSpeed');
  const humidity = document.querySelector('.humidity');
  const controlsSearchBtn = document.querySelector('.controlsSearchBtn');
  const nextWeekDay = document.querySelector('.nextWeekDay');
  const nextDayIcon = document.querySelector('.nextDayIcon');
  const nextDayTemp = document.querySelector('.nextDayTemp');
  const secondWeekDay = document.querySelector('.secondWeekDay');
  const secondDayIcon = document.querySelector('.secondDayIcon');
  const secondDayTemp = document.querySelector('.secondDayTemp');
  const thirdWeekDay = document.querySelector('.thirdWeekDay');
  const thirdDayIcon = document.querySelector('.thirdDayIcon');
  const thirdDayTemp = document.querySelector('.thirdDayTemp');

  controlsSearchBtn.value = `${text[0]}`;

  cityName.innerHTML = `${weatherData.location.name}`;
  countryName.innerHTML = `${weatherData.location.country}`;

  let timeZoneStr = await getTimeZone(searchOptions);

  searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    clearInterval(showDate);
  });
  let showDate = setInterval(() => {
    dateNow.innerHTML = `${getDate(lang, timeZoneStr)}`;
  }, 1000);

  weatherNowIcon.src = `./icons/${weatherData.current.condition.icon.slice(34)}`;
  condition.innerHTML = `${weatherData.current.condition.text}`;

  windSpeed.innerHTML = `${text[2]}: ${weatherData.current.wind_kph} ${text[3]}`;
  humidity.innerHTML = `${text[4]}: ${weatherData.current.humidity} %`;

  if (metr === 'c') {
    tempNow.innerHTML = `${weatherData.current.temp_c}&deg C`;
    feelsLike.innerHTML = `${text[1]}: ${weatherData.current.feelslike_c}&deg C`;
    nextDayTemp.innerHTML = `${weatherData.forecast.forecastday[0].day.avgtemp_c}&deg C`;
    secondDayTemp.innerHTML = `${weatherData.forecast.forecastday[1].day.avgtemp_c}&deg C`;
    thirdDayTemp.innerHTML = `${weatherData.forecast.forecastday[2].day.avgtemp_c}&deg C`;
  } else {
    tempNow.innerHTML = `${weatherData.current.temp_f}&deg F`;
    feelsLike.innerHTML = `${text[1]}: ${weatherData.current.feelslike_f}&deg F`;
    nextDayTemp.innerHTML = `${weatherData.forecast.forecastday[0].day.avgtemp_f}&deg F`;
    secondDayTemp.innerHTML = `${weatherData.forecast.forecastday[1].day.avgtemp_f}&deg F`;
    thirdDayTemp.innerHTML = `${weatherData.forecast.forecastday[2].day.avgtemp_f}&deg F`;
  }
  nextWeekDay.innerHTML = WeekDays[(isDay)];
  nextDayIcon.src = `./icons/${weatherData.forecast.forecastday[0].day.condition.icon.slice(34)}`;

  if (isDay + 1 > 6) {
    isDay -= 7;
    secondWeekDay.innerHTML = WeekDays[(isDay + 1)];
    secondDayIcon.src = `./icons/${weatherData.forecast.forecastday[1].day.condition.icon.slice(34)}`;
  } else {
    secondWeekDay.innerHTML = WeekDays[(isDay + 1)];
    secondDayIcon.src = `./icons/${weatherData.forecast.forecastday[1].day.condition.icon.slice(34)}`;
  }
  if (isDay + 2 > 6) {
    isDay -= 7;
    thirdWeekDay.innerHTML = WeekDays[(isDay + 2)];
    thirdDayIcon.src = `./icons/${weatherData.forecast.forecastday[2].day.condition.icon.slice(34)}`;
  } else {
    thirdWeekDay.innerHTML = WeekDays[(isDay + 2)];
    thirdDayIcon.src = `./icons/${weatherData.forecast.forecastday[2].day.condition.icon.slice(34)}`;
  }

  const latCoord = document.querySelector('.lat');
  const lngCoord = document.querySelector('.lng');
  const getCoordinates = await getCoord(cityRequest);
  const latitude = getCoordinates[0];
  const longitude = getCoordinates[1];
  latCoord.innerHTML = `${text[5]}: ${latitude.toFixed(2)}&deg`;
  lngCoord.innerHTML = `${text[6]}: ${longitude.toFixed(2)}&deg`;
  searchBtn.blur();
}
