import 'maplibre-gl/dist/maplibre-gl.css';
import MapLibreGL from 'maplibre-gl';

export const popUp = new MapLibreGL.Popup({ closeOnClick: false });

// MapLibreGL.setRTLTextPlugin(
//   'https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js',
//   null,
//   true
// );

export const map = new MapLibreGL.Map({
  container: 'map', // container id
  style: '/src/cairo-mbtiles-style.json',
  center: [31.2863, 30.0431],
  zoom: 9,
});

// export const map = new MapLibreGL.Map({
//   container: 'map', // container id
//   style: '/src/cairo-mbtiles-title.json',
//   center: [31.2863, 30.0431],
//   zoom: 9,
// });

// export const map = new MapLibreGL.Map({
//   container: 'map', // container id
//   style: {
//     version: 8,
//     glyphs: '/fonts/{fontstack}/{range}.pbf',
//     sources: {
//       'raster-tiles': {
//         type: 'raster',
//         tiles: ['http://[::]:8080/styles/basic-preview/{z}/{x}/{y}.png'],
//         tileSize: 256,
//         attribution:
//           '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//       },
//     },
//     layers: [
//       {
//         id: 'simple-tiles',
//         type: 'raster',
//         source: 'raster-tiles',
//         minzoom: 0,
//         maxzoom: 22,
//       },
//     ],
//   },
//   center: [0, 0],
//   zoom: 1.5,
// });