window.map = null;

async function main() {
  await ymaps3.ready;

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapFeature
  } = ymaps3;

  // 1. Инициализируем карту БЕЗ слоев в конструкторе (так надежнее)
  map = new YMap(document.getElementById('map'), {
    location: {
      center: [39.6, 52.6],
      zoom: 10
    },
    showScaleInCopyrights: true
  });

  // 2. Сначала добавляем слои через addChild. 
  // ВАЖНО: FeaturesLayer должен быть добавлен СРАЗУ после SchemeLayer.
  map.addChild(new YMapDefaultSchemeLayer({}));
  map.addChild(new YMapDefaultFeaturesLayer({}));

  // 3. Создаем полигон
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
      stroke: [{ color: '#196DFF', width: 3, opacity: 0.6 }],
      fill: 'rgba(25, 109, 255, 0.1)'
    }
  });

  // 4. Добавляем полигон на карту
  map.addChild(polygon);
}

// Ждем, пока браузер "увидит" все HTML-теги
document.addEventListener('DOMContentLoaded', () => {
  main().catch(console.error);
});