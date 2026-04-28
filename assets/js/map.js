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

  // // клик на маркер  
  // markerElement.onclick = function () {
  //   markerTitle.innerHTML = 'ЖК Golden City, Челюскина, 2';

  //   if (imgContainer.classList.contains("show")) {
  //     imgContainer.classList.remove("show")
  //     markerTitle.innerHTML = '';
  //   } else {
  //     markerTitle.innerHTML = 'ЖК Golden City, Челюскина, 2';
  //     imgContainer.classList.add("show")
  //   }
  // }

  // Добавление центра карты
  map.addChild(new YMapMarker({
    coordinates: CENTER_COORDINATES
  }));

  // Добавление маркера на карту
  map.addChild(new YMapMarker({
    coordinates: MARKER_COORDINATES
  }, imgContainer));
}