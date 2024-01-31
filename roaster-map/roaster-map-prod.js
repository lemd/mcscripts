$(document).ready(function () {

  let currentInfowindow = null; // Define currentInfowindow at the top level

  // Global Constants
  const icon1 = {
    url: "https://uploads-ssl.webflow.com/5eb0f393bcf84463fde7eeb0/65b841bda385a8f6719d6966_icon-map-roaster.svg",
  };

  const icon2 = {
    url: "https://uploads-ssl.webflow.com/5eb0f393bcf84463fde7eeb0/65b841bd6bf492a6b082d3b3_icon-map-shop.svg",
  };

  function initMap() {
    // Add google-dependent features for icon1 and icon2 here to avoid 'google is not defined' error.
    icon1.scaledSize = new google.maps.Size(29, 36);
    icon2.scaledSize = new google.maps.Size(29, 36);

    // Uncomment and define mapLat and mapLong
    const mapLat = 51.1784;
    const mapLong = 115.5708;

    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: mapLat, lng: mapLong },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      myLocationEnabled: true,
    });

    // Keep track of the currently open info window
    let currentInfowindow = null;

    // Function to create markers
    function createMarker(markerData, index) {
      const latLng = new google.maps.LatLng(markerData[1], markerData[2]);

      // Check the text value at position 8 in markerData
      const markerType = markerData[8];

      // Choose the appropriate icon based on the markerType
      const icon = markerType === "Coffee Shop" ? icon1 : icon2;

      const marker = new google.maps.Marker({
        position: latLng,
        map: map,
        label: "",
        animation: google.maps.Animation.DROP,
        icon: icon,
      });

      // Event listener for the marker click
      google.maps.event.addListener(marker, "click", function () {
        // Close the currently open info window, if any
        if (currentInfowindow) {
          currentInfowindow.close();
        }

        // Create a new instance of InfoWindow
        const infowindow = new google.maps.InfoWindow({
          content: "", // Empty content to prevent default infowindow
          disableAutoPan: false,
        });

        // Open the info window
        infowindow.open(map, marker);

        // Update the currently open info window
        currentInfowindow = infowindow;

        // Show the custom infowindow
        updateCustomInfowindow(index);
      });

      return marker;
    }

    const bounds = new google.maps.LatLngBounds();

    // Create markers and extend bounds
    for (let i = 0; i < markers.length; i++) {
      const markerObj = createMarker(markers[i], i);
      bounds.extend(markerObj.getPosition());
    }

    // Adjust map center and zoom level
    if (markers.length === 1) {
      map.setCenter(new google.maps.LatLng(markers[0][1], markers[0][2]));
      map.setZoom(12);
    } else {
      // If there are multiple markers, fit the map bounds
      map.fitBounds(bounds);
    }

    // Event listener for the info window close
    google.maps.event.addListener(currentInfowindow, "closeclick", function () {
      // Hide the custom infowindow
      $("#custom-infowindow").addClass("hidden");
    });

    // Console log to check the markers array
    console.log("Markers Array:", markers);
  }

  // Function to update the content of the custom infowindow
  function updateCustomInfowindow(index) {
    const markerData = markers[index];
    const title = markerData[0];
    const details = `${markerData[3]}<br>${markerData[4]}`;

    console.log("Updating custom infowindow with:", title, details);

    $("#custom-infowindow .location-title").html(title);
    $("#custom-infowindow .location-details").html(details);

    // Show the custom infowindow
    console.log("Before removing hidden class:", $("#custom-infowindow").attr("class"));
    $("#custom-infowindow").removeClass("hidden");
    console.log("After removing hidden class:", $("#custom-infowindow").attr("class"));
  }

  // Call the initMap function when the document is ready
  initMap();
});