window.map = null;

async function main() {
  // Ждем полной готовности API и всех пакетов
  await ymaps3.ready;

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapControls,
    YMapMarker,
    YMapFeature
  } = ymaps3;

  // Импортируем только контролы, тему мы уже подключили в HTML
  const { YMapZoomControl, YMapGeolocationControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

  const CENTER_COORDINATES = [37.540335, 55.386906];

  // Координаты полигона (Долгота, Широта)
  const POLYGON_GEOMETRY = [
    [
      [37.536, 55.389],
      [37.544, 55.389],
      [37.540, 55.384],
      [37.536, 55.389]
    ]
  ];

  // Инициализация карты
  map = new YMap(document.getElementById('map'), {
    location: {
      center: CENTER_COORDINATES,
      zoom: 16
    }
  });

  // Добавляем слои (FeaturesLayer обязателен для полигонов)
  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());

  // Создаем и добавляем полигон
  const polygon = new YMapFeature({
    geometry: {
      type: 'Polygon',
      coordinates: POLYGON_GEOMETRY
    },
    style: {
      fill: 'rgba(56, 128, 255, 0.3)',
      stroke: [{ color: '#3880ff', width: 4 }]
    }
  });
  map.addChild(polygon);

  // Контролы
  map.addChild(new YMapControls({ position: 'right' }).addChild(new YMapZoomControl({})));
  map.addChild(new YMapControls({ position: 'top right' }).addChild(new YMapGeolocationControl({})));

  // Маркер
  const markerWrapper = document.createElement('div');
  markerWrapper.style.width = '40px';
  markerWrapper.style.height = '40px';
  // Центрируем иконку относительно точки (чтобы не плыла)
  markerWrapper.innerHTML = `
        <img src="assets/imgs/marker.svg" 
             style="width: 100%; height: 100%; transform: translate(-50%, -100%); position: absolute;">
    `;

  map.addChild(new YMapMarker({
    coordinates: CENTER_COORDINATES
  }, markerWrapper));
}

// Запуск
main();