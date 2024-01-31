$(document).ready(function () {
  // * * * SEARCH MODAL * * *

  // Make the search modal visible when clicking the text field
  function showModal() {
    $(".modal-nav-search").css("display", "flex");
    $("#modal-search-input").val(""); // Clear the input field
    $("#modal-search-input").focus();
  }

  function hideModal() {
    $(".modal-nav-search").css("display", "none");
  }

  // Make the search modal visible when clicking the text field
  $("#nav-search-wrap").on("click", showModal);
  $("#modal-bg-search").on("click", hideModal);

  $(document).keydown(function (e) {
    if (e.metaKey && e.key === "k") {
      showModal();
    }
    if (e.key === "Escape") {
      hideModal();
    }
  });

  // Remove the 'is-open' class when the page loads
  $(".mob-nav-card-city").removeClass("is-open");
  $(".mob-nav-card-city-content").removeClass("is-open");
  $("body").removeClass("is-no-scroll");

  // Add or remove the 'is-open' class when the buttons are clicked
  $("#mob-nav-city-toggle, #mob-nav-card-close").click(changeCityCardClass);
});
