// Global Constants
const icon1 = {
  url: "https://uploads-ssl.webflow.com/5eb0f393bcf84463fde7eeb0/656b96425f0b5257dec94599_map-pin-1.svg",
};

const icon2 = {
  url: "https://uploads-ssl.webflow.com/5eb0f393bcf84463fde7eeb0/656b96425e0e9fc1f7c14af6_map-pin-2.svg",
};

// Global Variables
var markers = [];
var currentMarkerIndex = 0;

function postListSequence() {
  var postCollectionListItems = $(".post-collection-list-item");

  postCollectionListItems.each(function (index) {
    var listItem = $(this);
    var sequenceNumber = index + 1;

    var heading = listItem.find(".post-list-heading").first();
    heading.prepend(sequenceNumber + ". ");

    // Add id attribute to parent ('post-collection-list-item') with format item-1, item-2, etc.
    var itemId = "item-" + sequenceNumber;
    listItem.attr("id", itemId);
  });
}

window.initMap = function () {
  // Add google dependent features for icon1 and icon2 here to avoid 'google is not defined' error.
  icon1.scaledSize = new google.maps.Size(28, 49);
  icon2.scaledSize = new google.maps.Size(28, 49);

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

  const infowindow = new google.maps.InfoWindow({
    disableAutoPan: true,
  });

  // Assuming you have a 'locations' array defined with marker data

  function createMarker(locations, index) {
    const latLng = new google.maps.LatLng(locations[1], locations[2]);
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
      label: {
        text: (index + 1).toString(),
        color: "#EEECE5",
      },
      animation: google.maps.Animation.DROP,
      icon: index == currentMarkerIndex ? icon2 : icon1,
    });

    markers.push(marker); // new line to push each marker into markers array

    const anchorLink = `#item-${index + 1}`;

    const popupString = '<div class="map-modal">' + locations[0] + "</div>";

    google.maps.event.addListener(marker, "click", function () {
      window.location.href = window.location.href.split("#")[0] + anchorLink;
      console.log("Clicked anchor link:", anchorLink);

      markers[currentMarkerIndex].setIcon(icon1);
      marker.setIcon(icon2);
      currentMarkerIndex = index;
    });

    google.maps.event.addListener(marker, "mouseover", function () {
      infowindow.setContent(locations[0]);
      infowindow.open(map, marker);
    });

    google.maps.event.addListener(marker, "mouseout", function () {
      infowindow.close();
    });

    return marker;
  }

  const bounds = new google.maps.LatLngBounds();

  for (let i = 0; i < locations.length; i++) {
    const marker = createMarker(locations[i], i);
    bounds.extend(marker.getPosition());
  }

  map.fitBounds(bounds);

  assignScrollEvent();
};

// Load Google Maps API asynchronously
function loadGoogleMaps() {
  const script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyABVXkXzZmcIgOlyjRQs5B_EBtikvvdn-c&callback=initMap";
  document.head.appendChild(script);
}

// Check if jQuery is loaded
if (window.jQuery) {
  // jQuery is already loaded
  console.log("jQuery is already loaded.");
  postListSequence();
  // Call the function to load the map
  loadGoogleMaps();
} else {
  // jQuery is not loaded, wait for it to load
  console.log("jQuery is not loaded. Loading jQuery...");
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
  document.getElementsByTagName("head")[0].appendChild(script);

  script.onload = function () {
    // jQuery has been loaded
    console.log("jQuery has been loaded.");
    postListSequence();
    // Call the function to load the map
    loadGoogleMaps();
  };
}

// Move this inside a function to be called later when google api is loaded.
function assignScrollEvent() {
  $(window).on("scroll", function () {
    if (markers.length === 0) return; // Skip if markers array is empty

    var postCollectionListItems = $(".post-collection-list-item");
    postCollectionListItems.each(function (index) {
      var scrollTop = $(window).scrollTop();
      var listItemTop = $(this).offset().top;
      var height = $(this).height();
      if (scrollTop > listItemTop && scrollTop < listItemTop + height) {
        if (currentMarkerIndex != index) {
          markers[currentMarkerIndex].setIcon(icon1);
          markers[index].setIcon(icon2);
          currentMarkerIndex = index;
        }
      }
    });
  });
}
