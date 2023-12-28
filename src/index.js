import { bbox } from '@turf/turf';
import { map, popUp } from './map';
import mcJsoData from './geoJson/mcdonaldsPerState.json';
import usStatesJsoData from './geoJson/usStatesCoo.json';


map.on('load', () => {
  addUsaStates();
});

function addUsaStates() {
  map.addSource('states', {
    type: 'geojson',
    data: usStatesJsoData,
  });

  map.addLayer({
    id: 'states-fill-layer',
    type: 'fill',
    source: 'states',
    paint: {
      'fill-opacity': 0.2,
      'fill-color': '#00FF00',
    },
  });

  map.addLayer({
    id: 'states-line-layer',
    type: 'line',
    source: 'states',
    paint: {
      'line-opacity': 0.2,
      'line-color': '#000000',
    },
  });
}

const bounds = bbox(usStatesJsoData);
map.fitBounds(bounds);

map.on('click', 'states-fill-layer', (e) => {
  const clickedFeature = map.queryRenderedFeatures(e.point, {
    layers: ['states-fill-layer'],
  });

  popUp
    .setLngLat(e.lngLat)
    .setHTML(`This is ${clickedFeature[0]?.properties.name}`)
    .addTo(map);
});
