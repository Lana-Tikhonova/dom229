window.map = null;

main();

async function main() {
  // Ждем загрузки всех модулей API
  await ymaps3.ready;

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapControls,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapFeature // Нужно для полигона
  } = ymaps3;

  // Импорт элементов управления
  const {
    YMapZoomControl,
    YMapGeolocationControl
  } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

  // Координаты [долгота, широта]
  const CENTER_COORDINATES = [37.540335, 55.386906];

  // Координаты для полигона (треугольник вокруг центра)
  // Важно: массив должен быть трехслойным [[[lon, lat], ...]]
  const POLYGON_GEOMETRY = [
    [
      [37.536, 55.389],
      [37.544, 55.389],
      [37.540, 55.384],
      [37.536, 55.389] // Замыкающая точка
    ]
  ];

  // Инициализация карты
  map = new YMap(document.getElementById('map'), {
    location: {
      center: CENTER_COORDINATES,
      zoom: 16
    }
  });

  // СЛОИ: Сначала схема, затем слой для объектов (полигонов)
  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());

  // ДОБАВЛЕНИЕ ПОЛИГОНА
  const polygon = new YMapFeature({
    id: 'triangle',
    geometry: {
      type: 'Polygon',
      coordinates: POLYGON_GEOMETRY
    },
    style: {
      fill: 'rgba(56, 128, 255, 0.3)', // Полупрозрачный синий
      stroke: [{ color: '#3880ff', width: 3 }] // Яркая обводка
    }
  });
  map.addChild(polygon);

  // ЭЛЕМЕНТЫ УПРАВЛЕНИЯ
  map.addChild(new YMapControls({ position: 'right' })
    .addChild(new YMapZoomControl({}))
  );
  map.addChild(new YMapControls({ position: 'top right' })
    .addChild(new YMapGeolocationControl({}))
  );

  // СОЗДАНИЕ МАРКЕРА
  const markerWrapper = document.createElement('div');
  markerWrapper.className = 'marker_wrapper';

  // Создаем саму картинку
  const markerImg = document.createElement('img');
  markerImg.src = 'assets/imgs/marker.svg';
  markerImg.style.width = '40px';  // Задаем размеры явно, чтобы не "уезжало"
  markerImg.style.height = '40px';
  markerImg.style.transform = 'translate(-50%, -100%)'; // Центрируем кончик иглы по координате

  markerWrapper.appendChild(markerImg);

  // Добавляем маркер на карту
  map.addChild(new YMapMarker({
    coordinates: CENTER_COORDINATES,
    title: 'Маркер'
  }, markerWrapper));
}