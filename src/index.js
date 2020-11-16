const rusWeekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const engWeekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const rusText = ['Поиск', 'ощущается как', 'скорость ветра', 'км/ч', 'влажность'];
const engText = ['Search', 'Feels like', 'wind speed', 'kph', 'humidity'];
const selectLang = document.querySelector('.selectLang');
const selectMetr = document.querySelector('.selectMetr');
let lang = localStorage.getItem('lang');
let metr = localStorage.getItem('metr');

if (lang === 'ru') {
  selectLang.selectedIndex = 1;
} else if (lang === 'en') {
  selectLang.selectedIndex = 0;
}
if (metr === 'f') {
  selectMetr.selectedIndex = 1;
} else if (metr === 'c') {
  selectLang.selectedIndex = 0;
}
selectLang.addEventListener('change', () => {
  localStorage.setItem('lang', `${selectLang.value}`);
  lang = selectLang.value;
  if (selectLang.value === 'ru') {
    getApis(rusText, rusWeekDays);
  } else if (selectLang.value === 'en') {
    getApis(engText, engWeekDays);
  }
}, false);

selectMetr.addEventListener('change', () => {
  localStorage.setItem('metr', `${selectMetr.value}`);
  metr = selectMetr.value;
  if (selectLang.value === 'ru') {
    getApis(rusText, rusWeekDays);
  } else if (selectLang.value === 'en') {
    getApis(engText, engWeekDays);
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

async function getApis(text, WeekDays) {
  const urlLoc = 'https://ipinfo.io/json?token=eb5b90bb77d46a';
  const apiKey = 'dbdff77127fc4281abb81651200911';
  const locResponce = await fetch(urlLoc);
  const locData = await locResponce.json();
  const searhOptions = await locData.loc;
  const urlWeather = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searhOptions}&days=3&lang=${lang}`;
  const weatherResponce = await fetch(urlWeather);
  const weatherData = await weatherResponce.json();

  const isDay = weatherData.current.is_day;
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
  nextWeekDay.innerHTML = WeekDays[(isDay + 1)];
  nextDayIcon.src = `./icons/${weatherData.forecast.forecastday[0].day.condition.icon.slice(34)}`;

  secondWeekDay.innerHTML = WeekDays[(isDay + 2)];
  secondDayIcon.src = `./icons/${weatherData.forecast.forecastday[1].day.condition.icon.slice(34)}`;

  thirdWeekDay.innerHTML = WeekDays[(isDay + 3)];
  thirdDayIcon.src = `./icons/${weatherData.forecast.forecastday[2].day.condition.icon.slice(34)}`;
}
if (lang === 'ru') {
  getApis(rusText, rusWeekDays, 'ru');
} else {
  getApis(engText, engWeekDays, 'en');
}
