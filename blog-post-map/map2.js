window.initMap = function () {
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
    url: "https://uploads-ssl.webflow.com/5eb0f393bcf84463fde7eeb0/6430003fbb9928e9d8d37e17_icon-pin-hover.svg",
    scaledSize: new google.maps.Size(28, 45),
  };

  function createMarker(locations, index) {
    const latLng = new google.maps.LatLng(locations[1], locations[2]);
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: icon1,
      animation: google.maps.Animation.DROP,
    });

    google.maps.event.addListener(marker, "click", function () {
      const popupString = `
    <div class="map-modal">
        <div>${locations[0]}</div>
        <a href="#item-${index + 1}" class="anchor-link">Go to Item ${
        index + 1
      }</a>
    </div>`;
      infowindow.setContent(popupString);
      infowindow.open(map, marker);
      map.panTo(marker.position);

      google.maps.event.addListenerOnce(infowindow, "domready", () => {
        const anchorLink = document.querySelector(".anchor-link");
        if (anchorLink) {
          anchorLink.addEventListener("click", function (event) {
            event.preventDefault();

            const href = this.getAttribute("href");
            const targetElement = document.querySelector(href);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
            }
          });
        }
      });
    });

    return marker;
  }

  // Your locations array
  const locations = [
    // Example locations data
    ["Location 1", 51.1784, 115.5708],
    ["Location 2", 51.1785, 115.5709],
    // Add more locations as needed
  ];

  const bounds = new google.maps.LatLngBounds();

  for (let i = 0; i < locations.length; i++) {
    const marker = createMarker(locations[i], i);
    bounds.extend(marker.getPosition());
  }

  map.fitBounds(bounds);
};
