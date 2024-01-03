import { bbox } from '@turf/turf';
import { map, popUp } from './map';
import mcJsoData from './geoJson/mcdonaldsPerState.json';
import usStatesJsoData from './geoJson/usStatesCoo.json';

for (let i = 0; i < usStatesJsoData.features.length; i++) {
  const stateMcDo = mcJsoData.find(
    (el) => el.STATE === usStatesJsoData.features[i].properties.name
  );

  if (stateMcDo !== undefined) {
    usStatesJsoData.features[i].properties.numberOfMcdonalds =
      stateMcDo["Number of McDonald's"];
  } else {
    usStatesJsoData.features[i].properties.numberOfMcdonalds = 0;
  }
  console.log(usStatesJsoData.features[i].properties.numberOfMcdonalds);
}

map.on('load', () => {
  addUsaStates();
});

function addUsaStates() {
  map.addSource('states', {
    type: 'geojson',
    data: usStatesJsoData,
  });

  // map.addLayer({
  //   id: 'states-fill-layer',
  //   type: 'fill',
  //   source: 'states',
  //   paint: {
  //     'fill-opacity': 0.2,
  //     'fill-color': '#00FF00',
  //   },
  // });

  // https://maplibre.org/maplibre-style-spec/expressions/
  // These are really complicated and hard to understand, don't try too hard!
  // https://stackoverflow.com/questions/62263771/error-in-interpolate-expressions-when-trying-to-change-color-according-to-mult
  map.addLayer({
    id: 'states-fill-layer',
    type: 'fill',
    source: 'states',
    paint: {
      'fill-opacity': 0.5,
      'fill-color': [
        'interpolate',
        ['linear'],
        ['number', ['get', 'numberOfMcdonalds']],
        1,
        'grey',
        1200,
        'red',
      ],
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

  // Now here we can "loop" over the spreadsheet data to find the one that has the same name as the clicked state
  const clickedStateName = clickedFeature[0]?.properties.name;
  const numberOfMcdonalds = clickedFeature[0]?.properties.numberOfMcdonalds;

  popUp
    .setLngLat(e.lngLat)
    .setHTML(
      `You clicked ${clickedStateName}, which has ${numberOfMcdonalds} McDonald's!`
    )
    .addTo(map);
});
