let myMap;

const init = () => {
    myMap = new ymaps.Map("map", {
    center: [61.254035, 73.396221],
    zoom: 11,
    controls: []
   });

   const coords = [
       [61.233929, 73.459229],
       [61.277623, 73.365511],
       [61.268726, 73.456215]
   ];

   const myCollection = new ymaps.GeoObjectCollection({}, {
       draggable: false,
       iconLayout: 'default#image',
       iconImageHref: "./img/svg_icons/marker_map.svg",
       iconImageSize: [46, 57],
       iconImageOffset: [-35, -52]
   });

   coords.forEach(coord => {
       myCollection.add(new ymaps.Placemark(coord));
   });

   myMap.geoObjects.add(myCollection);

   myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);