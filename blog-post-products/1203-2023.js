function slider1() {
  let splides = $(".slider-products-carousel");
  for (let i = 0, splideLength = splides.length; i < splideLength; i++) {
    new Splide(splides[i], {
      // Desktop on down
      perPage: 5,
      perMove: 1,
      focus: 0, // 0 = left and 'center' = center
      type: "slide", // 'loop' or 'slide'
      lazyLoad: "nearby",
      gap: "40px", // space between slides
      //        arrows: true, // 'slider' or false
      pagination: true, // 'slider' or false
      speed: 600, // transition speed in miliseconds
      //        dragAngleThreshold: 30, // default is 30
      //        autoWidth: false, // for cards with differing widths
      rewind: false, // go back to beginning when reach end
      //        rewindSpeed: 400,
      waitForTransition: false,
      updateOnMove: true,
      trimSpace: "move", // true removes empty space from end of list
      padding: { left: 0, right: 0 },
      omitEnd: true,
      breakpoints: {
        991: {
          // Tablet
          perPage: 3,
          gap: "10px",
          padding: { left: 0, right: 0 },
          pagination: true,
        },
        767: {
          // Mobile Landscape
          perPage: 2,
          gap: "10px",
          padding: { left: 0, right: 0 },
          pagination: true,
        },
        479: {
          // Mobile Portrait
          perPage: 2,
          gap: "10px",
          padding: { left: 0, right: 0 },
          pagination: true,
        },
      },
    }).mount();
  }
}

function productScript() {
  var postCollectionListItems = $(".post-collection-list-item");
  var ul = $("<ul>").addClass("post-sticky-list");

  postCollectionListItems.each(function (index) {
    var listItem = $(this);
    var sequenceNumber = index + 1;
    var uniqueId = "item-" + sequenceNumber;

    listItem.attr("id", uniqueId);

    var heading = listItem.find(".post-list-heading").first();
    heading.prepend(sequenceNumber + ". ");

    var li = $("<li>")
      .addClass("post-sticky-list-item")
      .append(
        $('<a class="post-sticky-list-item-link">')
          .attr("href", "#" + uniqueId)
          .text(heading.text())
      );
    ul.append(li);
    // Add id's for the Google Map marker
    listItem.attr("id", uniqueId);
    listItem.attr("data-marker", "marker-" + sequenceNumber); // Add this line
  });

  $("#toc").append(ul);

  var listItems = postCollectionListItems
    .map(function () {
      return this;
    })
    .get();

  function highlightCurrentHeading() {
    var fromTop = $(window).scrollTop();
    var currentHeading;

    for (var i = listItems.length - 1; i >= 0; i--) {
      var listItem = listItems[i];
      if ($(listItem).offset().top < fromTop + 500) {
        currentHeading = listItem;
        break;
      }
    }

    ul.find("a").css("color", "#878682");

    if (currentHeading) {
      var id = $(currentHeading).attr("id");
      ul.find('a[href="#' + id + '"]').css("color", "#3B3A38");
    }
  }

  // Listen for scroll events to update the highlighted item
  $(window).on("scroll", function () {
    highlightCurrentHeading();
  });

  // Highlight the first item in the TOC by default
  var firstListItem = listItems[0];
  if (firstListItem) {
    var firstId = $(firstListItem).attr("id");
    ul.find('a[href="#' + firstId + '"]').css("color", "#3B3A38");
  }
}

// Check if jQuery is loaded
if (window.jQuery) {
  // jQuery is already loaded
  console.log("jQuery is already loaded.");
  productScript();
  slider1();
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
    productScript();
    slider1();
  };
}