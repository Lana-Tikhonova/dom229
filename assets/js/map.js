window.map = null;

main();
async function main() {
  // Waiting for all api elements to be loaded
  await ymaps3.ready;
  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapFeature } = ymaps3;
  // Initialize the map
  map = new YMap(
    // Pass the link to the HTMLElement of the container
    document.getElementById('app'),
    // Pass the map initialization parameters
    {
      location:
      {
        center: [39.6, 52.6],
        zoom: 10
      }, showScaleInCopyrights: true
    },
    [
      // Add a map scheme layer
      new YMapDefaultSchemeLayer({}),
      // Add a layer of geo objects to display the polygons
      new YMapDefaultFeaturesLayer({})
    ]
  );


  // Create polygon objects, set their coordinates and styles, and add them to the map
  const polygon = new YMapFeature({
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [39.4220979, 52.6228689],
          [39.572434, 52.5183144],
          [39.8114908, 52.5312354],
          [39.7007866, 52.6605346],
          [39.4220979, 52.6228689]
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

}
