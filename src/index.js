import './main.css';
import { checkLang, checkSelectors } from './modules/initWeather.js';
import { getCoord, getLocation } from './modules/coordAndTimeZone.js';
import { getMap } from './modules/map.js';
import {
  addListeners, lang, cityRequest
} from './modules/listeners.js';
import { getAndChangeFon } from './modules/background.js';

checkSelectors();

addListeners();

getAndChangeFon();

checkLang(getLocation());

getMap(getCoord(cityRequest), lang);
