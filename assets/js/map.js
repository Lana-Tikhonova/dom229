window.map = null;

main();

async function main() {
  await ymaps3.ready;


  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapControls,
    YMapMarker,
    YMapFeature,
    YMapListener
  } = ymaps3;

  const {
    YMapZoomControl,
    YMapGeolocationControl
  } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

  // Центр карты
  const CENTER_COORDINATES = [37.540335, 55.386906];

  const LOCATION = {
    center: CENTER_COORDINATES,
    zoom: 16
  };

  // 🔥 защита от повторной инициализации
  if (window.map) {
    window.map.destroy?.();
  }

  const map = new YMap(document.getElementById('map'), {
    location: LOCATION
  });

  window.map = map;

  // =========================
  // СЛОИ (строго в этом порядке)
  // =========================
  map.addChild(new YMapDefaultSchemeLayer());

  const featureLayer = new YMapDefaultFeaturesLayer();
  map.addChild(featureLayer);

  // =========================
  // ПОЛИГОН (треугольник тестовый)
  // =========================
  const polygonCoords = [
    [37.5400, 55.3870],
    [37.5420, 55.3890],
    [37.5440, 55.3870],
    [37.5400, 55.3870] // замыкание
  ];

  const feature = new YMapFeature({
    geometry: {
      type: 'Polygon',
      coordinates: [polygonCoords]
    },
    style: {
      fill: 'rgba(56, 128, 255, 0.4)',
      stroke: [{ color: '#3880ff', width: 3 }]
    }
  });

  featureLayer.addChild(feature);

  // =========================
  // CONTROLS
  // =========================
  map.addChild(
    new YMapControls({ position: 'right' })
      .addChild(new YMapZoomControl({}))
  );

  map.addChild(
    new YMapControls({ position: 'top right' })
      .addChild(new YMapGeolocationControl({}))
  );

  // =========================
  // CLICK LISTENER
  // =========================
  const clickListener = new YMapListener({
    onClick: (_, event) => {
      const coords = event?.coords;

      if (coords) {
        console.log(
          `Координаты точки: [${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}]`
        );
      }
    }
  });

  map.addChild(clickListener);

  // =========================
  // MARKER (нормальный)
  // =========================
  const markerElement = document.createElement('img');
  markerElement.className = 'my-marker';
  markerElement.src = 'assets/imgs/marker.svg';

  const markerTitle = document.createElement('div');
  markerTitle.className = 'marker-title';

  const markerContainer = document.createElement('div');
  markerContainer.className = 'marker_wrapper';
  markerContainer.appendChild(markerElement);
  markerContainer.appendChild(markerTitle);

  const marker = new YMapMarker(
    { coordinates: CENTER_COORDINATES },
    markerContainer
  );

  map.addChild(marker);
}