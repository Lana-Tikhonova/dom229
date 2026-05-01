window.map = null;

// Главная функция, вызывается при запуске скрипта
main();
async function main() {
  // ожидание загрузки модулей
  await ymaps3.ready;
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapControls,
    YMapDefaultFeaturesLayer,
    YMapMarker
  } = ymaps3;

  // Импорт модулей для элементов управления на карте
  const {
    YMapZoomControl,
    YMapGeolocationControl
  } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');


  // Координаты центра карты
  const CENTER_COORDINATES = [37.540335, 55.386906];
  // координаты метки на карте
  const MARKER_COORDINATES = [37.540335, 55.386906];


  // Объект с параметрами центра и зумом карты
  const LOCATION = {
    center: CENTER_COORDINATES,
    zoom: 16
  };

  // Создание объекта карты
  map = new YMap(document.getElementById('map'), {
    location: LOCATION
  });

  // Добавление слоев на карту
  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());

  // Добавление элементов управления на карту
  map.addChild(new YMapControls({
    position: 'right'
  })
    .addChild(new YMapZoomControl({}))
  );
  map.addChild(new YMapControls({
    position: 'top right'
  })
    .addChild(new YMapGeolocationControl({}))
  );


  // Создание маркера
  const markerElement = document.createElement('img');
  markerElement.className = 'my-marker';
  markerElement.src = 'assets/imgs/marker.svg';
  markerElement.title = 'Маркер';

  // Создание заголовка маркера
  const markerTitle = document.createElement('div');
  markerTitle.className = 'marker-title';
  markerTitle.innerHTML = '';

  // Контейнер для элементов маркера
  const imgContainer = document.createElement('div');
  imgContainer.className = 'marker_wrapper';
  imgContainer.appendChild(markerElement);
  imgContainer.appendChild(markerTitle);


  // Добавление центра карты
  map.addChild(new YMapMarker({
    coordinates: CENTER_COORDINATES
  }));

  // Добавление маркера на карту
  map.addChild(new YMapMarker({
    coordinates: MARKER_COORDINATES
  }, imgContainer));
}



// window.map = null;

// main();
// async function main() {
//   // Waiting for all api elements to be loaded
//   await ymaps3.ready;
//   const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapFeature } = ymaps3;
//   // Initialize the map
//   map = new YMap(
//     // Pass the link to the HTMLElement of the container
//     document.getElementById('app'),
//     // Pass the map initialization parameters
//     {
//       location:
//       {
//         center: [39.6, 52.6],
//         zoom: 10
//       }, showScaleInCopyrights: true
//     },
//     [
//       // Add a map scheme layer
//       new YMapDefaultSchemeLayer({}),
//       // Add a layer of geo objects to display the polygons
//       new YMapDefaultFeaturesLayer({})
//     ]
//   );


//   // Create polygon objects, set their coordinates and styles, and add them to the map
//   const polygon = new YMapFeature({
//     geometry: {
//       type: 'Polygon',
//       coordinates: [
//         [
//           [39.4220979, 52.6228689],
//           [39.572434, 52.5183144],
//           [39.8114908, 52.5312354],
//           [39.7007866, 52.6605346],
//           [39.4220979, 52.6228689]
//         ]
//       ]
//     },
//     style: {
//       stroke: [
//         {
//           color: '#196DFF99',
//           width: 3
//         }
//       ],
//       fill: '#196DFF14'
//     }
//   });
//   map.addChild(polygon);

// }
