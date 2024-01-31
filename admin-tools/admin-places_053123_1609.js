$(document).ready(function () {
  function handleDropdownChange() {
    var selectedOption = $("#Place-Form-Options").val();

    if (selectedOption === "add-new" || selectedOption === "update-photo") {
      $("#Place-Photo-URL-Wrap").show();
    } else if (selectedOption === "update-content") {
      $("#Place-Photo-URL-Wrap").hide();
    }
  }

  function addNameToField() {
    $(".admin-tab-title-link").click(function () {
      var nameText = $(this).text();
      $("#Place-Name-Field").val(nameText);
      console.log(nameText);
    });
  }

  function addCityToField() {
    $(".aside-admin-city-link").click(function () {
      var cityText = $(this).text();
      $("#Place-City-Field").val(cityText);
      console.log(cityText);
    });
  }

  function changeButtonText() {
    $("#Add-City-Button").click(function () {
      $(this).text("Adding...");
    });
  }

  function checkURLAndUpdateAdminStatus() {
    if (window.location.href.indexOf("#map-added") > -1) {
      $("#Admin-Status").append("City has been added.");
    } else if (window.location.href.indexOf("#map-exists") > -1) {
      $("#Admin-Status").append("City already exists.");
    } else if (window.location.href.indexOf("#map-added-city-updated") > -1) {
      $("#Admin-Status").append("Map has been added, city was updated.");
    } else if (window.location.href.indexOf("#map-added-city-added") > -1) {
      $("#Admin-Status").append("Map and city have been added.");
    } else if (window.location.href.indexOf("#map-description-long") > -1) {
      $("#Admin-Status").append(
        "City description generated was too long, please try again."
      );
    } else if (window.location.href.indexOf("#place-no-search-result") > -1) {
      $("#Admin-Status").append(
        "Could not find a Google Place search match, try adding the street name."
      );
    } else if (window.location.href.indexOf("#place-update-content") > -1) {
      $("#Admin-Status").append("Place content has been updated.");
    } else if (window.location.href.indexOf("#place-update-photo") > -1) {
      $("#Admin-Status").append("Place photo has been updated.");
    } else if (window.location.href.indexOf("#map-required") > -1) {
      $("#Admin-Status").append("City does not exist, add one to the right.");
    } else if (window.location.href.indexOf("#place-added") > -1) {
      $("#Admin-Status").append("Place has been added.");
    } else if (window.location.href.indexOf("#place-no-url") > -1) {
      $("#Admin-Status").append(
        "Add the website URL to this place first in the database as we couldn't find one."
      );
    } else {
      $("#Admin-Status").remove();
    }
  }

  // Load the functions
  addNameToField();
  addCityToField();
  changeButtonText();
  checkURLAndUpdateAdminStatus();
  $("#Place-Form-Options").change(handleDropdownChange);
});
