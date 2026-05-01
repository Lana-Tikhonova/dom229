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
    YMapMarker,
    YMapFeature
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


  const polygon = new YMapFeature({
    geometry: {
      type: 'Polygon',
      coordinates: [
        [

          [37.54280660725793, 55.388119654857476],
          [37.54445465470021, 55.389610385883884],
          [37.54651659533575, 55.38898068742215],
          [37.546892861875094, 55.3885180453997],
          [37.54315277247412, 55.38774696328142],
          [37.54147158858993, 55.38700251083525],
          [37.54018475702541, 55.386372770663215],
          [37.53915378670764, 55.386192843049834],
          [37.5388904001301, 55.38633849880024],
          [37.538905450791674, 55.38657840121459],
          [37.540350314302714, 55.38801350120341],
          [37.540838953725896, 55.388522630348014],
          [37.54103461232635, 55.388462657842965],
          [37.54120769493444, 55.38863829134983],
          [37.54279553973043, 55.388115672270374]

        ]
      ]
    },
    style: {
      stroke: [
        {
          color: '#196DFF99',
          width: 3
        }
      ],
      fill: '#196DFF14'
    }
  });
  map.addChild(polygon);

  const clickListener = new ymaps3.YMapListener({
    onClick: (object, event) => {
      // В v3 координаты клика передаются в свойстве coords
      const coords = event?.coords;

      if (coords) {
        console.log(`Координаты точки: [${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}]`);
      } else {
        // Если вдруг coords пуст, посмотрим, что вообще пришло в event
        console.log('Событие получено, но координаты отсутствуют:', event);
      }
    }
  });

  map.addChild(clickListener);


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
