window.map = null;

main();

async function main() {
  await ymaps3.ready;

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

  // =========================
  // КООРДИНАТЫ
  // =========================
  const CENTER_COORDINATES = [37.540335, 55.386906];

  const LOCATION = {
    center: CENTER_COORDINATES,
    zoom: 16
  };

  // =========================
  // КАРТА
  // =========================
  if (window.map) {
    window.map.destroy?.();
  }

  const map = new YMap(document.getElementById('map'), {
    location: LOCATION
  });

  window.map = map;

  // =========================
  // СЛОИ
  // =========================
  map.addChild(new YMapDefaultSchemeLayer());

  const featureLayer = new YMapDefaultFeaturesLayer();
  map.addChild(featureLayer);

  // =========================
  // ПОЛИГОН (треугольник)
  // =========================
  const polygonCoords = [
    [37.5400, 55.3870],
    [37.5420, 55.3890],
    [37.5440, 55.3870],
    [37.5400, 55.3870]
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
  const controlsRight = new YMapControls({ position: 'right' });
  controlsRight.addChild(new YMapZoomControl({}));
  map.addChild(controlsRight);

  const controlsTop = new YMapControls({ position: 'top right' });
  controlsTop.addChild(new YMapGeolocationControl({}));
  map.addChild(controlsTop);

  // =========================
  // CLICK LISTENER
  // =========================
  map.addChild(
    new YMapListener({
      onClick: (_, event) => {
        const coords = event?.coords;
        if (!coords) return;

        console.log(
          `Координаты точки: [${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}]`
        );
      }
    })
  );

  // =========================
  // MARKER
  // =========================
  const markerElement = document.createElement('img');
  markerElement.className = 'my-marker';
  markerElement.src = 'assets/imgs/marker.svg';

  const markerContainer = document.createElement('div');
  markerContainer.className = 'marker_wrapper';
  markerContainer.appendChild(markerElement);

  map.addChild(
    new YMapMarker(
      { coordinates: CENTER_COORDINATES },
      markerContainer
    )
  );

  // =========================
  // 💥 CRITICAL FIX (твоя проблема "съезда")
  // =========================
  requestAnimationFrame(() => {
    map.update({
      location: LOCATION
    });
  });
}