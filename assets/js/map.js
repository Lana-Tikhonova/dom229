window.map = null;

main();

async function main() {
  await ymaps3.ready;
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapControls,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapFeature // Добавляем класс для отрисовки фигур
  } = ymaps3;

  const {
    YMapZoomControl,
    YMapGeolocationControl
  } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

  const CENTER_COORDINATES = [37.540335, 55.386906];

  // Координаты вершин треугольника (массив массивов)
  // Важно: в JS API 3.0 координаты передаются как [долгота, широта]
  const POLYGON_POINTS = [
    [
      [37.535, 55.389], // Вершина 1
      [37.545, 55.389], // Вершина 2
      [37.540, 55.383], // Вершина 3
      [37.535, 55.389]  // Замыкающая точка (должна совпадать с первой)
    ]
  ];

  const LOCATION = {
    center: CENTER_COORDINATES,
    zoom: 15
  };

  map = new YMap(document.getElementById('map'), {
    location: LOCATION
  });

  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());

  // --- ДОБАВЛЕНИЕ ПОЛИГОНА ---
  const polygon = new YMapFeature({
    id: 'my-polygon',
    geometry: {
      type: 'Polygon',
      coordinates: POLYGON_POINTS
    },
    style: {
      // Цвет заливки в формате RGBA или HEX
      fill: 'rgba(56, 128, 255, 0.5)',
      // Цвет обводки
      stroke: [{ color: '#3880ff', width: 4 }],
    }
  });

  map.addChild(polygon);
  // ---------------------------

  // Элементы управления
  map.addChild(new YMapControls({ position: 'right' }).addChild(new YMapZoomControl({})));
  map.addChild(new YMapControls({ position: 'top right' }).addChild(new YMapGeolocationControl({})));

  // Маркер (упрощенный пример)
  const markerElement = document.createElement('div');
  markerElement.className = 'my-marker';
  markerElement.innerHTML = '<img src="assets/imgs/marker.svg" style="width:30px; height:30px;">';

  map.addChild(new YMapMarker({
    coordinates: CENTER_COORDINATES
  }, markerElement));
}