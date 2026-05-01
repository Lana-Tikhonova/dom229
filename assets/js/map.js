window.map = null;

main();

async function main() {
  await ymaps3.ready;

  // Импортируем основные классы и пакет элементов интерфейса (нужен для корректных стилей)
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapControls,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapFeature
  } = ymaps3;

  // Импортируем элементы управления и ТЕМУ (обязательно для Feature)
  const [ymaps3Controls, ymaps3Theme] = await Promise.all([
    ymaps3.import('@yandex/ymaps3-controls@0.0.1'),
    ymaps3.import('@yandex/ymaps3-default-ui-theme')
  ]);

  const { YMapZoomControl, YMapGeolocationControl } = ymaps3Controls;

  const CENTER_COORDINATES = [37.540335, 55.386906];

  // Координаты: [Долгота, Широта]
  const POLYGON_GEOMETRY = [
    [
      [37.536, 55.389],
      [37.544, 55.389],
      [37.540, 55.384],
      [37.536, 55.389]
    ]
  ];

  map = new YMap(document.getElementById('map'), {
    location: {
      center: CENTER_COORDINATES,
      zoom: 16
    }
  });

  // ПОРЯДОК ВАЖЕН:
  map.addChild(new YMapDefaultSchemeLayer());
  // Слой фич должен быть добавлен ДО самих фич
  map.addChild(new YMapDefaultFeaturesLayer());

  // Создаем полигон через Feature
  const polygon = new YMapFeature({
    geometry: {
      type: 'Polygon',
      coordinates: POLYGON_GEOMETRY
    },
    // Используем корректные свойства стилизации для 3.0
    style: {
      fill: '#3880ff',
      fillOpacity: 0.3,
      stroke: [{ color: '#3880ff', width: 4 }]
    }
  });

  map.addChild(polygon);

  // Управление
  map.addChild(new YMapControls({ position: 'right' }).addChild(new YMapZoomControl({})));
  map.addChild(new YMapControls({ position: 'top right' }).addChild(new YMapGeolocationControl({})));

  // Маркер с жесткой фиксацией центра
  const markerWrapper = document.createElement('div');
  markerWrapper.style.position = 'relative';
  markerWrapper.style.width = '40px';
  markerWrapper.style.height = '40px';

  const markerImg = document.createElement('img');
  markerImg.src = 'assets/imgs/marker.svg';
  markerImg.style.width = '100%';
  markerImg.style.position = 'absolute';
  // Сдвиг, чтобы острие было в центре (зависит от вашей иконки)
  markerImg.style.left = '-50%';
  markerImg.style.top = '-100%';

  markerWrapper.appendChild(markerImg);

  map.addChild(new YMapMarker({
    coordinates: CENTER_COORDINATES
  }, markerWrapper));
}