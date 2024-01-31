<script>
window.addEventListener("load", function () {
  const mapLat = 51.1784;
  const mapLong = 115.5708;

  const map = new google.maps.Map(document.getElementById("post-map-main"), {
    zoom: 15,
    center: { lat: mapLat, lng: mapLong },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    myLocationEnabled: true,
  });

  const infowindow = new google.maps.InfoWindow();

  const icon1 = {
    url: "https://uploads-ssl.webflow.com/5eb0f393bcf84463fde7eeb0/6430003f37bbf117547a9e83_icon-pin.svg",
    scaledSize: new google.maps.Size(28, 45),
  };

  const icon2 = {
    url: "https://uploads-ssl.webflow.com/5eb0f393bcf84463fde7eeb0/6430003fbb9928e9d8d37e17_icon-pin-hover.svg", // Change this to your hover icon URL
    scaledSize: new google.maps.Size(28, 45),
  };

function createMarker(locations) {
  const latLng = new google.maps.LatLng(locations[1], locations[2]);
  const marker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon: icon1,
    animation: google.maps.Animation.DROP,
  });

  google.maps.event.addListener(marker, "click", function () {
    const popupString = '<div class="map-modal">' + locations[0] + "</div>";
    infowindow.setContent(popupString);
    infowindow.open(map, marker);
    map.panTo(marker.position);
  });

  google.maps.event.addListener(marker, "mouseover", function () {
    marker.setIcon(icon2);
    infowindow.setContent(locations[0]); // Set the info window content
    infowindow.open(map, marker); // Open the info window on mouseover
  });

  google.maps.event.addListener(marker, "mouseout", function () {
    marker.setIcon(icon1);
    infowindow.close(); // Close the info window on mouseout
  });

  return marker;
}

  const bounds = new google.maps.LatLngBounds();

  for (let i = 0; i < locations.length; i++) {
    const marker = createMarker(locations[i]);
    bounds.extend(marker.getPosition());
  }

  map.fitBounds(bounds);
});
</script>