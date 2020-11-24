import {
  selectLang, searchBtn, searchInp, selectMetr
} from './initWeather.js';
import { getCoord } from './coordAndTimeZone.js';
import {
  rusWeekDays, engWeekDays, rusText, engText
} from './text.js';
import { getMap } from './map.js';
import { initWeather } from './initWeather.js';
import { getAndChangeFon } from './background.js';

export let lang = localStorage.getItem('lang');
export let metr = localStorage.getItem('metr');
export let cityRequest = localStorage.getItem('city');

export function addListeners() {
  searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (searchInp.value.length > 2) {
      cityRequest = searchInp.value;
      if (selectLang.value === 'ru') {
        initWeather(cityRequest, rusText, rusWeekDays);
        getMap(getCoord(cityRequest), lang);
        searchBtn.blur();
      } else if (selectLang.value === 'en') {
        initWeather(cityRequest, engText, engWeekDays);
        getMap(getCoord(cityRequest), lang);
        searchBtn.blur();
      }
      searchInp.value = '';
    } else {
      searchBtn.blur();
      if (selectLang.value === 'ru') {
        searchInp.value = rusText[7];
        setTimeout(() => {
          searchInp.value = '';
        }, 5000);
      } else if (selectLang.value === 'en') {
        searchInp.value = engText[7];
        setTimeout(() => {
          searchInp.value = '';
        }, 5000);
      }
    }
  });

  selectLang.addEventListener('change', () => {
    localStorage.setItem('lang', `${selectLang.value}`);
    lang = selectLang.value;
    if (selectLang.value === 'ru') {
      initWeather(cityRequest, rusText, rusWeekDays);
      getMap(getCoord(cityRequest), lang);
      selectLang.blur();
    } else if (selectLang.value === 'en') {
      initWeather(cityRequest, engText, engWeekDays);
      getMap(getCoord(cityRequest), lang);
      selectLang.blur();
    }
  }, false);

  selectMetr.addEventListener('change', () => {
    localStorage.setItem('metr', `${selectMetr.value}`);
    metr = selectMetr.value;
    if (selectLang.value === 'ru') {
      initWeather(cityRequest, rusText, rusWeekDays);
      selectMetr.blur();
    } else if (selectLang.value === 'en') {
      initWeather(cityRequest, engText, engWeekDays);
      selectMetr.blur();
    }
  });
  const controlsBackgroundBtn = document.querySelector('.controlsBackgroundBtn');
  controlsBackgroundBtn.addEventListener('click', () => {
    getAndChangeFon();
    controlsBackgroundBtn.blur();
  });
}
