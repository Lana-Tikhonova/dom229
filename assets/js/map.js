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
          [37.54445760670974, 55.389605254062346],
          [37.5428020474198, 55.38810780796443],
          [37.54122214981001, 55.38864246668379],
          [37.541064410154696, 55.38849133755304],
          [37.540879242988694, 55.388526030103705],
          [37.53890516083721, 55.386577929169555],
          [37.538888954847096, 55.3864612329093],
          [37.53890759166978, 55.38634920807847],
          [37.5389518425828, 55.38628791369679],
          [37.53897345232821, 55.386270998567575],
          [37.5391026828001, 55.38620541407984],
          [37.539228068733806, 55.386172245443035],
          [37.53926464645235, 55.38616867580655],
          [37.53940155162749, 55.386173435321794],
          [37.54018350511676, 55.38637092310549],
          [37.54319203616617, 55.38772626629546],
          [37.54689197674094, 55.388519942894774],
          [37.54651192734053, 55.388983482868824],
          [37.54446692739068, 55.38960319539749],
          [37.54445760670974, 55.389605254062346]

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
