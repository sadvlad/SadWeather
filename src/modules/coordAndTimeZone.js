export async function getLocation() {
  const urlLoc = 'https://ipinfo.io/json?token=eb5b90bb77d46a';
  const locResponce = await fetch(urlLoc);
  const locData = await locResponce.json();
  const location = await locData.loc;
  localStorage.setItem('city', location);
  return location;
}

export async function getCoord(searchOptions) {
  const keyGeo = 'c6b6da0f80f24b299e08ee1075f81aa5';
  const urlGeo = `https://api.opencagedata.com/geocode/v1/json?q=${searchOptions}&key=${keyGeo}&pretty=1&limit=1`;
  const geoResponce = await fetch(urlGeo);
  const geoData = await geoResponce.json();
  let lat = geoData.results[0].geometry.lat;
  let lng = geoData.results[0].geometry.lng;
  const center = [+lng, +lat];
  return center;
}
export async function getTimeZone(searchOptions) {
  const keyGeo = 'c6b6da0f80f24b299e08ee1075f81aa5';
  const urlGeo = `https://api.opencagedata.com/geocode/v1/json?q=${searchOptions}&key=${keyGeo}&pretty=1&limit=1`;
  const geoResponce = await fetch(urlGeo);
  const geoData = await geoResponce.json();
  const timeZone = geoData.results[0].annotations.timezone.name;
  return timeZone;
}
