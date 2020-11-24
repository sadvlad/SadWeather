export async function getMap(coord, language) {
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
