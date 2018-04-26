document.addEventListener(
    "DOMContentLoaded",
    () => {
      console.log("IronGenerator JS imported successfully!");
      console.log(window.places);
      const places = window.places;
  
       const centerMap = {
         lat: 25.1533,
         lng: -108.1732
      };
  
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: centerMap
      });
  
      places.forEach(place => {
        console.log(place);
        const pin = new google.maps.Marker({
          position: {
            lat: place.location.coordinates[0],
            lng: place.location.coordinates[1]
          },
          map: map,
          title: place.name
        });
      });
    },
    false
  );
  