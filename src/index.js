import CSS from './main.css';

async function getLocation() {
  const urlLoc = 'https://ipinfo.io/json?token=eb5b90bb77d46a';
  const locResponce = await fetch(urlLoc);
  const locData = await locResponce.json();
  const location = await locData.loc;
  localStorage.setItem('city', location);
  return location;
}

const rusWeekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const engWeekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const rusText = ['Поиск', 'Ощущается как', 'Скорость ветра', 'км/ч', 'Влажность', 'Широта', 'Долгота'];
const engText = ['Search', 'Feels like', 'Wind speed', 'kph', 'Humidity', 'Latitude', 'Longitude'];
const selectLang = document.querySelector('.selectLang');
const selectMetr = document.querySelector('.selectMetr');
const searchInp = document.querySelector('.controlsSearchInp');
const searchBtn = document.querySelector('.controlsSearchBtn');
let lang = localStorage.getItem('lang');
let metr = localStorage.getItem('metr');
let cityRequest = localStorage.getItem('city');

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

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  cityRequest = searchInp.value;
  if (selectLang.value === 'ru') {
    getApis(cityRequest, rusText, rusWeekDays);
    getMap(getCoord(cityRequest), lang);
    searchBtn.blur();
  } else if (selectLang.value === 'en') {
    getApis(cityRequest, engText, engWeekDays);
    getMap(getCoord(cityRequest), lang);
    searchBtn.blur();
  }
  searchInp.value = '';
});

selectLang.addEventListener('change', () => {
  localStorage.setItem('lang', `${selectLang.value}`);
  lang = selectLang.value;
  if (selectLang.value === 'ru') {
    getApis(cityRequest, rusText, rusWeekDays);
    getMap(getCoord(cityRequest), lang);
    selectLang.blur();
  } else if (selectLang.value === 'en') {
    getApis(cityRequest, engText, engWeekDays);
    getMap(getCoord(cityRequest), lang);
    selectLang.blur();
  }
}, false);

selectMetr.addEventListener('change', () => {
  localStorage.setItem('metr', `${selectMetr.value}`);
  metr = selectMetr.value;
  if (selectLang.value === 'ru') {
    getApis(cityRequest, rusText, rusWeekDays);
    selectMetr.blur();
  } else if (selectLang.value === 'en') {
    getApis(cityRequest, engText, engWeekDays);
    selectMetr.blur();
  }
});

function getDate(langUse) {
  const date = new Date();
  const options = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  return date.toLocaleString(langUse, options, lang);
}

async function getAndChangeFon() {
  const urlFon = 'https://source.unsplash.com/featured/?grey,black';
  const fonResponce = await fetch(urlFon);
  const fonData = fonResponce.url;
  const bodyFon = document.querySelector('body');
  bodyFon.style.backgroundImage = `url(${fonData})`;
}
getAndChangeFon();

const controlsBackgroundBtn = document.querySelector('.controlsBackgroundBtn');
controlsBackgroundBtn.addEventListener('click', () => {
  getAndChangeFon();
  controlsBackgroundBtn.blur();
});

async function getApis(searchOptions, text, WeekDays) {
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
  setInterval(()=> {
    dateNow.innerHTML = `${getDate(lang)}`;
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
async function checkLang(city) {
  if (lang === 'ru') {
    getApis(await city, rusText, rusWeekDays, 'ru');
  } else {
    getApis(await city, engText, engWeekDays, 'en');
  }
}
checkLang(getLocation());

async function getCoord(searchOptions) {
  const keyGeo = 'c6b6da0f80f24b299e08ee1075f81aa5';
  const urlGeo = `https://api.opencagedata.com/geocode/v1/json?q=${searchOptions}&key=${keyGeo}&pretty=1&limit=1`;
  const geoResponce = await fetch(urlGeo);
  const geoData = await geoResponce.json();
  let lat = geoData.results[0].geometry.lat;
  let lng = geoData.results[0].geometry.lng;
  const center = [+lng, +lat];
  return center;
}
async function getMap(coord, language) {
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2FkdmxhZCIsImEiOiJja2hhYTFxdjIxY2FvMndvNW4zdmo3cXR1In0.lqCv6pdC6P-RQ_JN6Ssf0w';
  const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/sadvlad/ckhn1yfwf0g0119qj4boks8hg', // style URL
    center: await coord, // starting position [lng, lat]
    zoom: 7 // starting zoom
  });
  const marker = new mapboxgl.Marker()
    .setLngLat(await coord)
    .addTo(map);

  map.on('style.load', () => {
    const waiting = () => {
      if (!map.isStyleLoaded()) {
        setTimeout(waiting, 200);
      } else {
        const label = [
          'country-label',
          'state-label',
          'settlement-major-label',
          'settlement-minor-label',
          'settlement-subdivision-label'
        ];
        for (let i = 0; i < label.length; i++) {
          map.setLayoutProperty(label[i], 'text-field', [
            'get',
            `name_${language}`]);
        }
      }
    };
    waiting();
  });
  return map;
}
getMap(getCoord(cityRequest), lang);
