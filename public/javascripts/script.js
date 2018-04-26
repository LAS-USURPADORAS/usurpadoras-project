document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");


    const position= {
      lat: 25.1533,
      lng: -108.1732
    };

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: position
    });

    const pin = new google.maps.Marker({
      position,
      map: map
 
    });
  },
  false
);
