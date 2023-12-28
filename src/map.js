import 'maplibre-gl/dist/maplibre-gl.css';
import MapLibreGL from 'maplibre-gl';

export const popUp = new MapLibreGL.Popup({ closeOnClick: false });

MapLibreGL.setRTLTextPlugin(
  'https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js',
  null,
  true
);

export const map = new MapLibreGL.Map({
  container: 'map', // container id
  style: '/cairo-mbtiles-style.json',
  center: [31.2863, 30.0431],
  zoom: 9,
});
