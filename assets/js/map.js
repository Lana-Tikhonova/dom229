map = new YMap(document.getElementById('map'), {
  location: LOCATION
});

map.addChild(new YMapDefaultSchemeLayer());

const featureLayer = new YMapDefaultFeaturesLayer();
map.addChild(featureLayer);

featureLayer.addChild(feature);

// 🔥 FIX: стабилизация projection
map.update({
  location: {
    center: CENTER_COORDINATES,
    zoom: 16
  }
});

requestAnimationFrame(() => {
  map.update({
    location: {
      center: CENTER_COORDINATES,
      zoom: 16
    }
  });
});