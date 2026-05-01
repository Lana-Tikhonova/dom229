window.map = null;

main();

async function main() {
  await ymaps3.ready;

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapControls,
    YMapDefaultFeaturesLayer,
    YMapMarker
  } = ymaps3;

  const {
    YMapZoomControl,
    YMapGeolocationControl
  } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

  const CENTER_COORDINATES = [37.540335, 55.386906];
  const MARKER_COORDINATES = [37.540335, 55.386906];

  const LOCATION = {
    center: CENTER_COORDINATES,
    zoom: 16
  };

  map = new YMap(document.getElementById('map'), {
    location: LOCATION
  });

  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());

  map.addChild(new YMapControls({ position: 'right' })
    .addChild(new YMapZoomControl())
  );

  map.addChild(new YMapControls({ position: 'top right' })
    .addChild(new YMapGeolocationControl())
  );

  // МАРКЕР
  const markerElement = document.createElement('img');
  markerElement.className = 'my-marker';
  markerElement.src = 'assets/imgs/marker.svg';

  const imgContainer = document.createElement('div');
  imgContainer.className = 'marker_wrapper';
  imgContainer.appendChild(markerElement);

  map.addChild(new YMapMarker({
    coordinates: MARKER_COORDINATES
  }, imgContainer));
}